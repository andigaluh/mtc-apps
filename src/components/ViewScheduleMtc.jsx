import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Card, CardContent, Checkbox, Container, Fab, FormControl, FormControlLabel, Grid, Input, InputBase, InputLabel, LinearProgress, makeStyles, MenuItem, OutlinedInput, Snackbar, TextField, Typography } from "@material-ui/core";
import { ArrowBack, Cancel, Delete, FormatLineSpacing, NextWeekTwoTone, Publish, Save } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MuiAlert from '@material-ui/lab/Alert';
import { formatdate } from "../helpers/DateCustom";
import schedule_mtcService from "../services/schedule_mtc.service";
import machineService from "../services/machine.service";
import partsService from "../services/parts.service";
/* import { WebcamCapture } from './Webcam'; */

import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 480,
    height: 320,
    facingMode: "environment"
};

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
    link: {
        textDecoration: "none",
    },
    form: {
        padding: theme.spacing(2)
    },
    item: {
        marginBottom: theme.spacing(1)
    },
    actionButton: {
        textAlign: "center"
    },
    button: {
        marginRight: theme.spacing(1),
    },
    buttonContainer: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            marginBottom: theme.spacing(2)
        }
    },
    fab: {
        marginRight: theme.spacing(2),
    },
    input: {
        border: "1px solid grey",
        padding: theme.spacing(1)
    },
    itemCheckbox: {
        display: "flex",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: theme.spacing(1)
    },
    captureImage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    webcam: {
        marginBottom: theme.spacing(2)
    }
}));

