import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
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

function DashboardCardTotalMachineCheck() {
  const [labelQuery, setLabelQuery] = useState([]);
  const [dataQuery, setDataQuery] = useState([]);
  const [finishCheck, setFinishCheck] = useState(0);
  const [unFinishCheck, setUnFinishCheck] = useState(0)
  const [dateToday, setDateToday] = useState("");
  const [refreshInterval, setRefreshInterval] = useState(10000);

  const retrieveTotalMachineCheck = () => {
    dashboardService.getTotalMachineCheckStatus().then(
        (response) => {
            //console.log(response.data);
            const data = response.data;
            setFinishCheck(data.totalFinishMachineCheckInDay)
            setUnFinishCheck(data.totalUnFinishMachineCheckInDay)
            setDateToday(data.today)
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
        const interval = setInterval(() => retrieveTotalMachineCheck(), refreshInterval);
        return () => clearInterval(interval)
      }
    }, [refreshInterval])

  return (
    <Box style={{textAlign: "center"}}>
          <Box>
            <Typography variant="body2">Total Machine Check {dateToday}</Typography>
              <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                              <TableCell align="center" style={{ backgroundColor: "green", color: "white" }}>Finish Check</TableCell>
                              <TableCell align="center" style={{ backgroundColor: "orange", color: "white" }}>Not Yet Check</TableCell>
                        </TableRow>
                    </TableHead>
                      <TableBody>
                        <TableRow >
                              <TableCell align="center" style={{ backgroundColor: "green", color: "white"}}>
                                  {finishCheck}
                            </TableCell>
                              <TableCell align="center" style={{ backgroundColor: "orange", color: "white" }}>
                                  {unFinishCheck}
                              </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
    </Box>
  )
}

export default DashboardCardTotalMachineCheck