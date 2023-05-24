import { Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { ThemeProvider } from "@mui/material/styles";
import React, { createContext, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import ApiAutomation from "./components/ApiAutomation";
import ApiAutomationCreate from "./components/ApiAutomation/create";
import Chart from "./components/Chart/Chart";
import Connectionlist from "./components/Connection/List/";
import EditConnectionDataValidations from "./components/Connection/List/editValidation";
import ConnectionDataValidations from "./components/Connection/List/Validation";
import DashBoard from "./components/DashBoard/DashBoard";
import DashboardLayout from "./components/DashboardLayout";
import DataProfiling from "./components/DataProfiling";
import EditFileValidations from "./components/Files/editValidation";
import FFileValidations from "./components/Files/Validation";
import ImageComparison from "./components/ImageComparison/ImageComparison";
import SignIn from "./components/Login/";
import MasterData from "./components/MasterData";
import PipeLineList from "./components/PipeLines/PipeLineList";
import Settings from "./components/Settings/Settings";
import { theme } from "./components/Styles";
import ScheduledList from "./components/TestScheduler/ScheduledList";
import Validations from "./components/Validations";
import DataValidationsList from "./components/Validations/DataValidationsList";
import EditCompareValidation from "./components/Validations/EditCompareValidation";
import SingleAPI from "./components/Validations/SingleApi";
import SingleDatabase from "./components/Validations/SingleDatabase";
import SingleFile from "./components/Validations/SingleFile";
import DatabaseToFile from "./components/Validations/Step2/DatabaseToFile";
import ValidationsResultPDF from "./components/Validations/ValidationsResultPDF";
import VisualTest from "./components/VisualTest";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserContext = createContext();
export const SnackbarContext = createContext({});

const PrivateRoute = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDataValidation"));
  return userDetails ? children : <Navigate to="/login" />;
};

const SidebarLayout = () => (
  <>
    <DashboardLayout />
    <Outlet />
  </>
);

function App() {
  const [user, setUser] = useState([]);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const userDetails = JSON.parse(localStorage.getItem("userDataValidation"));
  const [isActive, setActive] = useState(false);

  // toaster start
  const initialState = {
    message: "",
    color: "",
    open: false,
  };
  const [snack, setSnack] = useState(initialState);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(initialState);
    setSnack({ ...snack, open: !snack.open });
  };

  //toaster end

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box>
          <Router>
            {/* toaster for all components*/}
            <SnackbarContext.Provider value={{ snack, setSnack }}>
              {/* toaster */}
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snack.open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={snack.colour}>
                  {snack.message}
                </Alert>
              </Snackbar>
              <>
                <Routes>
                  <Route path="/login" element={<SignIn />} />
                </Routes>
              </>
              {/* toaster */}
              <div>
                <Box
                  component="main"
                  sx={{ display: "flex", padding: "48px 24px 24px" }}
                >
                  <Routes>
                    <Route element={<SidebarLayout />}>
                      <Route path="/Dashboard" element={<DashBoard />} />
                      <Route
                        path="/"
                        element={
                          <PrivateRoute>
                            <Connectionlist />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/test-hub"
                        element={
                          <PrivateRoute>
                            <DataValidationsList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/connections/"
                        element={
                          <PrivateRoute>
                            <Connectionlist />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/connection/data-validations/:connectionId"
                        element={
                          <PrivateRoute>
                            <ConnectionDataValidations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/edit/connection/data-validation/:connectionId/:testId"
                        element={
                          <PrivateRoute>
                            <EditConnectionDataValidations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/validations"
                        element={
                          <PrivateRoute>
                            <Validations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/edit/validation/:testId"
                        element={
                          <PrivateRoute>
                            <EditCompareValidation />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/singlefile"
                        element={
                          <PrivateRoute>
                            {" "}
                            <SingleFile />{" "}
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/singledatabase"
                        element={
                          <PrivateRoute>
                            {" "}
                            <SingleDatabase />{" "}
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/files/validations/:fileId"
                        element={
                          <PrivateRoute>
                            <FFileValidations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="edit/files/validations/:fileId/:testId"
                        element={
                          <PrivateRoute>
                            <EditFileValidations />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/Validate"
                        element={
                          <PrivateRoute>
                            <DatabaseToFile />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/ValidationsResult"
                        element={
                          <PrivateRoute>
                            <ValidationsResultPDF />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/image"
                        element={
                          <PrivateRoute>
                            <ImageComparison />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/chart"
                        element={
                          <PrivateRoute>
                            <Chart />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/scheduled/list"
                        element={
                          <PrivateRoute>
                            <ScheduledList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/pipeline/list"
                        element={
                          <PrivateRoute>
                            <PipeLineList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/Settings"
                        element={
                          <PrivateRoute>
                            <Settings />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/ContentValidation"
                        element={
                          <DashboardLayout>Content Validation</DashboardLayout>
                        }
                      />
                      <Route
                        path="/data/profiling"
                        element={
                          <PrivateRoute>
                            <DataProfiling />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/visual/test"
                        element={
                          <PrivateRoute>
                            <VisualTest />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/singleapi"
                        element={
                          <PrivateRoute>
                            <SingleAPI />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/api-automation"
                        element={
                          <PrivateRoute>
                            <ApiAutomation />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/api-automation/create"
                        element={
                          <PrivateRoute>
                            <ApiAutomationCreate />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/api-automation/edit/:id"
                        element={
                          <PrivateRoute>
                            <ApiAutomationCreate />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/masterdata"
                        element={
                          <PrivateRoute>
                            <MasterData />
                          </PrivateRoute>
                        }
                      />
                    </Route>
                  </Routes>
                </Box>
              </div>
            </SnackbarContext.Provider>
            {/* toaster end*/}
          </Router>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
