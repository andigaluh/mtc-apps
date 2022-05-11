import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import dashboardService from "../services/dashboard.service";
import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title, 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title,);


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    }
}));


const ChartProblemInMonth = () => {
    const classes = useStyles();
    const [totalProblemBar, setTotalProblemBar] = useState([]);
    const [countMachineBar, setCountMachineBar] = useState(0);
    const [labelMachineBar, setLabelMachineBar] = useState([]);
    const [countProblemBar, setCountProblemBar] = useState([]);

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let monthName = month[d.getMonth()];
    let thisYear = d.getFullYear();

    const retrieveTotalProblemInMonth = () => {
        dashboardService.getTotalProblemMachineInMonth().then(
            (response) => {
                var data = response.data;
                //console.log(response.data);
                var arrayName = [];
                var arrayCount = [];
                data.map((item) => {
                    arrayName.push(item.name);
                    arrayCount.push(item.countProblem);
                })
                setLabelMachineBar(arrayName);
                setCountProblemBar(arrayCount);
                setCountMachineBar(response.data.length)

                setTotalProblemBar(response.data);
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
        retrieveTotalProblemInMonth();
    }, []);

    const random_rgba = () => {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', 0.9)';
    }

    //let count_machine = 6;
    let random_rgba_array = [];

    for (var i = 0; i < countMachineBar; i++) {
        //console.log(random_rgba())
        random_rgba_array.push(random_rgba());
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },

        },
    };

    const dataBar = {
        labels: labelMachineBar,
        datasets: [
            {
                label: 'count',
                data: countProblemBar,
                backgroundColor: random_rgba_array,
            },
        ],
    };

    return (
        <>
            <Typography variant="h6">Problem Machine in {monthName}{" "}{thisYear}</Typography>
            <Paper>
                <Bar options={options} data={dataBar} />
            </Paper>
        </>
    );
};

export default ChartProblemInMonth;