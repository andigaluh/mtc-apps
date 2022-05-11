import React, { useState } from "react";
import { Collapse, makeStyles, Typography } from "@material-ui/core";
import { AssignmentTurnedIn, Build, Colorize, Description, ExpandLess, ExpandMore, HowToReg, Opacity, Report, ReportProblem, Schedule, VerifiedUser } from "@material-ui/icons";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    item: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer"
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px"
        }
    },
    text: {
        fontWeight: 500,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        [theme.breakpoints.only("sm")]: {
            display: "block",
            fontSize: 12
        }
    },
    iconExpand: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    link: {
        textDecoration: "none",
        display: "Flex",
        alignItems: "center"
    },
    nested: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            paddingLeft: theme.spacing(2),
        },
    },
    subnested: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            paddingLeft: theme.spacing(4),
        },
    },
}));

const LeftbarManager = () => {
    const classes = useStyles();
    const [openSupervisor, setOpenSupervisor] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const handleClickSupervisor = () => {
        setOpenSupervisor(!openSupervisor);
    };

    const handleClickReport = () => {
        setOpenReport(!openReport);
    };

    return (
        <React.Fragment>
            <div className={classes.item} onClick={handleClickSupervisor}>
                <HowToReg className={classes.icon} />
                <Typography className={classes.text} >Manager</Typography>
                {openSupervisor ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}

            </div>

            <Collapse in={openSupervisor} timeout="auto" unmountOnExit>
                <div className={classes.nested} onClick={handleClickReport}>
                    <Report className={classes.icon} />
                    <Typography className={classes.text} >Report</Typography>
                    {openReport ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}
                </div>

                <Collapse in={openReport} timeout="auto" unmountOnExit>
                    <div className={classes.subnested}>
                        <Link to="/report/appr-check-machine" className={classes.link}>
                            <VerifiedUser className={classes.icon} />
                            <Typography className={classes.text} >Appr Check Machine</Typography>
                        </Link>
                    </div>

                    <div className={classes.subnested}>
                        <Link to="/report/schedule-mtc" className={classes.link}>
                            <Schedule className={classes.icon} />
                            <Typography className={classes.text} >Schedule Mtc</Typography>
                        </Link>
                    </div>

                    <div className={classes.subnested}>
                        <Link to="/report/problem-machine" className={classes.link}>
                            <ReportProblem className={classes.icon} />
                            <Typography className={classes.text} >Problem Machine</Typography>
                        </Link>
                    </div>

                    <div className={classes.subnested}>
                        <Link to="/report/tools" className={classes.link}>
                            <Colorize className={classes.icon} />
                            <Typography className={classes.text} >Tools</Typography>
                        </Link>
                    </div>

                    <div className={classes.subnested}>
                        <Link to="/report/spareparts" className={classes.link}>
                            <Opacity className={classes.icon} />
                            <Typography className={classes.text} >Spareparts</Typography>
                        </Link>
                    </div>
                </Collapse>
            </Collapse>




        </React.Fragment>
    );
};

export default LeftbarManager;