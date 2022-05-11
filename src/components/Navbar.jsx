import { AppBar, makeStyles, Toolbar, Typography, alpha, Badge, Avatar, Collapse, Modal } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import { AssignmentTurnedIn, Mail, Notifications } from "@material-ui/icons"
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, InboxContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")] : {
            display: "block"
        }
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")] : {
            display: "none"
        }
    },
    toolbar : {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            display: (props) =>  (props.open) ? "flex" : "none",
            width: "70%"
        }
    },
    input : {
        color: "white",
        marginLeft: theme.spacing(1)
    },
    icons: {
        alignItems: "center",
        display: (props) => (props.open ? "none" : "flex"),
    },
    badge: {
        marginRight: theme.spacing(2)
    },
    cancel: {
        [theme.breakpoints.up("sm")] : {
            display: "none"
        }
    },
    searchButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",

        }
    },
    username:{
        marginLeft: theme.spacing(1),
        color:"white",
        textDecoration:"none",
    },
    link:{
        color: "white",
        textDecoration: "none",
    },
    avatar: {
        backgroundColor: grey,
    }
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const Navbar = () => {
    const { user } = useContext(UserContext);
    const { totalNotif } = useContext(InboxContext); 
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const classes = useStyles({ open });
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false);

    const handleClickProfile = () => {
        setOpenProfile(!openProfile);
    };

    const handleOpenModal = (item) => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.logoLg}>
                    <img src={"./images/logo-sharp.png"} alt={"logo"} width="120" style={{marginTop: 7}}/>
                </Typography>
                <Typography variant="h6" className={classes.logoSm}>
                    App
                </Typography>
                
                <div className={classes.icons}>
                    {user ? (
                        <React.Fragment>
                            <Link to={"/inbox"} className={classes.link}>
                                <Badge badgeContent={totalNotif} color="secondary" className={classes.badge}>
                                    <Notifications />
                                </Badge>
                            </Link>
                            <Avatar alt={user.name} className={classes.avatar}>
                                {/* {user.name.toUpperCase().substring(0,1)} */}
                                {user.picture ? (
                                    <>
                                        <img src={process.env.REACT_APP_UPLOADS + user.picture} alt={user.name} className={classes.photo} width={60}/>
                                        <Modal
                                            open={openModal}
                                            onClose={handleCloseModal}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            
                                        >
                                            <div style={modalStyle} className={classes.paper}>
                                                <p id="simple-modal-description">
                                                    <img src={process.env.REACT_APP_UPLOADS + user.picture} alt={user.name} className={classes.photo}/>

                                                </p>
                                            </div>
                                        </Modal>
                                    </>
                                ) : (
                                     <>
                                    { user.name.toUpperCase().substring(0, 1) }
                                        </>
                                )}
                                
                            </Avatar>

                            <Link to={"/edit-profile"} className={classes.link}>
                                <Typography className={classes.username}>{user.name}</Typography>
                            </Link>
                            
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="login">
                                <Typography className={classes.username}>Login</Typography>
                            </Link>
                        </React.Fragment>
                    )}
                    
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;