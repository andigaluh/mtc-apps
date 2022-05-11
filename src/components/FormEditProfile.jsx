import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Card, CardContent, Checkbox, Container, Fab, FormControl, FormControlLabel, Grid, Input, InputBase, InputLabel, LinearProgress, makeStyles, OutlinedInput, Snackbar, TextField, Typography } from "@material-ui/core";
import { ArrowBack, Cancel, Delete, NextWeekTwoTone, Save } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MuiAlert from '@material-ui/lab/Alert';
import partsService from "../services/parts.service";
import { formatdate } from "../helpers/DateCustom";
import Userservice from "../services/users.service";

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
    }
}));

const FormEditProfile = () => {
    const { user } = useContext(UserContext);
    const params = useParams();
    const userId = user.id;
    const isAddMode = !userId;
    const classes = useStyles();
    const initialState = {
        id: null,
        username: "",
        name: "",
        email: "",
        phone: "",
        picture: "",
        password: "",
        job_id: "",
    };
    const [openAlert, setOpenAlert] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [currentUser, setCurrentUser] = useState(initialState);
    const [progress, setProgress] = useState(0);
    const [severity, setSeverity] = useState("success");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const updateItem = (id, values, setSubmitting) => {
        setDisableButton(true);
        setTimeout(() => {
            let data = new FormData();
            data.append("file", values.picture);
            data.append("username", values.username);
            data.append("name", values.name);
            data.append("email", values.email);
            data.append("phone", values.phone);
            data.append("job_id", values.job_id);
            Userservice.update(id, data)
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

    useEffect(() => {
        if (!isAddMode) {
            Userservice.get(userId).then(
                (response) => {
                    const responseData = {
                        id: response.data.id,
                        username: response.data.username,
                        name: response.data.name,
                        email: response.data.email,
                        phone: response.data.phone,
                        picture: response.data.picture,
                        job_id: response.data.job_id,
                    };
                    setCurrentUser(responseData);
                },
                (error) => {
                    const _content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setCurrentUser(_content);
                    console.log(_content);
                }
            );
        }

    }, [isAddMode, userId]);


    return (
        <Container className={classes.container}>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
                <React.Fragment>
                    <div className={classes.titleContainer}>
                        <Link to={"/"}>
                            <Fab color="primary" className={classes.fab} size="small">
                                <ArrowBack />
                            </Fab>
                        </Link>
                        <Typography variant="h4" className={classes.title}>Edit Profile</Typography>
                    </div>
                    <Card>
                        <CardContent>
                            <Formik
                                enableReinitialize
                                initialValues={currentUser}
                                validationSchema={Yup.object({
                                    username: Yup.string().required("Required"),
                                    name: Yup.string().required("Required"),
                                    email: Yup.string().required("Required"),
                                    phone: Yup.string().required("Required"),
                                    job_id: Yup.string().required("Required"),
                                    picture: (isAddMode) ? Yup.string().required("Required") : null,
                                })}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    updateItem(userId, values, setSubmitting);
                                }}
                            >
                                {formik => (
                                    <Form className={classes.form} autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.item}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="username"
                                                        label="NIK / Username"
                                                        autoComplete="username"
                                                        {...formik.getFieldProps('username')}
                                                    />
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <Typography size="small" color="error">{formik.errors.username}</Typography>
                                                    ) : null}
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.item}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        label="Name"
                                                        autoComplete="name"
                                                        {...formik.getFieldProps('name')}
                                                    />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <Typography size="small" color="error">{formik.errors.name}</Typography>
                                                    ) : null}
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.item}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        autoComplete="email"
                                                        {...formik.getFieldProps('email')}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <Typography size="small" color="error">{formik.errors.email}</Typography>
                                                    ) : null}
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.item}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="phone"
                                                        label="Phone"
                                                        autoComplete="phone"
                                                        {...formik.getFieldProps('phone')}
                                                    />
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <Typography size="small" color="error">{formik.errors.phone}</Typography>
                                                    ) : null}
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <div className={classes.item}>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        id="picture"
                                                        label="Picture profile"
                                                        autoComplete="picture"
                                                        type="file"
                                                        onChange={(event) => {
                                                            formik.setFieldValue("picture", event.target.files[0]);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formik.touched.picture && formik.errors.picture ? (
                                                        <Typography size="small" color="error">{formik.errors.picture}</Typography>
                                                    ) : null}
                                                    <Typography size="small" variant="body2" color="error">Please upload only file with extension .png, .jpg or .jpeg</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {user.picture && (
                                                <img src={process.env.REACT_APP_UPLOADS + user.picture} alt={user.name} className={classes.photo} width={240} />
                                                )}
                                            </Grid>
                                            
                                            <Grid item xs={12} className={classes.actionButton}>
                                                <div className={classes.item}>
                                                    <Button variant="contained" color="primary" className={classes.buttonContainer} type="submit" disabled={disableButton} >
                                                        <Save className={classes.button} />Save
                                                    </Button>
                                                    <Link to={"/"} className={classes.link}>
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
            
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={handleClose} severity={severity}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default FormEditProfile;