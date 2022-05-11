import React, { useState } from "react";
import { Collapse, makeStyles, Typography } from "@material-ui/core";
import { AssignmentTurnedIn, Build, Description, ExpandLess, ExpandMore, Report } from "@material-ui/icons";
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
}));

const LeftbarOperator = () => {
    const classes = useStyles();
    const [openOperator, setOpenOperator] = useState(false);

    const handleClickOperator = () => {
        setOpenOperator(!openOperator);
    };

    return (
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
    );
};

export default LeftbarOperator;