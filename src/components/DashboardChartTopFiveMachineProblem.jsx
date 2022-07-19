import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import dashboardService from "../services/dashboard.service";
import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChartTopFiveMachineProblem() {
    const [labelQuery, setLabelQuery] = useState([]);
    const [dataQuery, setDataQuery] = useState([]);
    const [countDataQuery, setCountDataQuery] = useState(0);
    const [refreshInterval, setRefreshInterval] = useState(10000);

    const retrieveMachineStatus = () => {
        dashboardService.getTopFiveMachineProblem().then(
            (response) => {
                //console.log(response.data)
                if (response.data.length > 0) {
                    var data = response.data;
                    //console.log(response.data);
                    var arrayLabel = [];
                    var arrayData = [];
                    data.map((item) => {
                        arrayLabel.push(item.machine_name);
                        arrayData.push(item.total_problem);
                    })
                    setLabelQuery(arrayLabel);
                    setDataQuery(arrayData);
                    setCountDataQuery(response.data.length)
                } else {
                    
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
        );

        
    };

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(() => retrieveMachineStatus(), refreshInterval);
            return () => clearInterval(interval)
        }
    }, [refreshInterval]);

    const random_rgba = () => {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', 0.9)';
    }

    //let count_machine = 6;
    let random_rgba_array = [];

    for (var i = 0; i < countDataQuery; i++) {
        //console.log(random_rgba())
        random_rgba_array.push(random_rgba());
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'Top 5 Machine Problem',
            },
        },
    };

    const labels = labelQuery;

    const data = {
        labels,
        datasets: [
            {
                label: 'Total problem',
                data: dataQuery,
                backgroundColor: random_rgba_array,
            },
        ],
    };

    return (
        <Box style={{ textAlign: "center" }}>
            {/* <Typography variant="h5">Top 5 Machine Problems</Typography> */}
            <Box>
                <Bar data={data} options={options} />
            </Box>
        </Box>
    )
}

export default DashboardChartTopFiveMachineProblem;