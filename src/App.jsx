import React, { useState, useMemo, useEffect } from "react"
import { Box, Grid, makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Add from "./components/Add";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import { UserContext, InboxContext } from "./UserContext";
import authService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import ResetPassUser from "./components/ResetPassUser";
import Machines from "./components/Machines";
import FormMachine from "./components/FormMachine";
import FormMachineParts from "./components/FormMachineParts";
import Spareparts from "./components/Spareparts";
import FormSpareparts from "./components/FormSpareparts";
import SparepartsAdjust from "./components/SparepartsAdjust";
import SparepartsAdjustAdd from "./components/SparepartsAdjustAdd";
import SparepartsAdjustSubs from "./components/SparepartsAdjustSubs";
import SparepartsAdjustForm from "./components/SparepartsAdjustForm";
import Tools from "./components/Tools";
import FormTools from "./components/FormTools";
import ToolsAdjust from "./components/ToolsAdjust";
import ToolsAdjustForm from "./components/ToolsAdjustForm";
import ToolsAdjustList from "./components/ToolsAdjustList";
import CheckMachine from "./components/CheckMachine";
import FormCheckMachine from "./components/FormCheckMachine";
import ApprCheckMachine from "./components/ApprCheckMachine";
import FormApprCheckMachine from "./components/FormApprCheckMachine";
import Org from "./components/Org";
import OrgList from "./components/OrgList";
import OrgClass from "./components/OrgClass";
import FormOrgList from "./components/FormOrgList";
import FormOrgClass from "./components/FormOrgClass";
import Job from "./components/Job";
import JobList from "./components/JobList";
import FormJobList from "./components/FormJobList";
import JobClass from "./components/JobClass";
import FormJobClass from "./components/FormJobClass";
import Shift from "./components/Shift";
import FormShift from "./components/FormShift";
import Role from "./components/Role";
import FormRole from "./components/FormRole";
import Inbox from "./components/Inbox";
import FormInbox from "./components/FormInbox";
import DocInspection from "./components/DocInspection";
import FormDocInspection from "./components/FormDocInspection";
import DocInstruction from "./components/DocInstruction";
import SparepartsExcel from "./components/SparepartsExcel";
import FormSparepartsExcel from "./components/FormSparepartsExcel";
import FormToolsExcel from "./components/FormToolsExcel";
import ScheduleMtc from "./components/ScheduleMtc";
import FormScheduleMtc from "./components/FormScheduleMtc";
import ViewScheduleMtc from "./components/ViewScheduleMtc";
import FormScheduleMtcExcel from "./components/FormScheduleMtcExcel";
import ProblemMachine from "./components/ProblemMachine";
import FormProblemMachine from "./components/FormProblemMachine";
import ReportApprCheckMachine from "./components/ReportApprCheckMachine";
import ReportScheduleMtc from "./components/ReportScheduleMtc";
import ReportProblemMachine from "./components/ReportProblemMachine";
import ReportTools from "./components/ReportTools";
import ReportSpareparts from "./components/ReportSpareparts";
import QRscanner from "./components/QRscanner";
import FormEditProfile from "./components/FormEditProfile";
import Equipment from "./components/Equipment";
import FormEquipment from "./components/FormEquipment";
import FormEquipmentExcel from "./components/FormEquipmentExcel";
import FormMgrApprCheckMachine from "./components/FormMgrApprCheckMachine";



const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("xs")] : {
      display: "none"
    },
  },
  bg : {
    backgroundImage: `url("/images/bg-image.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}));

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [totalNotif, setTotalNotif] = useState(authService.getTotalInboxUser());

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const valueInbox = useMemo(() => ({ totalNotif, setTotalNotif }), [totalNotif, setTotalNotif]);

  return (
    <ThemeProvider theme={theme}>
    <UserContext.Provider value={value}>
      <InboxContext.Provider value={valueInbox}>
          <Routes>
            <Route path="equipment/upload-excel" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormEquipmentExcel />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="equipment/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormEquipment />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="equipment/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormEquipment />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="equipment" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Equipment />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="edit-profile" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormEditProfile />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="qr-scanner-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <QRscanner />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="report/spareparts" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ReportSpareparts />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="report/tools" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ReportTools />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="report/problem-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ReportProblemMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="report/appr-check-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ReportApprCheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="report/schedule-mtc" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ReportScheduleMtc />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="doc-instruction" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <DocInstruction />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="problem-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ProblemMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="problem-machine/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormProblemMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="problem-machine/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormProblemMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="schedule-mtc" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ScheduleMtc />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="schedule-mtc/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormScheduleMtc />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="schedule-mtc/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormScheduleMtc />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="schedule-mtc/view/:id" element={<React.Fragment>
              <Navbar />
              <Grid container>
                <Grid item xs={2}>
                  <Leftbar />
                </Grid>
                <Grid item xs={10} className={classes.bg}>
                  <ViewScheduleMtc />
                </Grid>
              </Grid>
            </React.Fragment>} />
            <Route path="schedule-mtc/upload-excel" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormScheduleMtcExcel />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="doc-inspection" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <DocInspection />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="doc-inspection/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormDocInspection />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="doc-inspection/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormDocInspection />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="inbox" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Inbox />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="inbox/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormInbox />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="role" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Role />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="role/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormRole />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="role/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormRole />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="shift" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Shift />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="shift/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormShift />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="shift/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormShift />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="job" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Job />
                    </Grid>
                  </Grid>
                </React.Fragment>} >
              <Route path="list" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <JobList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormJobList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormJobList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <JobClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormJobClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormJobClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              </Route>
            <Route path="organization" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Org />
                    </Grid>
                  </Grid>
                </React.Fragment>} >
              <Route path="list" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <OrgList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormOrgList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormOrgList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <OrgClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormOrgClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="class/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormOrgClass />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              </Route>
            <Route path="check-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <CheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="check-machine/form/:id/:code" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormCheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="appr-check-machine" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ApprCheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="appr-check-machine/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormApprCheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="mgr-appr-check-machine/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormMgrApprCheckMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="tools" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Tools />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="tools/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormTools />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="tools/upload-excel" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormToolsExcel />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="tools/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormTools />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="tools-adjust/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ToolsAdjust />
                    </Grid>
                  </Grid>
                </React.Fragment>} >
              <Route path="list" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ToolsAdjustList />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ToolsAdjustForm />
                    </Grid>
                  </Grid>
                </React.Fragment>} /> 
              </Route>
            <Route path="spareparts" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Spareparts />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="spareparts/excel" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <SparepartsExcel />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="spareparts/upload-excel" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormSparepartsExcel />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="spareparts/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormSpareparts />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="spareparts/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormSpareparts />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="spareparts-adjust/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <SparepartsAdjust />
                    </Grid>
                  </Grid>
                </React.Fragment>} >
              <Route path="addition" element={<SparepartsAdjustAdd />} />
              <Route path="substraction" element={<SparepartsAdjustSubs />} />
              <Route path="form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <SparepartsAdjustForm />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              </Route>
            <Route path="machines" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Machines />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="machines/form" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="machines/form/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormMachine />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="machines/parts/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <FormMachineParts />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="users" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Users />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
            <Route path="users/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <EditUser />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="users/reset/:id" element={<React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <ResetPassUser />
                    </Grid>
                  </Grid>
                </React.Fragment>} />
              <Route path="login" element={<Login/>} />
            <Route path="dashboard" element={<Dashboard />} />
              <Route path="/" element={
                <React.Fragment>
                  <Navbar />
                  <Grid container>
                    <Grid item xs={2}>
                      <Leftbar/>
                    </Grid>
                    <Grid item xs={10} className={classes.bg}>
                      <Home/>
                    </Grid>
                  </Grid>
                </React.Fragment>} />
          </Routes>
    </InboxContext.Provider>
  </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;