import { Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ChartTotalProblem from './ChartTotalProblem';
import ChartProblemInMonth from './ChartProblemInMonth';
import CardMachineOK from './CardMachineOK';
import CardMachineNG from './CardMachineNG';
import CardSparepartsQtyAlert from "./CardSparepartsQtyAlert";
import CardToolsQtyAlert from "./CardToolsQtyAlert";
import ChartMinutesProblem from "./ChartMinutesProblem";
import CardSummaryShift from "./CardSummaryShift";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    }
}));

const Home = () => {
    const classes = useStyles();
    
    return (
        <Container className={classes.container} maxWidth="xl">
            <Typography variant="h4" className={classes.title}>Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CardSummaryShift/>
                </Grid>

                <Grid item xs={12}>
                    <ChartMinutesProblem />
                </Grid>

                <Grid item xs={6}>
                    <ChartTotalProblem/>
                </Grid>

                <Grid item xs={6}>
                    <ChartProblemInMonth/>
                </Grid>

                <Grid item xs={6}>
                    <CardMachineOK />
                </Grid>
                <Grid item xs={6}>
                    <CardMachineNG />
                </Grid>

                <Grid item xs={6}>
                    <CardSparepartsQtyAlert/>
                    
                </Grid> 
                <Grid item xs={6}>
                    <CardToolsQtyAlert/>
                </Grid> 
                
            </Grid>
        </Container>
    );
};

export default Home;