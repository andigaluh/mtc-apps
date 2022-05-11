import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import dashboardService from "../services/dashboard.service";
import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    }
}));

const ChartTotalProblem = () => {
    const classes = useStyles();
    const [totalProblem, setTotalProblem] = useState([]);
    const [countMachine, setCountMachine] = useState(0);
    const [labelMachine, setLabelMachine] = useState([]);
    const [countProblem, setCountProblem] = useState([]);

    const retrieveTotalProblem = () => {
        dashboardService.getTotalProblemMachine().then(
            (response) => {
                var data = response.data;
                var arrayName = [];
                var arrayCount = [];
                data.map((item) => {
                    arrayName.push(item.name);
                    arrayCount.push(item.countProblem);
                })
                setLabelMachine(arrayName);
                setCountProblem(arrayCount);
                setCountMachine(response.data.length)

                setTotalProblem(response.data);
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
        retrieveTotalProblem();
    }, []);

    const random_rgba = () => {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', 0.9)';
    }

    //let count_machine = 6;
    let random_rgba_array = [];

    for (var i = 0; i < countMachine; i++) {
        //console.log(random_rgba())
        random_rgba_array.push(random_rgba());
    }

    const data = {
        labels: labelMachine,
        datasets: [
            {
                label: '# of Problem',
                data: countProblem,
                backgroundColor: random_rgba_array,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Typography variant="h6">Total Problem Machine</Typography>
            <Paper>
                <Doughnut data={data} />
            </Paper>
        </>
    );
};

export default ChartTotalProblem;