const ViewScheduleMtc = () => {
    const { user } = useContext(UserContext);
    const params = useParams();
    const SchId = params.id;
    const isAddMode = !SchId;
    const classes = useStyles();
    const initialState = {
        id: null,
        area: "",
        activity: "",
        plan_date: "",
        photo_name: "",
        photo_date: "",
        machine_id: "",
        parts_id: "",
        user_id: user.id,
    };
    const [openAlert, setOpenAlert] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [currentDoc, setCurrentDoc] = useState(initialState);
    const [progress, setProgress] = useState(0);
    const [severity, setSeverity] = useState("success");
    const [currentMachine, setCurrentMachine] = useState([]);
    const [currentParts, setCurrentParts] = useState([]);
    const [image, setImage] = useState('');
    const webcamRef = useRef(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            console.log(imageSrc);
        });


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const createItem = (values, setSubmitting, resetForm) => {
        setDisableButton(true);
        setTimeout(() => {
            let data = new FormData();
            data.append("file", values.photo_name);
            data.append("area", values.area);
            data.append("activity", values.activity);
            data.append("plan_date", values.plan_date);
            data.append("photo_date", values.photo_date);
            data.append("machine_id", values.machine_id);
            data.append("parts_id", values.parts_id);
            data.append("user_id", user.id);

            schedule_mtcService.create(data, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            })
                .then(
                    (response) => {
                        setSubmitting(false);
                        setOpenAlert(true);
                        setSnackbarMsg(response.data.message);
                        setDisableButton(false);
                        resetForm();
                    },
                    (error) => {
                        const _content =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setOpenAlert(true);
                        setSnackbarMsg(_content);
                        setDisableButton(false);
                    }
                )
                .catch((error) => {
                    setDisableButton(false);
                    console.log(error);
                });
        }, 400);
    }

    const updateItem = (id, values, setSubmitting) => {
        setDisableButton(true);
        setTimeout(() => {
            //alert(JSON.stringify(image));
            let data = new FormData();
            //data.append("file", values.photo_name);
            data.append("photo_name", image);
            data.append("area", values.area);
            data.append("activity", values.activity);
            data.append("plan_date", values.plan_date);
            data.append("photo_date", values.photo_date);
            data.append("machine_id", values.machine_id);
            data.append("parts_id", values.parts_id);
            data.append("user_id", user.id);
            schedule_mtcService.update(id, data)
                .then(
                    (response) => {
                        console.log(response.data);
                        setSubmitting(false);
                        setOpenAlert(true);
                        setSnackbarMsg(response.data.message);
                        setDisableButton(false);
                    },
                    (error) => {
                        const _content =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setOpenAlert(true);
                        setSnackbarMsg(_content);
                        setDisableButton(false);
                    }
                )
                .catch((error) => {
                    setDisableButton(false);
                    console.log(error);
                });
        }, 400);
    };

    const RetrieveMachine = () => {
        machineService.getAll().then(
            (response) => {
                setCurrentMachine(response.data);
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
    };

    const RetrieveParts = () => {
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

    useEffect(() => {
        RetrieveMachine();
        RetrieveParts();
        if (!isAddMode) {
            schedule_mtcService.get(SchId).then(
                (response) => {
                    const responseData = {
                        id: response.data.id,
                        area: response.data.area,
                        activity: response.data.activity,
                        plan_date: formatdate(response.data.plan_date),
                        photo_name: response.data.photo_name,
                        photo_date: formatdate(response.data.photo_date),
                        machine_id: response.data.machine_id,
                        parts_id: response.data.parts_id,
                        user_id: user.id,
                    };
                    setCurrentDoc(responseData);
                },
                (error) => {
                    const _content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setCurrentDoc(_content);
                    console.log(_content);
                }
            );
        }

    }, [isAddMode, SchId]);


    return (
        <Container className={classes.container}>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            {/* {((!user.roles.includes("ROLE_SUPERVISOR"))) ? (
                <Typography>Not Allowed</Typography>
            ) : ( */}
            <React.Fragment>
                <div className={classes.titleContainer}>
                    <Link to={"/schedule-mtc"}>
                        <Fab color="primary" className={classes.fab} size="small">
                            <ArrowBack />
                        </Fab>
                    </Link>
                    <Typography variant="h4" className={classes.title}>Schedule Maintenance's Form</Typography>
                </div>
                <Card>
                    <CardContent>
                        <Formik
                            enableReinitialize
                            initialValues={currentDoc}
                            validationSchema={Yup.object({
                                area: Yup.string().required("Required"),
                                activity: Yup.string().required("Required"),
                                plan_date: Yup.string().required("Required"),
                                machine_id: Yup.number().required("Required"),
                                parts_id: Yup.number().required("Required"),
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                if (isAddMode) {
                                    createItem(values, setSubmitting, resetForm);
                                } else {
                                    updateItem(SchId, values, setSubmitting);
                                }
                            }}
                        >
                            {formik => (
                                <Form className={classes.form} autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField select label="Machine" {...formik.getFieldProps('machine_id')} fullWidth>
                                                    {currentMachine &&
                                                        currentMachine.map((v) => (
                                                            <MenuItem value={v.id}>{v.name}</MenuItem>
                                                        ))}
                                                </TextField>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField select label="Spareparts" {...formik.getFieldProps('parts_id')} fullWidth>
                                                    {currentParts &&
                                                        currentParts.map((v) => (
                                                            <MenuItem value={v.id}>{v.name}</MenuItem>
                                                        ))}
                                                </TextField>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="area"
                                                    label="Area"
                                                    autoComplete="area"
                                                    {...formik.getFieldProps('area')}
                                                />
                                                {formik.touched.area && formik.errors.area ? (
                                                    <Typography size="small" color="error">{formik.errors.area}</Typography>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="activity"
                                                    label="Activity"
                                                    autoComplete="activity"
                                                    {...formik.getFieldProps('activity')}
                                                    multiline
                                                    rows={6}
                                                />
                                                {formik.touched.activity && formik.errors.activity ? (
                                                    <Typography size="small" color="error">{formik.errors.activity}</Typography>
                                                ) : null}
                                            </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="plan_date"
                                                    label="Plan Date"
                                                    autoComplete="plan_date"
                                                    type="date"
                                                    {...formik.getFieldProps('plan_date')}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                {formik.touched.plan_date && formik.errors.plan_date ? (
                                                    <Typography size="small" color="error">{formik.errors.plan_date}</Typography>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.item}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="photo_date"
                                                    label="Execution Date"
                                                    autoComplete="photo_date"
                                                    type="date"
                                                    {...formik.getFieldProps('photo_date')}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                {formik.touched.photo_date && formik.errors.photo_date ? (
                                                    <Typography size="small" color="error">{formik.errors.photo_date}</Typography>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.item} style={{ textAlign: "center"}}>
                                                <Typography variant="body2">Photo</Typography>
                                                <img src={formik.values.photo_name} alt={`photo`} className={classes.photo} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} className={classes.actionButton}>
                                            <div className={classes.item}>
                                                <Link to={"/schedule-mtc"} className={classes.link}>
                                                    <Button variant="contained" color="secondary" className={classes.buttonContainer} >
                                                        <Cancel className={classes.button} />Cancel
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>

            </React.Fragment>
            {/* )} */}
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ViewScheduleMtc;