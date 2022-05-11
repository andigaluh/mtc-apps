import { Container, makeStyles, Snackbar, Typography, IconButton, Card, CardContent, Tooltip, Fab } from "@material-ui/core";
import React, { useContext, useEffect, useState, useMemo } from "react"
import { UserContext, ToolsContext } from "../UserContext";
import { Navigate, Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Delete, Edit, Add as AddIcon, AccountBalanceWallet, Exposure } from "@material-ui/icons";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import MuiAlert from '@material-ui/lab/Alert';
import shiftService from "../services/shift.service";
import rolesService from "../services/roles.service";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    table: {
        marginTop: theme.spacing(2)
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20
    },
}));


const Role = () => {
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const [currentItem, setCurrentItem] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    //const [person, setPerson] = useState([]);

    const value = useMemo(() => ({ currentItem, setCurrentItem }), [currentItem, setCurrentItem]);

    const retrieveItem = () => {
        rolesService.getAll().then(
            (response) => {
                //console.log(response.data);
                setCurrentItem(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentItem(_content);
                console.log(`no user ${_content}`);
            }
        );
    };

    useEffect(() => {
        retrieveItem();
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => {
                return (
                    <React.Fragment>
                        <Link to={`/role/form/${row.id}`} title="Detail">
                            <IconButton color="primary" aria-label="Edit">
                                <Edit size="small" />
                            </IconButton>
                        </Link>
                        <IconButton color="primary" title="Delete" aria-label="Delete" onClick={() => {
                            const r = window.confirm("Are you sure!");
                            if (r == true) {
                                rolesService.remove(row.id)
                                    .then((response) => {
                                        setOpen(true);
                                        setSnackbarMsg(response.data.message);
                                        retrieveItem();
                                    })
                                    .catch((e) => {
                                        console.log(e);
                                    });
                            }
                        }}>
                            <Delete />
                        </IconButton>
                    </React.Fragment>
                );
            },
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
        <Container className={classes.container}>
            <ToolsContext.Provider value={value}>
                {!user && (
                    <Navigate to="/login" replace={true} />
                )}
                {!user.roles.includes("ROLE_ADMIN") ? (
                    <Typography>Not Allowed</Typography>
                ) : (
                    <React.Fragment>
                        <Typography variant="h4" className={classes.title}>Role</Typography>
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
                    </React.Fragment>
                )}
                <Link to={"/role/form"}>
                    <Tooltip title="Add" aria-label="add" >
                        <Fab color="primary" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Link>
            </ToolsContext.Provider>
        </Container>
    );
};

export default Role;