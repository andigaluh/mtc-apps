import { Box, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dashboardService from "../services/dashboard.service";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function DashboardChartMachineTroubleTrending() {
    const [totalProblemBar, setTotalProblemBar] = useState([]);
    const [countMachineBar, setCountMachineBar] = useState(0);
    const [labelMachineBar, setLabelMachineBar] = useState([]);
    const [countProblemBar, setCountProblemBar] = useState([]);
    //const [tahun, setTahun] = useState(new Date().getFullYear);
    const [refreshInterval, setRefreshInterval] = useState(10000);
    
    const retrieveTotalProblemInMonth = () => {
        dashboardService.getMachineTroubleTrending().then(
            (response) => {
                var data = response.data;
                //console.log(response.data);
                var arrayName = [];
                var arrayCount = [];
                data.map((item) => {
                    arrayName.push(`${item.month} ${item.year}`);
                    arrayCount.push(item.total_problem);
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
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(() => retrieveTotalProblemInMonth(), refreshInterval);
            return () => clearInterval(interval)
        }
    }, [refreshInterval]);

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
                position: 'top',
            },
            title: {
                display: true,
                text: `Machine Trouble Trending`,
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
    <Box style={{ textAlign: "center"}}>
        {/* <Typography variant="h5">Machine Trouble Trending</Typography> */}
        <Box>
              <Line options={options} data={dataBar} />
        </Box>
    </Box>
  )
}

export default DashboardChartMachineTroubleTrending