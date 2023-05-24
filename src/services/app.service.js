import axios from "axios";
import authHeader from "./auth-header";

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers.common["Authorization"] = authHeader().Authorization;

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      const user = localStorage.getItem("userDataValidation", null);
      if (!user && !user.token) {
        console.log("No token found");
      }
    }
    return Promise.reject(error);
  }
);

class ApiService {
  TestConnection(data) {
    return axios.post("/connections/test-connection", data);
  }
  ConnectionsList(data) {
    return axios.post("/connections/", data);
  }
  CheckConnectionUnique(data) {
    return axios.post("/connections/check-by-cname", data);
  }
  ConnectionCreate(data) {
    return axios.post("/connections/create", data);
  }
  ConnectionUpdate(data, id) {
    return axios.put("/connections/" + id, data);
  }
  ConnectionDetails(id, data = "") {
    return axios.get(
      "/connections/tables-by-connection/" + id + "?data=" + data,
      {}
    );
  }
  ConnectionTablesColumns(id) {
    return axios.get("/data-profiling/tables-columns/" + id);
  }
  ConnectionDelete(data) {
    return axios.post("/connections/delete", data);
  }
  ConnectionDatabaseTables(data) {
    return axios.post("/connections/get-data-by-table", data);
  }
  getFilesList(data) {
    return axios.post("/files", data);
  }
  uploadFiles(data) {
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      formData.append(key2, data[key2]);
    });
    return axios.post("/files/create", formData);
  }

  deleteFiles(data) {
    return axios.post("/files/delete", data);
  }
  GetFilesData(data) {
    return axios.post("/files/get-file-data", data);
  }
  ConnectionDetailsDataValidation(data) {
    return axios.post(
      "/connections/get-connection-details-datavalidation",
      data
    );
  }
  createValidation(data) {
    return axios.post("/validations/create", data);
  }
  checkValidation(data) {
    return axios.post("/validations/validate", data);
  }
  GetDataValidations(data) {
    return axios.post("/validations/", data);
  }
  GetDataValidationByID(id) {
    return axios.get("/validations/" + id);
  }
  ValidationTestDelete(data) {
    return axios.post("/validations/delete", data);
  }
  sqlPreviewData(data) {
    return axios.post("/connections/raw-query-excution", data);
  }
  ValidationResult(id) {
    return axios.get("/validations/validation-result/" + id);
  }
  ExcuteTestValidation(id) {
    return axios.get("/validations/excute-test-validation/" + id);
  }
  editValidation(id) {
    return axios.get("/validations/" + id);
  }
  updateValidation(data, id) {
    return axios.post("/validations/update/" + id, data);
  }

  //scheduled test
  createScheduleRun(data) {
    return axios.post("/schedulers/create", data);
  }
  getScheduledList(data) {
    return axios.post("/schedulers/", data);
  }
  getValidationList() {
    return axios.get("/validations/list/");
  }
  deleteScheduledTest(data) {
    return axios.post("/schedulers/delete", data);
  }
  updateScheduledTestData(id, data) {
    return axios.put("/schedulers/update/" + id, data);
  }
  getDashboardData(data) {
    return axios.post("/dashboard/get-data", data);
  }
  checkScheduledTitle(data) {
    return axios.post("/schedulers/check-unique-title", data);
  }
  getUsersList(data) {
    return axios.post("/users", data);
  }
  addUser(data) {
    return axios.post("/users/register", data);
  }
  editUser(data, id) {
    return axios.post("/users/update/" + id, data);
  }
  createSmtp(data) {
    return axios.post("/smtp/get-data/", data);
  }
  getSmtp() {
    return axios.get("/smtp/get-data/");
  }
  deleteUser(data) {
    return axios.post("/users/delete", data);
  }
  createPileLine(data) {
    return axios.post("/pipelines/create", data);
  }
  checkPipeLineTitle(data) {
    return axios.post("/pipelines/check-unique-title", data);
  }
  getPipeLinesList(data) {
    return axios.post("/pipelines/", data);
  }
  deletePipeLine(data) {
    return axios.post("/pipelines/delete", data);
  }
  updatePipeLineData(id, data) {
    return axios.put("/pipelines/update/" + id, data);
  }
  getTestResultsWithIds(data) {
    return axios.post("/validations/results-by-id", data);
  }
  dataProfiling(data) {
    return axios.post("/data-profiling", data);
  }
  dataProfilingFile(data) {
    return axios.post("/data-profiling/python", data);
  }
  dataSources(data) {
    return axios.post("/data-source/list", data);
  }
  getDataSourceByType(data) {
    return axios.post("/data-source/connections", data);
  }
  imageComparision(data) {
    return axios.post("/reports/image-comaprision", data);
  }
  ChartDataAnalyzor(data) {
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      formData.append(key2, data[key2]);
    });
    return axios.post("/reports/chart-data-analyzor", formData);
  }
  testHubDataSources() {
    return axios.post("/connections/source");
  }
  getVisualTestList() {
    return axios.post("/visual-test");
  }
  createVisualTest(data) {
    if (data) {
      data["IgnoredAreas"] = JSON.stringify(data["IgnoredAreas"]);
    }
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      formData.append(key2, data[key2]);
    });
    return axios.post("/visual-test/create", formData);
  }
  editVisualTest(id, data) {
    if (data) {
      data["IgnoredAreas"] = JSON.stringify(data["IgnoredAreas"]);
    }
    let formData = new FormData();
    Object.keys(data).forEach((key2) => {
      formData.append(key2, data[key2]);
    });
    return axios.post("/visual-test/update/" + id, formData);
  }
  deleteVisualTest(data) {
    return axios.post("/visual-test/delete", data);
  }
  executeTest(id) {
    return axios.post("/visual-test/execute/" + id);
  }
  viewVisualTestResults(id) {
    return axios.get("/visual-test/execution-results/" + id);
  }
  getConnectionsByType(data) {
    return axios.post("/connections/apis", data);
  }
  dataCleaning(data) {
    return axios.post("/data-cleaning", data);
  }
  dataCleaningdtype(data) {
    return axios.post("/data-cleaning/data-type", data);
  }
  MasterdataUpload(data) {
    return axios.post("/master-data/create", data);
  }
  Masterdatalist() {
    return axios.get("/master-data");
  }
  deleteMasterdata(data) {
    return axios.post("/master-data/delete", data);
  }
  getmasterdatabyId(data) {
    return axios.post("/master-data/get-file-data", data);
  }
  getApiAutomation() {
    return axios.get("/api-automations/");
  }
  getApiAutomationByid(id) {
    return axios.get("/api-automations/" + id);
  }
  postApiAutomation(data) {
    return axios.post("/api-automations/", data);
  }
  testApiAutomation(id) {
    return axios.get("/api-automations/execute/" + id);
  }
  DeleteApiAutomation(data) {
    return axios.post("/api-automations/delete/", data);
  }
  getApiCollection(id) {
    return axios.get("/api-automations/" + id);
  }
  SingleAutomationExection(data) {
    return axios.post("/api-automations/single-api-execution", data);
  }
  ApiExecutionResultsByid(id) {
    return axios.get("/api-automations/collection-results/" + id);
  }
}

export default new ApiService();
