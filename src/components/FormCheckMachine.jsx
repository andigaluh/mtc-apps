import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Container, Fab, Grid, makeStyles, MenuItem, TextField, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CardActions, Button, CardHeader, Snackbar } from "@material-ui/core";
import { useParams, Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Add, ArrowBack, Delete } from "@material-ui/icons";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import shiftService from "../services/shift.service";
import partsService from "../services/parts.service";
import machineService from "../services/machine.service";
import machine_checkService from "../services/machine_check.service";
import { dateNow, timeNow } from "../helpers/DateCustom";
import MuiAlert from '@material-ui/lab/Alert';
import { MyTextInput, MySelect, MyTextArea, MyCustomSelect } from "../helpers/FormElement"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    },
    fab: {
        marginRight: theme.spacing(2)
    },
    buttonContainer:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: "flex",
        justifyContent:"center",
    },
    buttonSubmit:{
        marginRight: theme.spacing(2)
    },
    titleSparepartCondition:{
        marginBottom: theme.spacing(4),
    },
    table: {
        minWidth: 550,
    },
}));

const FormCheckMachine = () => {
    const { user } = useContext(UserContext);
    const params = useParams();
    const machineId = params.id;
    const machineCode = params.code;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [currentShift, setCurrentShift] = useState([]);
    const [currentMachine, setCurrentMachine] = useState({});
    const [machineParts, setMachineParts] = useState([]);
    const [statusParts, setStatusParts] = useState([]);
    const [currentParts, setCurrentParts] = useState([]);
    const [severity, setSeverity] = useState("success");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const retrieveShift = () => {
        shiftService.getAll().then(
            (response) => {
                setCurrentShift(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentShift(_content);
            }
        );
    };

    const retrieveParts = () => {
        partsService.getAll().then(
            (response) => {
                setCurrentParts(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentParts(_content);
            }
        );
    };

    const retrieveMachine = (machine_id) => {
        machineService.get(machine_id).then(
            (response) => {
                console.log(response.data)
                setCurrentMachine(response.data);
                setMachineParts(response.data.parts);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentMachine(_content);
            }
        );
    }

    const handleRadioChange = (event) => {
        const { value, id } = event.target;
        const array = Object.values(statusParts);

        let objIndex = array.findIndex((obj) => obj.parts_id == id);

        if (objIndex < 0) {
            array.push({ parts_id: id, status: value });
        } else {
            array[objIndex].status = value;
        }

        setStatusParts(array);
    };

    const handleCommentChange = (event) => {
        const { value, id } = event.target;
        const array = Object.values(statusParts);

        let objIndex = array.findIndex((obj) => obj.parts_id == id);

        if (objIndex < 0) {
            array.push({ parts_id: id, status: value });
        } else {
            array[objIndex].comment_value = value;
        }

        setStatusParts(array);
    }

    const resetRadioCheck = () => {
        var ele = document.getElementsByClassName("radio-check");
        for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    }

    const resetCommentValue = () => {
        var ele = document.getElementsByClassName("form-control");
        for (var i = 0; i < ele.length; i++) ele[i].value = "";
    }

    useEffect(() => {
        retrieveShift();
        retrieveParts();
        retrieveMachine(machineId);
    }, [machineId, machineCode]);

    return (
        <Container className={classes.container} maxWidth="xl">
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            {!user.roles.includes("ROLE_OPERATOR") ? (
                <Typography>Not Allowed</Typography>
            ) : (
                <React.Fragment>
                    <div className={classes.titleContainer}>
                        <Link to={"/check-machine"}>
                            <Fab color="primary" className={classes.fab} size="small">
                                <ArrowBack />
                            </Fab>
                        </Link>
                        <Typography variant="h4" className={classes.title}>Machine's Form</Typography>
                    </div>
                    <Card>
                        <CardContent>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        id: null,
                                        date: dateNow(),
                                        time: timeNow(),
                                        inspection_date: dateNow(),
                                        inspection_approval: true,
                                        inspection_id: user.id,
                                        inspection_name: user.name,
                                        supervisor_id: (user.superior_id[0]) ? user.superior_id[0].id : 0,
                                        shift_id: 1,
                                        machine_id: currentMachine.id,
                                        machine_name: currentMachine.name,
                                        status_parts: [
                                            {
                                                parts_id: 0,
                                                status: true,
                                                comment_value: "",
                                            },
                                        ],
                                        problems: [
                                            {
                                                problem_cause: "",
                                                problem_action: "",
                                                problem_status: false,
                                            },
                                        ],
                                        need_parts: [
                                            {
                                                parts_id: 0,
                                                qty: 0,
                                                type: "subtraction",
                                            },
                                        ],
                                    }}
                                    validationSchema={Yup.object({
                                        date: Yup.string().required("Required"),
                                        time: Yup.string().required("Required"),
                                    })}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        setTimeout(() => {
                                            var statusPartsArr = Object.values(statusParts).map(
                                                function (key) {
                                                    return key;
                                                }
                                            );
                                            var lengthMachineParts = machineParts.length;
                                            if (statusPartsArr.length > 0 && statusPartsArr.length == lengthMachineParts) {
                                                let problemsArr = values.problems;
                                                let needPartsArr = values.need_parts;

                                                if (problemsArr.length > 0 && problemsArr[0].problem_cause === "" && problemsArr[0].problem_action === "") {
                                                    problemsArr = [];
                                                }

                                                if (needPartsArr.length > 0 && needPartsArr[0].parts_id === 0 && needPartsArr[0].qty === 0) {
                                                    needPartsArr = [];
                                                }

                                                var data = {
                                                    date: values.date,
                                                    time: values.time,
                                                    inspection_date: values.inspection_date,
                                                    inspection_approval: true,
                                                    inspection_id: values.inspection_id,
                                                    inspection_name: values.inspection_name,
                                                    supervisor_id: values.supervisor_id,
                                                    shift_id: values.shift_id,
                                                    machine_id: values.machine_id,
                                                    machine_name: values.machine_name,
                                                    status_parts: statusPartsArr,
                                                    problems: problemsArr,
                                                    need_parts: needPartsArr,
                                                };
                                                console.log(JSON.stringify(data,null,2));
                                                machine_checkService.create(data)
                                                    .then(
                                                        (response) => {
                                                            setSubmitting(false);
                                                            setOpen(true);
                                                            setSnackbarMsg(response.data.message);
                                                            resetForm();
                                                        },
                                                        (error) => {
                                                            const _content =
                                                                (error.response &&
                                                                    error.response.data &&
                                                                    error.response.data.message) ||
                                                                error.message ||
                                                                error.toString();
                                                            setSeverity("error")
                                                            setOpen(true);
                                                            setSnackbarMsg(_content);
                                                        }
                                                    )
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                                setSubmitting(false);
                                                resetForm();
                                                resetRadioCheck();
                                                resetCommentValue();
                                                setStatusParts([]);
                                            } else {
                                                
                                                setSeverity("error");
                                                setOpen(true);
                                                setSnackbarMsg("Please check all Spareparts condition");
                                                setSubmitting(true);
                                            }
                                        }, 400);
                                    }}
                                >
                                    {({ values, touched, errors }) => (
                                        <Form className={classes.form} autoComplete="off" novalidate="novalidate">
                                            <input
                                                id="machine_id"
                                                type="hidden"
                                                readOnly="true"
                                                name="machine_id"
                                                value={values.machine_id}
                                            />
                                            <input
                                                id="inspection_id"
                                                type="hidden"
                                                readOnly="true"
                                                name="inspection_id"
                                                value={values.inspection_id}
                                            />
                                        <Grid container spacing={2}>
                                            <Grid item sm={4} >
                                                <div className={classes.item}>
                                                        <MyTextInput
                                                            label="Machine Name"
                                                            name="machine_name"
                                                            type="text"
                                                            placeholder="Enter Machine"
                                                            readonly="true"
                                                        />
                                                </div>
                                            </Grid>
                                            <Grid item sm={4} >
                                                    <div className={classes.item}>
                                                        <MyTextInput
                                                            label="Profile (inspector)"
                                                            name="inspection_name"
                                                            type="text"
                                                            placeholder="Enter inspector"
                                                            readonly="true"
                                                        />
                                                    </div>
                                            </Grid>
                                            <Grid item sm={4} >
                                                <div className={classes.item}>
                                                        <MySelect
                                                            label="Shift"
                                                            name="shift_id"
                                                        >
                                                            <option value="">
                                                                Select a Shift
                                                            </option>
                                                            {currentShift &&
                                                                currentShift.map((v) => (
                                                                    <option value={v.id}>
                                                                        {v.name}
                                                                    </option>
                                                                ))}
                                                        </MySelect>
                                                        {touched.shift_id && errors.shift_id ? (
                                                            <Typography size="small" color="error">{errors.shift_id}</Typography>
                                                        ) : null}
                                                </div>
                                            </Grid>
                                            <Grid item sm={6} >
                                                <div className={classes.item}>
                                                    
                                                    <MyTextInput
                                                        label="Date"
                                                        name="date"
                                                        type="date"
                                                        placeholder="Enter Date"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={6} >
                                                <div className={classes.item}>
                                                        <MyTextInput
                                                            label="Time"
                                                            name="time"
                                                            type="time"
                                                            placeholder="Enter Time"
                                                        />
                                                </div>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Typography variant="h5" className={classes.titleSparepartCondition}>Check point</Typography>
                                                <TableContainer component={Paper}>
                                                    <Table className={classes.table} aria-label="Machine's spareparts">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>#</TableCell>
                                                                <TableCell>Spareparts</TableCell>
                                                                <TableCell>Standard</TableCell>
                                                                <TableCell>Method</TableCell>
                                                                <TableCell>Status</TableCell>
                                                                <TableCell>Comment</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {machineParts &&
                                                                machineParts.map((value, index) => {
                                                                    return (
                                                                    <TableRow key={index}>
                                                                    <TableCell>
                                                                        {++index}
                                                                    </TableCell>
                                                                    <TableCell>{value.name}</TableCell>
                                                                    <TableCell>{value.standard}</TableCell>
                                                                    <TableCell>{value.method}</TableCell>
                                                                    <TableCell>
                                                                        <div className="form-checkbox">
                                                                            <input
                                                                                type="radio"
                                                                                id={`${value.id}`}
                                                                                name={`status_parts.${index}.status`}
                                                                                value="1"
                                                                                onClick={handleRadioChange}
                                                                                className="radio-check"
                                                                            />{" "}
                                                                            OK
                                                                            <br />
                                                                            <br />
                                                                            <input
                                                                                type="radio"
                                                                                id={`${value.id}`}
                                                                                value="0"
                                                                                name={`status_parts.${index}.status`}
                                                                                className="radio-check"
                                                                                onClick={handleRadioChange}
                                                                            />{" "}
                                                                            NG
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        
                                                                            <input
                                                                                type="text"
                                                                                id={`${value.id}`}
                                                                                name={`status_parts.${index}.comment_value`}
                                                                                className="form-control"
                                                                                onChange={handleCommentChange}
                                                                            />
                                                                    </TableCell>
                                                                </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                            <FieldArray name="problems">
                                                {({ insert, remove, push }) => (
                                                    <React.Fragment>
                                                        <Grid item sm={12}>
                                                            <Card>
                                                                <CardHeader title="Problem Description"/>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                            {values.problems.length > 0 &&
                                                                                values.problems.map(
                                                                                    (problem, index) => (
                                                                                        <>
                                                                                            <Grid item sm={6}>
                                                                                                <MyTextArea
                                                                                                    label="Problems cause"
                                                                                                    name={`problems.${index}.problem_cause`}
                                                                                                    placeholder="Enter cause"
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <MyTextArea
                                                                                                    label="Problem action"
                                                                                                    name={`problems.${index}.problem_action`}
                                                                                                    placeholder="Enter action"
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item sm={1}>
                                                                                                <Typography variant="subtitle2">Action</Typography>
                                                                                                <Button
                                                                                                    type="button"

                                                                                                    className="btn btn-sm btn-danger"
                                                                                                    onClick={() => remove(index)}
                                                                                                >
                                                                                                    <Delete size="small" />
                                                                                                </Button>
                                                                                            </Grid>
                                                                                        </>
                                                                                    )
                                                                                )}
                                                                    </Grid>
                                                                </CardContent>
                                                                <CardActions>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            onClick={() =>
                                                                                push({
                                                                                    problem_cause: "",
                                                                                    problem_action: "",
                                                                                    problem_status: false,
                                                                                })
                                                                            }
                                                                        >
                                                                            <Add size="small" /> Add
                                                                            Problem
                                                                        </Button>
                                                                </CardActions>
                                                            </Card>
                                                        </Grid>
                                                    </React.Fragment>
                                                )}
                                            </FieldArray>
                                            <FieldArray name="need_parts">
                                                {({ insert, remove, push }) => (
                                                    <React.Fragment>
                                                        <Grid item sm={12}>
                                                            <Card>
                                                                <CardHeader 
                                                                    title="Need spareparts"
                                                                />
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                            {values.need_parts.length > 0 && values.need_parts.map((need_part, index) => (
                                                                                <>
                                                                                <Grid item sm={6}>
                                                                                    <div className={classes.item}>
                                                                                            <MySelect
                                                                                                label="Spareparts"
                                                                                                name={`need_parts.${index}.parts_id`}
                                                                                            >
                                                                                                <option value="">
                                                                                                    Select a spareparts
                                                                                                </option>
                                                                                                {currentParts &&
                                                                                                    currentParts.map((v) => (
                                                                                                        <option value={v.id}>
                                                                                                            {v.name}
                                                                                                        </option>
                                                                                                    ))}
                                                                                            </MySelect>
                                                                                    </div>
                                                                                </Grid>
                                                                                <Grid item sm={5}>
                                                                                    
                                                                                        <MyTextInput
                                                                                            label="Qty"
                                                                                            name={`need_parts.${index}.qty`}
                                                                                            placeholder="0"
                                                                                            type="number"
                                                                                        />
                                                                                </Grid>
                                                                                <Grid item sm={1}>
                                                                                    <Typography variant="subtitle2">Action</Typography>
                                                                                        <Button
                                                                                            type="button"
                                                                                            
                                                                                            className="btn btn-sm btn-danger"
                                                                                            onClick={() => remove(index)}
                                                                                        >
                                                                                            <Delete size="small"/>
                                                                                        </Button>
                                                                                </Grid>
                                                                                </>
                                                                            )
                                                                        )}
                                                                    </Grid>
                                                                </CardContent>
                                                                <CardActions>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            onClick={() =>
                                                                                push({
                                                                                    parts_id: 0,
                                                                                    qty: "",
                                                                                    type: "subtraction",
                                                                                })
                                                                            }
                                                                        >
                                                                            <Add size="small"/> Add
                                                                            Spareparts
                                                                        </Button>
                                                                </CardActions>
                                                            </Card>
                                                        </Grid>
                                                    </React.Fragment>
                                                )}
                                            </FieldArray>
                                            <Grid item sm={12} className={classes.buttonContainer}>
                                                    <Button type="submit" variant="contained" color="primary" className={classes.buttonSubmit}>
                                                        Submit
                                                    </Button>
                                                    <Button type="reset" variant="contained" color="secondary" className={classes.buttonClear}>
                                                        Clear
                                                    </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                                </Formik>
                        </CardContent>
                    </Card>
                </React.Fragment>
            )}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default FormCheckMachine;