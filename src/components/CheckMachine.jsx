import React, { useState, useContext, useEffect } from "react";
import { Card, CardActionArea, CardContent, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { UserContext} from "../UserContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import machineService from "../services/machine.service";
import { PhotoCamera, Print } from "@material-ui/icons";
import TokenService from "../services/token.service";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    wrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"wrap"
    },
    card:{
        marginRight:theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    link:{
        textDecoration:"none",
        color:"#555"
    },
    titleMachine:{
        display:"flex",
        alignItems:"center"
    },
    icon:{
        marginRight:theme.spacing(1)
    },
    wrapperScanner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
}));

const CheckMachine = () => {
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const [currentItem, setCurrentItem] = useState([]);
    const navigate = useNavigate();
    const retrieveItem = () => {

        machineService.getAll().then(
            (response) => {
                setCurrentItem(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                if (error.response && error.response.status === 403) {
                    TokenService.removeUser();
                    navigate("/login", { replace: true });
                }
                console.log(_content)
            }
        );
    };

    useEffect(() => {
        retrieveItem();
    }, []);

    return (
        <Container className={classes.container} maxWidth="xl">
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            {!user.roles.includes("ROLE_OPERATOR") ? (
                <Typography>Not Allowed</Typography>
            ) : ( 
                <React.Fragment>
                <Typography variant="h4" className={classes.title}>Check Machine</Typography>
                
                <div className={classes.wrapperScanner}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <Link to={"/qr-scanner-machine"} className={classes.link}>
                                <CardContent>
                                    <PhotoCamera style={{ fontSize: 120 }}/>
                                    <Typography variant="h6">Scan QR code</Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>   
                </div>
                <Typography variant="subtitle2" className={classes.title}>OR : Choose machine</Typography>
                <div className={classes.wrapper}>
                    <Grid container spacing={2}>
                        {currentItem && currentItem.map((value, index) => (
                            <Grid item xs={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <Link to={`/check-machine/form/${value.id}/${value.code}`} className={classes.link}>
                                <CardContent>
                                    
                                    <Typography variant="h6" className={classes.titleMachine}><Print size="small" className={classes.icon}/> {value.code}</Typography>
                                    <Typography variant="body1">{value.name}</Typography>

                                </CardContent>
                                </Link>
                            </CardActionArea>
                        </Card>   
                            </Grid>
                        ))} 
                    </Grid>
                </div> 
                </React.Fragment>
            )}
        </Container>
    );
};

export default CheckMachine;