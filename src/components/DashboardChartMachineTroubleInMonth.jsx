import { Box, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import dashboardService from "../services/dashboard.service";
import { useTheme } from '@material-ui/core/styles';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardChartMachineTroubleInMonth() {
    const theme = useTheme();
    const [totalProblem, setTotalProblem] = useState([]);
    const [totalProblemBar, setTotalProblemBar] = useState([]);
    const [countMachineBar, setCountMachineBar] = useState(0);
    const [labelMachineBar, setLabelMachineBar] = useState([]);
    const [countProblemBar, setCountProblemBar] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState(10000);

    const retrieveTotalProblem = () => {
        dashboardService.getDownTimeProblemMachineThisMonth().then(
            (response) => {
                var data = response.data;
                //console.log(response.data);
                var arrayName = [];
                var arrayCount = [];
                data.filter((p) => p.total_minutes_problem != null).map((item) => {
                    arrayName.push(item.name);
                    arrayCount.push(item.total_minutes_problem);
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
            const interval = setInterval(() => retrieveTotalProblem(), refreshInterval);
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

    const data = {
        labels: labelMachineBar,
        datasets: [
            {
                label: '# of Problem',
                data: countProblemBar,
                backgroundColor: random_rgba_array,
                borderWidth: 1,
            },
        ],
    };
    const options = {
        plugins : {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Machine Downtime (this month)',
            },
        },
        maintainAspectRatio: true,
        aspectRatio: 1.5
    }

  return (
      <Box style={{ textAlign: "center"}}>
          {/* <Typography variant="h5">Machine Downtime (this month)</Typography> */}
          <Box>
              <Doughnut data={data} options={options}/>
          </Box>
      </Box>
  )
}

export default DashboardChartMachineTroubleInMonth