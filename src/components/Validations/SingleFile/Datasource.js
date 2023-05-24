import { FormLabel, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddConnection from "../../Connection/List/AddConnection";
import { PopUp } from "../../Connection/List/PopUp";
import SingleSelect from "../../SingleSearchDropDown";
import { DatabasePreview } from "../databasepreview";
import { FilePreview } from "../FileDataPreview";
import { NewFile } from "../newfile";

export default function DataSource({
  activeStep,
  heading,
  fileoptions,
  databaseoptions,
  loadfiles,
  loaddatabase,
  type,
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [selectMetaData, setSelectMetaData] = useState({});
  const [selectedOption, setselectedOption] = useState();
  const [state, setState] = useState({ right: false });

  //connection meta data
  const databaseMetaData = {
    label: "Select Data Source",
    placeholder: "Filter Data Source list",
  };

  //files meta data
  const fileMetaData = {
    label: "Select Data Source",
    placeholder: "Filter Data Source list",
  };

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

  useEffect(() => {
    if (type === "database") {
      setSelectMetaData(databaseMetaData);
      setOptions(databaseoptions);
    } else {
      setSelectMetaData(fileMetaData);
      setOptions(fileoptions);
    }
  }, [fileoptions, databaseoptions]);

  return (
    <Grid container>
      <Grid item xs={12} lg={2}></Grid>
      <Grid item xs={12} lg={8} sx={{ p: 2 }}>
        <Grid item className="selectConnection" xs={12}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <FormLabel>{selectMetaData.label}: </FormLabel>
            </Grid>
            <Grid item xs={8}>
              <SingleSelect
                options={options}
                metaData={selectMetaData}
                value={value}
                setValue={setValue}
                selectedValue={(val) => {
                  if (type === "database") {
                    loaddatabase(val, false);
                  } else {
                    loadfiles(val, false);
                  }
                  setselectedOption(val);
                }}
              />
            </Grid>
            {activeStep === 0 && (
              <Grid item xs={4}>
                {type === "APIS" && (
                  <PopUp
                    type="Add"
                    setPreview={""}
                    connectionType={"Web App"}
                    connectionData={{}}
                    type_of={"button"}
                    allRows={(val) => {
                      setValue(val.response);
                      loadfiles(val.response, true);
                      setselectedOption(val.response);
                    }}
                  />
                )}
                {type === "file" && (
                  <NewFile
                    returnValue={(val) => {
                      setValue(val);
                      setselectedOption(val);
                      loadfiles(val, true);
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
                      loaddatabase(val, true);
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
                {type === "APIS" && (
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
                      <b>Type:</b> {selectedOption.connectionType}
                      {selectedOption.size && (
                        <>
                          {" "}
                          | <b>Size :</b>{" "}
                          {(selectedOption.size * 0.001).toFixed(1)}KB{" "}
                        </>
                      )}
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
