import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Container, Fab, Grid, makeStyles, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, CardHeader, Snackbar } from "@material-ui/core";
import { useParams, Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ArrowBack } from "@material-ui/icons";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import machine_checkService from "../services/machine_check.service";
import report_machine_checkService from "../services/report_machine_check.service"
import { dateNow, formatdate } from "../helpers/DateCustom";
import MuiAlert from '@material-ui/lab/Alert';
import { MyTextInput, MyTextArea, MyTextHidden } from "../helpers/FormElement";

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
    buttonContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: "flex",
        justifyContent: "center",
    },
    buttonSubmit: {
        marginRight: theme.spacing(2)
    },
    titleSparepartCondition: {
        marginBottom: theme.spacing(4),
    },
    table: {
        minWidth: 550,
    },
    labelWrapper:{
        display: "flex",
        flexDirection: "column"
    },
    label:{
        marginBottom: theme.spacing(1)
    },
    formControl: {
        padding: theme.spacing(2),
        fontSize: 15,
        border: "1px solid #555"
    },
    link: {
        textDecoration: "none"
    }
}));

const FormApprCheckMachine = () => {
    const { user } = useContext(UserContext);
    const params = useParams();
    const machineCheckId = params.id;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    const [machine, setMachine] = useState([]);
    const [machineParts, setMachineParts] = useState([]);
    const [machineProblem, setMachineProblem] = useState([]);
    const [machineNeedParts, setMachineNeedParts] = useState([]);
    const [approveButton, setApproveButton] = useState(false);

    const [disableButton, setDisableButton] = useState(false);
    const [disableActionOptions, setDisableActionOptions] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const retrieveMachine = (machine_check_id) => {
        report_machine_checkService.get(machine_check_id).then(
            (response) => {
                console.log(response.data)
                setApproveButton((response.data.supervisor_approval === true) ? true : false);
                setMachine({
                    id: machine.id,
                    date: formatdate(response.data.date),
                    time: response.data.time,
                    no_dokumen: response.data.no_dokumen,
                    inspection_date: formatdate(response.data.date),
                    inspection_approval: response.data.inspection_approval,
                    inspection_name: response.data.inspection_name,
                    shift_name: response.data.shift_name,
                    machine_name: response.data.machine_name,
                    machine_check_id: machineCheckId,
                    supervisor_id: user.id,
                    supervisor_approval: response.data.supervisor_approval,
                    status_parts: response.data.MachineCheckConditionArr,
                    problems: response.data.MachineCheckProblemArr,
                    need_parts: response.data.MachineCheckNeedPartsArr,
                });
                setMachineParts(response.data.MachineCheckConditionArr);
                setMachineProblem(response.data.MachineCheckProblemArr);
                setMachineNeedParts(response.data.MachineCheckNeedPartsArr);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMachine(_content);
            }
        );
    };

    const handleChangePartsCondition = (machine_check_id, parts_id, data) => {
        setDisableActionOptions(true)
        report_machine_checkService.updatePartsCondition(machine_check_id, parts_id, data).then(
            (response) => {
                setOpen(true);
                setSnackbarMsg(response.data.message);
                setDisableActionOptions(false)
            }, (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setOpen(true);
                setSnackbarMsg(_content);
                setDisableActionOptions(false)
            }
        )
    }


    useEffect(() => {
        retrieveMachine(machineCheckId);
    }, [machineCheckId]);

    return (
        <Container className={classes.container}>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            {!user.roles.includes("ROLE_SUPERVISOR") ? (
                <Typography>Not Allowed</Typography>
            ) : (
                <React.Fragment>
                    <div className={classes.titleContainer}>
                        <Link to={"/appr-check-machine"}>
                            <Fab color="primary" className={classes.fab} size="small">
                                <ArrowBack />
                            </Fab>
                        </Link>
                        <Typography variant="h4" className={classes.title}>Approval Daily Maintenance Check List</Typography>
                        
                    </div>
                    <Card>
                        <CardContent>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    id: machine.id,
                                    no_dokumen: machine.no_dokumen,
                                    date: formatdate(machine.date),
                                    time: machine.time,
                                    inspection_date: formatdate(machine.date),
                                    inspection_approval: machine.inspection_approval,
                                    inspection_name: machine.inspection_name,
                                    shift_name: machine.shift_name,
                                    machine_name: machine.machine_name,
                                    machine_check_id: machineCheckId,
                                    supervisor_id: user.id,
                                    supervisor_approval: machine.supervisor_approval,
                                    status_parts: [
                                        {
                                            parts_id: 0,
                                            status: true,
                                            comment_Value: "",
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
                                        var data = {
                                            machine_check_id: values.machine_check_id,
                                            supervisor_date: dateNow(),
                                            supervisor_approval: true,
                                            supervisor_id: values.supervisor_id,
                                        };
                                        //alert(JSON.stringify(data, null, 2));
                                        //console.log(data);
                                        //setSubmitting(false);
                                        machine_checkService.update(machineCheckId, data)
                                            .then(
                                                (response) => {
                                                    setSubmitting(false);
                                                    setOpen(true);
                                                    setApproveButton(true);
                                                    setSnackbarMsg(response.data.message);
                                                },
                                                (error) => {
                                                    const _content =
                                                        (error.response &&
                                                            error.response.data &&
                                                            error.response.data.message) ||
                                                        error.message ||
                                                        error.toString();
                                                    setOpen(true);
                                                    setApproveButton(true);
                                                    setSnackbarMsg(_content);
                                                }
                                            )
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }, 2000);
                                }}
                            >
                                
                                    <Form className={classes.form} autoComplete="off" novalidate="novalidate">
                                        <MyTextHidden
                                            name="machine_id"
                                            type="hidden"
                                            readonly="true"
                                        />
                                        <MyTextHidden
                                            name="inspection_id"
                                            type="hidden"
                                            readonly="true"
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
                                                    <MyTextInput
                                                        label="Shift"
                                                        name="shift_name"
                                                        type="text"
                                                        placeholder="Enter Shift"
                                                        readonly="true"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={4} >
                                                <div className={classes.item}>
                                                    <MyTextInput
                                                        label="Date"
                                                        name="date"
                                                        type="date"
                                                        placeholder="Enter Date"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={4} >
                                                <div className={classes.item}>
                                                    <MyTextInput
                                                        label="Time"
                                                        name="time"
                                                        type="time"
                                                        placeholder="Enter Time"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={4} >
                                                <div className={classes.item}>
                                                    <MyTextInput
                                                        label="No Document"
                                                        name="no_dokumen"
                                                        type="text"
                                                        //placeholder="WMPE-FORM-XXXX"
                                                        readonly="true"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Typography variant="h5" className={classes.titleSparepartCondition}>Spareparts Condition</Typography>
                                                <TableContainer component={Paper}>
                                                    <Table className={classes.table} aria-label="Machine's spareparts">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>#</TableCell>
                                                                <TableCell>Spareparts</TableCell>
                                                                <TableCell>Standard</TableCell>
                                                                <TableCell>Method</TableCell>
                                                                <TableCell>Description</TableCell>
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
                                                                            <TableCell>{value.parts_name}</TableCell>
                                                                            <TableCell>{value.parts_standard}</TableCell>
                                                                            <TableCell>{value.parts_method}</TableCell>
                                                                            <TableCell>{value.parts_description}</TableCell>
                                                                            <TableCell>{value.status ? "OK" : (
                                                                                <>
                                                                                    <select onChange={(e) => handleChangePartsCondition(machineCheckId, value.parts_id, { status: e.target.value})} disabled={disableActionOptions}>
                                                                                    {/* <select onChange={(e) => alert(`${machineCheckId} - ${value.parts_id} - ${e.target.value}`)}> */}
                                                                                        <option value="1">OK</option>
                                                                                        <option value="0" selected>NG</option>
                                                                                    </select>
                                                                                </>
                                                                            )}</TableCell>
                                                                            <TableCell>{value.comment_value}</TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                            
                                                    <React.Fragment>
                                                        <Grid item sm={12}>
                                                            <Card>
                                                                <CardHeader title="Problem Description" />
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                {machine.problems &&
                                                                    machine.problems.map(
                                                                                (problem, index) => (
                                                                                    <>
                                                                                        <Grid item sm={6} className={classes.labelWrapper}>
                                                                                            <Typography htmlFor="problem_cause" className={classes.label}>
                                                                                                Problem Cause
                                                                                            </Typography>
                                                                                            <textarea
                                                                                                type="text"
                                                                                                value={problem.problem_cause}
                                                                                                readOnly="true"
                                                                                                className={classes.formControl}
                                                                                            />
                                                                                        </Grid>
                                                                                <Grid item sm={6} className={classes.labelWrapper}>
                                                                                    <Typography htmlFor="problem_cause" className={classes.label}>
                                                                                        Problem Action
                                                                                    </Typography>
                                                                                    <textarea
                                                                                        type="text"
                                                                                        value={problem.problem_action}
                                                                                        readOnly="true"
                                                                                        className={classes.formControl}
                                                                                    />
                                                                                        </Grid>
                                                                                    </>
                                                                                )
                                                                            )}
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </React.Fragment>
                                                
                                            
                                                    <React.Fragment>
                                                        <Grid item sm={12}>
                                                            <Card>
                                                                <CardHeader
                                                                    title="Need spareparts"
                                                                />
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                {machine.need_parts && machine.need_parts.map((need_part, index) => (
                                                                            <>
                                                                        <Grid item sm={6} className={classes.labelWrapper}>
                                                                            <Typography htmlFor="problem_cause" className={classes.label}>
                                                                                        Spareparts Name
                                                                                    </Typography>
                                                                                    <input
                                                                                        type="text"
                                                                                        value={need_part.parts_name}
                                                                                        readOnly="true"
                                                                                        className={classes.formControl}
                                                                                    />
                                                                                </Grid>
                                                                        <Grid item sm={6} className={classes.labelWrapper}>

                                                                            <Typography htmlFor="problem_cause" className={classes.label}>
                                                                                        Qty
                                                                                    </Typography>
                                                                                    <input
                                                                                        className={classes.formControl}
                                                                                        type="text"
                                                                                        value={need_part.qty}
                                                                                        readOnly="true"
                                                                                    />
                                                                                </Grid>
                                                                            </>
                                                                        )
                                                                        )}
                                                                    </Grid>
                                                                </CardContent>
                                                                
                                                            </Card>
                                                        </Grid>
                                                    </React.Fragment>

                                            <Grid item sm={12} className={classes.buttonContainer}>
                                                
                                                <Button type="submit" variant="contained" color="primary" className={classes.buttonSubmit} disabled={approveButton}>
                                                    Approve
                                                </Button>
                                                <Link to={"/appr-check-machine"} className={classes.link}>
                                                    <Button type="button" variant="contained" color="secondary" className={classes.buttonClear} >
                                                        Back
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                            
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

export default FormApprCheckMachine;