import { Avatar, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, makeStyles, Typography, Snackbar } from "@material-ui/core";
import Post from "./Post";
import React, { useContext, useEffect, useState, useMemo } from "react"
import { UserContext } from "../UserContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import doc_inspectionService from "../services/doc_inspection.service";
import { formatdate } from "../helpers/DateCustom";
import { red } from "@material-ui/core/colors";
import TokenService from "../services/token.service";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { Delete, Edit, Add as AddIcon, AccountBalanceWallet, Exposure, GetApp } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        marginBottom: theme.spacing(2)
    },
}));

const DocInstruction = () => {
    const { user, setUser } = useContext(UserContext);
    const classes = useStyles();
    const [currentItem, setCurrentItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const navigate = useNavigate();

    const value = useMemo(() => ({ currentItem, setCurrentItem }), [currentItem, setCurrentItem]);

    const retrieveItem = () => {
        doc_inspectionService.getAll().then(
            (response) => {
                
                setCurrentItem(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    if (error.response && error.response.status === 403) {
                        TokenService.removeUser();
                        navigate("/login", { replace: true });
                    }
                    console.log(_content);
            }
        ).catch(error => {
            const _content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                
            if (error.response) {
                navigate("/login", { replace: true });
            }
        });
    };

    useEffect(() => {
        retrieveItem();
    }, []);

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            minWidth: "200px",
            maxWidth: "250px",
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
            minWidth: "400px",
            maxWidth: "450px"
        },
        {
            name: "Expired Date",
            selector: (row) => formatdate(row.expired_date),
            sortable: true,
            minWidth: "100px",
            maxWidth: "120px"
        },
        {
            name: "Download",
            selector: (row) => row.file_name,
            sortable: true,
            cell: (row) => {
                return (
                    <React.Fragment>
                        <a href={`${process.env.REACT_APP_UPLOADS}${row.file_name}`} target="_blank">
                            <GetApp size="small" />
                        </a>
                    </React.Fragment>
                );
            },
            minWidth: "100px",
            maxWidth: "120px"
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => {
                return (
                    <React.Fragment>
                        {row.status && row.status ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
                        ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                Not Active
                            </span>
                        )}
                    </React.Fragment>
                );
            },
            minWidth: "100px",
            maxWidth: "120px"
        },
    ];

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const tableData = {
        columns,
        data: currentItem,
    };

    return (
        <Container className={classes.container} maxWidth="xl">
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            <Typography variant="h4" className={classes.title}>Document Instruction</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6" className={classes.table}>
                        <DataTableExtensions
                            {...tableData}
                            export={false}
                            print={false}
                        >
                            <DataTable
                                columns={columns}
                                data={currentItem}
                                pagination
                            />
                        </DataTableExtensions>
                    </Typography>
                </CardContent>
            </Card>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            {/* <Grid container spacing={2}>
                {currentItem && currentItem.map((v,i) => (
                    <Grid item xs={12} sm={4} key={i}>
                        <Card>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe" className={classes.avatar}>
                                    {v.title.substring(0,1).toUpperCase()}
                                </Avatar>}
                                title={v.title}
                                subheader={`Exp : ${formatdate(v.expired_date)}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {v.description.substring(0, 150)} ...{" "}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <a href={`${process.env.REACT_APP_UPLOADS}${v.file_name}`} target="_blank">
                                    <IconButton aria-label="download file">
                                        <GetApp />
                                    </IconButton>
                                </a>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                
            </Grid> */}
        </Container>
    );
};

export default DocInstruction;