import { Container, makeStyles, Typography, Collapse } from "@material-ui/core";
import { AccountTree, AssignmentTurnedIn, Build, Code, Colorize, Description, ExitToApp, ExpandLess, ExpandMore, GroupWork, Home, HowToReg, LocalMall, LocalPrintshop, Lock, Opacity, PeopleAlt, Report, ReportProblem, Schedule, Send, Settings, SupervisorAccount, VerifiedUser } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { UserContext, InboxContext } from "../UserContext";
import React, { useContext, useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        color: "white",
        position: "sticky",
        top: 0,
        [theme.breakpoints.up("sm")]: {
            backgroundColor: "white",
            color: "#555",
            border: "1px solid #ece7e7"
        }
    },
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
    iconExpand: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
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
            paddingLeft: theme.spacing(1),
        },

    },
}));

const LeftbarBU = () => {
    const { user, setUser } = useContext(UserContext);
    const { totalNotif, setTotalNotif } = useContext(InboxContext);
    const classes = useStyles();
    let navigate = useNavigate();
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openSetup, setOpenSetup] = useState(false);
    const [openOperator, setOpenOperator] = useState(false);
    const [openEngineer, setOpenEngineer] = useState(false);
    const [openSupervisor, setOpenSupervisor] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const handleClickSupervisor = () => {
        setOpenSupervisor(!openSupervisor);
    };

    const handleClickEngineer = () => {
        setOpenEngineer(!openEngineer);
    };

    const handleClickAdmin = () => {
        setOpenAdmin(!openAdmin);
    };

    const handleClickOperator = () => {
        setOpenOperator(!openOperator);
    };

    const handleClickSetup = () => {
        setOpenSetup(!openSetup);
    };

    const handleClickReport = () => {
        setOpenReport(!openReport);
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setTotalNotif(0);
        navigate("../login", { replace: true })
    }

    useEffect(() => {

    }, [])

    return (
        <Container className={classes.container}>

            <div className={classes.item}>
                <Link to="/" className={classes.link}>
                    <Home className={classes.icon} />
                    <Typography className={classes.text} >Dashboard</Typography>
                </Link>
            </div>
            <div className={classes.item}>
                <Link to="/doc-instruction" className={classes.link}>
                    <Description className={classes.icon} />
                    <Typography className={classes.text} >Doc Instruction</Typography>
                </Link>
            </div>

            {user && user.roles.includes("ROLE_OPERATOR") && (
                <React.Fragment>
                    <div className={classes.item} onClick={handleClickOperator}>
                        <Build className={classes.icon} />
                        <Typography className={classes.text} >Operator</Typography>
                        {openOperator ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}

                    </div>

                    <Collapse in={openOperator} timeout="auto" unmountOnExit>
                        <div className={classes.nested}>
                            <Link to="/check-machine" className={classes.link}>
                                <AssignmentTurnedIn className={classes.icon} />
                                <Typography className={classes.text} >Check Machine</Typography>
                            </Link>
                        </div>
                    </Collapse>

                </React.Fragment>
            )}

            {/* {user && user.roles.includes("ROLE_ENGINEER") && (
                <React.Fragment>
                    <div className={classes.item} onClick={handleClickEngineer}>
                        <Code className={classes.icon} />
                        <Typography className={classes.text} >Engineer</Typography>
                        {openEngineer ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}

                    </div>

                    <Collapse in={openEngineer} timeout="auto" unmountOnExit>
                        <div className={classes.nested}>
                            <Link to="/tools" className={classes.link}>
                                <Colorize className={classes.icon} />
                                <Typography className={classes.text} >Tools</Typography>
                            </Link>
                        </div>
                    </Collapse>

                </React.Fragment>
            )} */}

            {user && user.roles.includes("ROLE_SUPERVISOR") && (
                <React.Fragment>
                    <div className={classes.item} onClick={handleClickSupervisor}>
                        <HowToReg className={classes.icon} />
                        <Typography className={classes.text} >Supervisor</Typography>
                        {openSupervisor ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}

                    </div>

                    <Collapse in={openSupervisor} timeout="auto" unmountOnExit>
                        <div className={classes.nested}>
                            <Link to="/appr-check-machine" className={classes.link}>
                                <VerifiedUser className={classes.icon} />
                                <Typography className={classes.text} >Appr Check Machine</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/schedule-mtc" className={classes.link}>
                                <Schedule className={classes.icon} />
                                <Typography className={classes.text} >Schedule Mtc</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/problem-machine" className={classes.link}>
                                <ReportProblem className={classes.icon} />
                                <Typography className={classes.text} >Problem Machine</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/tools" className={classes.link}>
                                <Colorize className={classes.icon} />
                                <Typography className={classes.text} >Tools</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/spareparts" className={classes.link}>
                                <Opacity className={classes.icon} />
                                <Typography className={classes.text} >Spareparts</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/equipment" className={classes.link}>
                                <Opacity className={classes.icon} />
                                <Typography className={classes.text} >Equipment</Typography>
                            </Link>
                        </div>
                    </Collapse>

                    <div className={classes.item} onClick={handleClickReport}>
                        <Report className={classes.icon} />
                        <Typography className={classes.text} >Report</Typography>
                        {openReport ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}
                    </div>

                    <Collapse in={openReport} timeout="auto" unmountOnExit>
                        <div className={classes.nested}>
                            <Link to="/report/appr-check-machine" className={classes.link}>
                                <VerifiedUser className={classes.icon} />
                                <Typography className={classes.text} >Appr Check Machine</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/report/schedule-mtc" className={classes.link}>
                                <Schedule className={classes.icon} />
                                <Typography className={classes.text} >Schedule Mtc</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/report/problem-machine" className={classes.link}>
                                <ReportProblem className={classes.icon} />
                                <Typography className={classes.text} >Problem Machine</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/report/tools" className={classes.link}>
                                <Colorize className={classes.icon} />
                                <Typography className={classes.text} >Tools</Typography>
                            </Link>
                        </div>

                        <div className={classes.nested}>
                            <Link to="/report/spareparts" className={classes.link}>
                                <Opacity className={classes.icon} />
                                <Typography className={classes.text} >Spareparts</Typography>
                            </Link>
                        </div>
                    </Collapse>

                </React.Fragment>
            )}

            {user && user.roles.includes("ROLE_ADMIN") && (
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

                    </Collapse>

                    <div className={classes.item} onClick={handleClickSetup}>
                        <Settings className={classes.icon} />
                        <Typography className={classes.text} >Setup</Typography>
                        {openSetup ? <ExpandLess className={classes.iconExpand} /> : <ExpandMore className={classes.iconExpand} />}
                    </div>

                    <Collapse in={openSetup} timeout="auto" unmountOnExit>
                        <div className={classes.nested}>
                            <Link to="/organization/list" className={classes.link}>
                                <AccountTree className={classes.icon} />
                                <Typography className={classes.text} >Organization</Typography>
                            </Link>
                        </div>
                        <div className={classes.nested}>
                            <Link to="/job/list" className={classes.link}>
                                <LocalMall className={classes.icon} />
                                <Typography className={classes.text} >Job</Typography>
                            </Link>
                        </div>
                        <div className={classes.nested}>
                            <Link to="/shift" className={classes.link}>
                                <Schedule className={classes.icon} />
                                <Typography className={classes.text} >Shift</Typography>
                            </Link>
                        </div>
                        {/* <div className={classes.nested}>
                        <Link to="/role" className={classes.link}>
                                <GroupWork className={classes.icon} />
                            <Typography className={classes.text} >Role</Typography>
                        </Link>
                    </div> */}
                    </Collapse>

                </React.Fragment>
            )}

            {user && (
                <div className={classes.item} onClick={handleLogout}>
                    <ExitToApp className={classes.icon} />
                    <Typography className={classes.text} >Logout</Typography>
                </div>
            )}

        </Container>
    );
};

export default LeftbarBU;