import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import { useTheme } from '@material-ui/styles'
import grey from '@material-ui/core/colors/grey';
import DashboardChartMachineTroubleTrending from './DashboardChartMachineTroubleTrending';
import DashboardChartMachineTroubleInMonth from './DashboardChartMachineTroubleInMonth';
import DashboardChartMachineCheckStatus from './DashboardChartMachineCheckStatus';
import DashboardChartTopFiveMachineProblem from './DashboardChartTopFiveMachineProblem';
import DashboardCardTotalMachineCheck from './DashboardCardTotalMachineCheck';
import CardSparepartsQtyAlert from './CardSparepartsQtyAlert';
import CardToolsQtyAlert from './CardToolsQtyAlert';
import CardSummaryShift from './CardSummaryShift';

const Dashboard = () => {
 const theme = useTheme()
  return (
    <React.Fragment>
      <Container maxWidth="xl" >
      <Grid container spacing={2} style={{ margin: theme.spacing(1),}}>
            <Grid item xs={12} md={4}>
              <DashboardChartMachineTroubleTrending />
            </Grid>
            <Grid item xs={12} md={4}><DashboardChartMachineTroubleInMonth/></Grid>
            <Grid item xs={12} md={4}><DashboardChartMachineCheckStatus /></Grid>
            <Grid item xs={12} md={4}>
              <DashboardChartTopFiveMachineProblem /> 
            </Grid>
            <Grid item xs={12} md={4}>
              &nbsp;
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardCardTotalMachineCheck />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardSparepartsQtyAlert />
            </Grid>
          <Grid item xs={12} md={4}>
            <CardToolsQtyAlert />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardSummaryShift />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard