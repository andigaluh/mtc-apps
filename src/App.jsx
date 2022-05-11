import React, { useState, useMemo, useEffect } from "react"
import { Grid, makeStyles } from "@material-ui/core";
import Add from "./components/Add";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import { UserContext, InboxContext } from "./UserContext";
import authService from "./services/auth.service";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"
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

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [totalNotif, setTotalNotif] = useState(authService.getTotalInboxUser());

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const valueInbox = useMemo(() => ({ totalNotif, setTotalNotif }), [totalNotif, setTotalNotif]);

  return (
    <UserContext.Provider value={value}>
      <InboxContext.Provider value={valueInbox}>
      <Navbar />
        <Grid container>
        <Grid item xs={2}>
          <Leftbar/>
        </Grid>
        <Grid item xs={10} className={classes.bg}>
          <Routes>
            <Route path="equipment/upload-excel" element={<FormEquipmentExcel />} />
            <Route path="equipment/form" element={<FormEquipment/>} />
            <Route path="equipment/form/:id" element={<FormEquipment/>} />
            <Route path="equipment" element={<Equipment/>} />
            <Route path="edit-profile" element={<FormEditProfile/>} />
            <Route path="qr-scanner-machine" element={<QRscanner/>} />
            <Route path="report/spareparts" element={<ReportSpareparts/>} />
            <Route path="report/tools" element={<ReportTools/>} />
            <Route path="report/problem-machine" element={<ReportProblemMachine/>} />
            <Route path="report/appr-check-machine" element={<ReportApprCheckMachine/>} />
            <Route path="report/schedule-mtc" element={<ReportScheduleMtc/>} />
            <Route path="doc-instruction" element={<DocInstruction/>} />
            <Route path="problem-machine" element={<ProblemMachine/>} />
            <Route path="problem-machine/form" element={<FormProblemMachine/>} />
            <Route path="problem-machine/form/:id" element={<FormProblemMachine/>} />
            <Route path="schedule-mtc" element={<ScheduleMtc/>} />
            <Route path="schedule-mtc/form" element={<FormScheduleMtc/>} />
            <Route path="schedule-mtc/form/:id" element={<FormScheduleMtc/>} />
            <Route path="schedule-mtc/upload-excel" element={<FormScheduleMtcExcel />} />
            <Route path="doc-inspection" element={<DocInspection />} />
            <Route path="doc-inspection/form" element={<FormDocInspection />} />
            <Route path="doc-inspection/form/:id" element={<FormDocInspection />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="inbox/form/:id" element={<FormInbox />} />
            <Route path="role" element={<Role />} />
            <Route path="role/form" element={<FormRole />} />
            <Route path="role/form/:id" element={<FormRole />} />
            <Route path="shift" element={<Shift/>} />
            <Route path="shift/form" element={<FormShift/>} />
            <Route path="shift/form/:id" element={<FormShift/>} />
            <Route path="job" element={<Job />} >
              <Route path="list" element={<JobList />} />
              <Route path="form/:id" element={<FormJobList />} />
              <Route path="form" element={<FormJobList />} />
              <Route path="class" element={<JobClass />} />
              <Route path="class/form" element={<FormJobClass />} />
              <Route path="class/form/:id" element={<FormJobClass />} />
            </Route>
            <Route path="organization" element={<Org/>} >
              <Route path="list" element={<OrgList />} />
              <Route path="form/:id" element={<FormOrgList />} />
              <Route path="form" element={<FormOrgList />} />
              <Route path="class" element={<OrgClass />} />
              <Route path="class/form" element={<FormOrgClass />} />
              <Route path="class/form/:id" element={<FormOrgClass />} />
            </Route>
            <Route path="check-machine" element={<CheckMachine/>} />
            <Route path="check-machine/form/:id/:code" element={<FormCheckMachine/>} />
            <Route path="appr-check-machine" element={<ApprCheckMachine />} />
            <Route path="appr-check-machine/form/:id" element={<FormApprCheckMachine />} />
            <Route path="mgr-appr-check-machine/form/:id" element={<FormMgrApprCheckMachine/>} />
            <Route path="tools" element={<Tools />} />
            <Route path="tools/form" element={<FormTools />} />
            <Route path="tools/upload-excel" element={<FormToolsExcel />} />
            <Route path="tools/form/:id" element={<FormTools />} />
            <Route path="tools-adjust/:id" element={<ToolsAdjust />} >
              <Route path="list" element={<ToolsAdjustList />} />
              <Route path="form" element={<ToolsAdjustForm />} /> 
            </Route>
            <Route path="spareparts" element={<Spareparts/>} />
            <Route path="spareparts/excel" element={<SparepartsExcel/>} />
            <Route path="spareparts/upload-excel" element={<FormSparepartsExcel/>} />
            <Route path="spareparts/form" element={<FormSpareparts/>} />
            <Route path="spareparts/form/:id" element={<FormSpareparts/>} />
            <Route path="spareparts-adjust/:id" element={<SparepartsAdjust/>} >
              <Route path="addition" element={<SparepartsAdjustAdd/>} />
              <Route path="substraction" element={<SparepartsAdjustSubs/>} />
              <Route path="form" element={<SparepartsAdjustForm/>} />
            </Route>
            <Route path="machines" element={<Machines/>} />
            <Route path="machines/form" element={<FormMachine/>} />
            <Route path="machines/form/:id" element={<FormMachine/>} />
            <Route path="machines/parts/:id" element={<FormMachineParts/>} />
            <Route path="users" element={<Users/>} />
            <Route path="users/:id" element={<EditUser/>} />
            <Route path="users/reset/:id" element={<ResetPassUser/>} />
            <Route path="login" element={<Login/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </Grid>
        
      </Grid>
    </InboxContext.Provider>
  </UserContext.Provider>
  );
};

export default App;