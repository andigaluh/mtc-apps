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

const CardSparepartsQtyAlert = () => {
    const classes = useStyles();
    const [partsAlert, setPartsAlert] = useState([]);

    const columnsParts = [
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

    const retrievePartsAlert = () => {
        dashboardService.getAlertParts().then(
            (response) => {
                //console.log(response.data);
                setPartsAlert(response.data);
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
        retrievePartsAlert();
    }, []);

    return (
        <>
            <Typography variant="h6" className={classes.titleTable}>Spareparts Quantity Alert</Typography>
            <Paper>

                <Typography variant="h6" className={classes.table}>
                    <DataTable
                        columns={columnsParts}
                        data={partsAlert}
                    />
                </Typography>
            </Paper>
        </>
    );
};

export default CardSparepartsQtyAlert;