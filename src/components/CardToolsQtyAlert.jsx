import { Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import dashboardService from "../services/dashboard.service";
import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    titleTable: {
        paddingBottom: theme.spacing(2)
    }
}));

const CardToolsQtyAlert = () => {
    const classes = useStyles();
    const[toolsAlert, setToolsAlert] = useState([]);

    const retrieveToolsAlert = () => {
        dashboardService.getAlertTools().then(
            (response) => {
                //console.log(response.data);
                setToolsAlert(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(_content)
            }
        );
    };

    useEffect(() => {
        retrieveToolsAlert();
    }, []);

    const columnsTools = [
        {
            name: "name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "qty",
            selector: (row) => row.qty,
            sortable: true,
        },
    ];

    return (
        <>
            <Typography variant="h6" className={classes.titleTable}>Tools Quantity Alert</Typography>
            <Paper>
                <Typography variant="h6" className={classes.table}>
                    <DataTable
                        columns={columnsTools}
                        data={toolsAlert}
                    />
                </Typography>
            </Paper>
        </>
    );
};

export default CardToolsQtyAlert;