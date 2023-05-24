import { useState, useEffect, useMemo} from "react";
import AddConnection from "../Connection/List/AddConnection";
import SingleSelect from "../SingleSearchDropDown";
import { DatabasePreview } from "./databasepreview";
import { FilePreview } from "./FileDataPreview";
import { NewFile } from "./newfile";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function DataSource({
  heading,
  fileoptions,
  databaseoptions,
  loadfiles,
  loaddatabase,
  obj,
  hide,
}) {
  const [type, setType] = useState("database");
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [selectMetaData, setSelectMetaData] = useState({});
  const [selectedOption, setselectedOption] = useState();

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  //connection meta data
  const databaseMetaData = {
    label: "Select Connection",
    placeholder: "Filter connection list",
  };

  //files meta data
  const fileMetaData = {
    label: "Select File",
    placeholder: "Filter file list",
  };

  useMemo(() => {
    if (obj === "File") {
      setType("file");
    } else {
      setType("database");
    }
  }, [obj]);

  useEffect(() => {
    if (type === "database") {
      setSelectMetaData(databaseMetaData);
      setOptions(databaseoptions);
    } else {
      setSelectMetaData(fileMetaData);
      setOptions(fileoptions);
    }
  }, [fileoptions, databaseoptions]);

  // use this while changing checkbox
  const setDataSource = (e) => {
    setType(e.target.value);
    if (e.target.value === "file") {
      setValue(null);
      loadfiles(null);
      setSelectMetaData(fileMetaData);
      setOptions(fileoptions);
    } else {
      setValue(null);
      loaddatabase(null);
      setSelectMetaData(databaseMetaData);
      setOptions(databaseoptions);
    }
  };

  return (
    <Grid item className="comBgcolor" xs={12} lg={hide ? 12 : 6} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>{heading}:</FormLabel>
          <RadioGroup
            row
            name="First data source"
            value={type}
            onChange={(e) => setDataSource(e)}
            onClick={() => {
              setselectedOption();
            }}
          >
            <FormControlLabel
              value="database"
              control={<Radio />}
              label="Database"
            />
            <FormControlLabel value="file" control={<Radio />} label="File" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item className="selectConnection" xs={12}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <FormLabel>{selectMetaData.label}: </FormLabel>
          </Grid>
          <Grid item xs={hide ? 12 : 8}>
            <SingleSelect
              options={options}
              metaData={selectMetaData}
              value={value}
              setValue={setValue}
              selectedValue={(val) => {
                if (type === "database") {
                  loaddatabase(val);
                } else {
                  loadfiles(val);
                }
                setselectedOption(val);
              }}
            />
          </Grid>
          {!hide && (
            <Grid item xs={4}>
              {type === "file" && (
                <NewFile
                  returnValue={(val) => {
                    setValue(val);
                    setselectedOption(val);
                    loadfiles(val);
                  }}
                  toggleDrawer={toggleDrawer}
                  state={state}
                  setState={setState}
                  type_of={"button"}
                />
              )}
              {type === "database" && (
                <AddConnection
                  type={"Create"}
                  returnValue={(val) => {
                    setValue(val);
                    setselectedOption(val);
                    loaddatabase(val);
                  }}
                />
              )}
              {type === "database" && (
                <DatabasePreview
                  selectedOption={selectedOption}
                  heading={heading}
                />
              )}
              {type === "file" && (
                <FilePreview
                  selectedOption={selectedOption}
                  heading={heading}
                />
              )}
            </Grid>
          )}
        </Grid>
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={12}>
            {selectedOption && (
              <>
                {type === "database" ? (
                  <Typography>
                    <b>Database type:</b> {selectedOption.connectionType} |{" "}
                    <b>Server:</b> {selectedOption.server} | <b>Database:</b>{" "}
                    {selectedOption.dataBase}
                  </Typography>
                ) : (
                  <Typography>
                    <b>Type:</b> {selectedOption.ext} | <b>Size :</b>{" "}
                    {(selectedOption.size * 0.001).toFixed(1)}KB{" "}
                  </Typography>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
