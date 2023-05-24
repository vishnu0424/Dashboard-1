import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import MultipleDropDownData from "../DataProfiling/SelectMultipleDropDown";
import { FuzzyAlgorithms } from "./CleaningAlgorithms";
import CleaningResultModal from "./CleaningResultModal";
import ConnectionDetails from "./ConnectionDetails";
import Fuzzyinputs from "./Fuzzyinputs";

const FuzzyreplaceForm = ({
  Connectiondetails,
  Table,
  Columns,
  toggleDrawer,
}) => {
  const [datasourcetype, setDataSourceType] = useState();
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [disableclean, setdisableclean] = useState(false);

  const [showalgo, setshowalgo] = useState(false);
  const [algorithms, setAlgorithms] = useState([]);

  const { setSnack } = useContext(SnackbarContext);

  const inputs = {
    Columnvalue: "",
    masterData: "",
    Similarity: null,
  };

  const [inputParams, setinputParams] = useState([inputs]);

  useEffect(() => {
    if (Connectiondetails.ext) setDataSourceType("File");
    else setDataSourceType("Database");
  }, []);

  const CleanData = async () => {
    setLoading(true);
    let data = {
      connectiondId: Connectiondetails?.id,
      TableName: Table,
      Operand: [
        {
          OperationName: "replaceColumnSimilarities",
          algos: algorithms.map((inp) => inp.value),
          Details: inputParams,
        },
      ],
    };
    try {
      let res = await ApiService.dataCleaning(data);
      setResult(res?.data?.dataCleaning);
      setShowResult(true);
    } catch (err) {
      setSnack({
        message: err.response.data.message,
        open: true,
        colour: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Box className="drawerHead">
        <Typography variant="h6">Data Cleaning:</Typography>
      </Box>
      <Grid container rowSpacing={2}>
        <ConnectionDetails
          Connectiondetails={Connectiondetails}
          datasourcetype={datasourcetype}
          Table={Table}
        />
        {!showalgo && (
          <IconButton
            size="small"
            onClick={() => {
              setshowalgo(!showalgo);
            }}
          >
            <Tooltip title="Advance Settings" placement="right">
              <AutoAwesomeMotionIcon />
            </Tooltip>
          </IconButton>
        )}
        {showalgo && (
          <Grid item xs={12}>
            <MultipleDropDownData
              heading={"String Matching Algorithms:"}
              placeholder={"Select Algorithms"}
              name={"Algorithms"}
              optionsList={FuzzyAlgorithms}
              Cols={algorithms}
              setCols={setAlgorithms}
            />
          </Grid>
        )}
        <Grid item xs={12} rowSpacing={2.5}>
          <Fuzzyinputs
            heading={"Replace Columns Inputs"}
            inputParams={inputParams}
            setinputParams={setinputParams}
            inputs={inputs}
            Columns={Columns}
            returnval={(val) => {
              setdisableclean(val);
            }}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          "& .MuiButton-root": {
            "&:nth-of-type(1)": {
              mr: 1,
            },
          },
        }}
      >
        <Grid
          container
          sx={{ m: 1 }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} textAlign="left">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={toggleDrawer("right", false)}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button
              disabled={loading || disableclean}
              variant="contained"
              type="submit"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              onClick={CleanData}
            >
              {loading ? (
                <>
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#ffffff",
                      marginRight: "8px",
                    }}
                  />
                  Clean Data
                </>
              ) : (
                <>Clean Data</>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showResult && (
        <CleaningResultModal
          Result={result}
          model={true}
          returnValue={() => {
            setShowResult(false);
          }}
        />
      )}
    </Box>
  );
};

export default FuzzyreplaceForm;
