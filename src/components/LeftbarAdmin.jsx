import React, { useState } from "react";
import { Collapse, makeStyles, Typography } from "@material-ui/core";
import { AccountTree, AssignmentTurnedIn, Build, Colorize, Description, ExpandLess, ExpandMore, HowToReg, LocalMall, LocalPrintshop, Opacity, PeopleAlt, Report, ReportProblem, Schedule, Settings, SupervisorAccount, VerifiedUser } from "@material-ui/icons";
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

const LeftbarAdmin = () => {
    const classes = useStyles();
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openSetup, setOpenSetup] = useState(false);

    const handleClickAdmin = () => {
        setOpenAdmin(!openAdmin);
    };

    const handleClickSetup = () => {
        setOpenSetup(!openSetup);
    };

    return (
        <React.Fragment>
            <div className={classes.item} onClick={handleClickAdmin}>
                <SupervisorAccount className={classes.icon} />
                <Typography className={classes.text} >Admin</Typography>
                {openAdmin ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}
            </div>

            <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                <div className={classes.nested}>
                    <Link to="/users" className={classes.link}>
                        <PeopleAlt className={classes.icon} />
                        <Typography className={classes.text} >Users</Typography>
                    </Link>
                </div>

                <div className={classes.nested}>
                    <Link to="/machines" className={classes.link}>
                        <LocalPrintshop className={classes.icon} />
                        <Typography className={classes.text} >Machines</Typography>
                    </Link>
                </div>

                <div className={classes.nested}>
                    <Link to="/doc-inspection" className={classes.link}>
                        <Description className={classes.icon} />
                        <Typography className={classes.text} >Doc Inspection</Typography>
                    </Link>
                </div>

                <div className={classes.nested} onClick={handleClickSetup}>
                    <Settings className={classes.icon} />
                    <Typography className={classes.text} >Setup</Typography>
                    {openSetup ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}
                </div>

                <Collapse in={openSetup} timeout="auto" unmountOnExit>
                    <div className={classes.subnested}>
                        <Link to="/organization/list" className={classes.link}>
                            <AccountTree className={classes.icon} />
                            <Typography className={classes.text} >Organization</Typography>
                        </Link>
                    </div>
                    <div className={classes.subnested}>
                        <Link to="/job/list" className={classes.link}>
                            <LocalMall className={classes.icon} />
                            <Typography className={classes.text} >Job</Typography>
                        </Link>
                    </div>
                    <div className={classes.subnested}>
                        <Link to="/shift" className={classes.link}>
                            <Schedule className={classes.icon} />
                            <Typography className={classes.text} >Shift</Typography>
                        </Link>
                    </div>
                    {/* <div className={classes.subnested}>
                        <Link to="/role" className={classes.link}>
                                <GroupWork className={classes.icon} />
                            <Typography className={classes.text} >Role</Typography>
                        </Link>
                    </div> */}
                </Collapse>
            </Collapse>
        </React.Fragment>
    );
};

export default LeftbarAdmin;