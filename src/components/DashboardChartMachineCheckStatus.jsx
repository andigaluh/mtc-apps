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

function DashboardChartMachineCheckStatus() {
    const [machineOK, setMachineOK] = useState({});
    const [machineNG, setMachineNG] = useState({});
    const [statusMachineOK, setStatusMachineOK] = useState([])
    const [statusMachineNG, setStatusMachineNG] = useState([])
    const [refreshInterval, setRefreshInterval] = useState(10000);

    const retrieveMachineStatus = () => {
        dashboardService.getLatestStatusMachineOK().then(
            (response) => {
                //console.log(response.data)
                if (response.data.length > 0) {
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
                    //console.log([previous_total_check, total_check, diff])
                    setStatusMachineOK([previous_total_check, total_check, diff])
                    //console.log(resultData)
                    setMachineOK(resultData);
                } else {
                    setMachineOK({
                        status_machine: "NA",
                        year: "year",
                        total_check: "0",
                        month: "NA",
                        previous_total_check: "0",
                        previous_month: "NA",
                        diff: "0",
                        persen: "0"
                    });
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

        dashboardService.getLatestStatusMachineNG().then(
            (response) => {
                if (response.data.length > 0) {
                    //console.log(response.data)
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
                    //console.log([previous_total_check, total_check, diff])
                    //console.log(resultData)
                    setStatusMachineNG([previous_total_check, total_check, diff])
                    setMachineNG(resultData);
                } else {
                    setMachineNG({
                        status_machine: "NA",
                        year: "year",
                        total_check: "0",
                        month: "NA",
                        previous_total_check: "0",
                        previous_month: "NA",
                        diff: "0",
                        persen: "0"
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
        );
    };

    useEffect(() => {
        //retrieveMachineStatus();
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(() => retrieveMachineStatus(), refreshInterval);
            return () => clearInterval(interval)
        }
    }, [refreshInterval]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Machine Check Status',
            },
        },
    };

    const labels = ['Last Month', 'This Month', 'Difference'];

    const data = {
        labels,
        datasets: [
            {
                label: 'OK',
                data: statusMachineOK,
                backgroundColor: 'rgba(53, 162, 235, 1)',
            },
            {
                label: 'NG',
                data: statusMachineNG,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

  return (
      <Box style={{ textAlign: "center" }}>
          {/* <Typography variant="h5">Machine Check Status</Typography> */}
          <Box>
              <Bar data={data} options={options}/>
          </Box>
      </Box>
  )
}

export default DashboardChartMachineCheckStatus