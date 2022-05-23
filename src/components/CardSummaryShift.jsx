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

const CardSummaryShift = () => {
    const classes = useStyles();
    const [partsAlert, setPartsAlert] = useState([]);

    const columnsParts = [
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "code",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Shift 1",
            selector: (row) => row.shift_1,
            sortable: true,
            cell: (row) => {
                return (
                    <React.Fragment>
                        {row.shift_1 && row.shift_1 ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>CHECK</span>
                        ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                NOT CHECK
                            </span>
                        )}
                    </React.Fragment>
                );
            },
        }, 
        {
            name: "Shift 2",
            selector: (row) => row.shift_2,
            sortable: true,
            cell: (row) => {
                return (
                    <React.Fragment>
                        {row.shift_2 && row.shift_2 ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>CHECK</span>
                        ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                NOT CHECK
                            </span>
                        )}
                    </React.Fragment>
                );
            },
        },
        {
            name: "Shift 3",
            selector: (row) => row.shift_3,
            sortable: true,
            cell: (row) => {
                return (
                    <React.Fragment>
                        {row.shift_3 && row.shift_3 ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>CHECK</span>
                        ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                NOT CHECK
                            </span>
                        )}
                    </React.Fragment>
                );
            },
        } 
    ];

    const retrievePartsAlert = () => {
        dashboardService.getSummaryShift().then(
            (response) => {
                setPartsAlert(response.data.dataMachine);
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
            <Typography variant="h6" className={classes.titleTable}>Check Machine Summary</Typography>
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

export default CardSummaryShift;