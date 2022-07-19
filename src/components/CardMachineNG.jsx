import { makeStyles, Paper, Typography } from "@material-ui/core";
import dashboardService from "../services/dashboard.service";
import React, { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    wrapperResultNG: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: "center",
        /* backgroundColor: theme.palette.error.light */
    },
    result: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    fontNG: {
        color: theme.palette.error.light
    },
    wrapperCompare: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: theme.palette.background.default,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    compare: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
}));

const CardMachineNG = () => {
    const classes = useStyles();
    const [machineNG, setMachineNG] = useState({});

    const retrieveMachineNG = () => {
        dashboardService.getLatestStatusMachineNG().then(
            (response) => {
                if (response.data.length > 0) {
                    console.log(response.data)
                    const total_check = response.data[0].total_check;
                    const month = response.data[0].month;
                    const year = response.data[0].year;
                    const status_machine = response.data[0].status_machine;
                    const previous_total_check = response.data[1] ? response.data[1].total_check : 0;
                    const previous_month = response.data[1] ? response.data[1].month : "-";
                    const diff = Math.floor(total_check - previous_total_check);
                    const persen = ((total_check / previous_total_check) * 100);
                    const resultData = {
                        status_machine,
                        year,
                        total_check,
                        month,
                        previous_total_check,
                        previous_month,
                        diff,
                        persen
                    };
                    console.log(resultData)
                    setMachineNG(resultData);
                } else {
                    setMachineNG({
                        status_machine : "NA",
                        year : "year",
                        total_check : "0",
                        month : "NA",
                        previous_total_check : "0",
                        previous_month : "NA",
                        diff : "0",
                        persen : "0"
                    })
                }
                
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
        )
    };

    useEffect(() => {
        retrieveMachineNG();
    }, []);

    return (
        <>
            <Typography variant="h6">Machine Check Status NG</Typography>
            <Paper>
                <div className={classes.wrapperResultNG}>
                    <img src={process.env.REACT_APP_UPLOADS + 'icons/icon-machine-2.png'} width={80} height={80} />
                    <div className={classes.result}>
                        <Typography size="medium" variant="body1">Machine Check NG</Typography>
                        <Typography size="large" variant="h2" className={classes.fontNG}>{machineNG.total_check}</Typography>
                        <Typography size="small" variant="body2">this month</Typography>
                    </div>

                </div>
                <div className={classes.wrapperCompare}>
                    <div className={classes.compare}>
                        <Typography variant="caption">{machineNG.previous_month}{" "}{machineNG.year}</Typography>
                        <Typography variant="subtitle2">{machineNG.previous_total_check}</Typography>
                    </div>
                    <div className={classes.compare}>
                        <Typography variant="caption">{machineNG.month}{" "}{machineNG.year}</Typography>
                        <Typography variant="subtitle2">{machineNG.total_check}</Typography>
                    </div>
                    <div className={classes.compare}>
                        <Typography variant="caption">Diff</Typography>
                        <Typography variant="subtitle2">{machineNG.diff}</Typography>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default CardMachineNG;