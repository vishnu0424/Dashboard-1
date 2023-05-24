import { blue, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontSize: 12,
    },
    h5: {
      fontSize: 18,
      fontWeight: 600,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
    },
    bold: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#71787e",
          fontFamily: "Poppins, Helvetica, 'sans-serif'",
          backgroundColor: "#f6f6f6",
          "& strong , b": {
            fontWeight: 600,
          },
          //Paper UI
          "& .MuiPaper-root": {
            boxShadow: "0 0px 12px rgb(0 0 0 / 8%)",
          },
          "& .MuiPaper-root.MuiPaper-elevation0": {
            boxShadow: "none",
          },
          //Paper UI End
          // Side Menu
          "& .sidemenuCus": {
            "& .MuiDrawer-paper": {
              backgroundColor: "#ffffff",
              color: "#37474f",
              zIndex: "1100",
              boxShadow: "0 0 10px 0 rgb(9 110 182 / 25%)",
              border: 0,
              "& .css-cveggr-MuiListItemIcon-root": {
                minWidth: "40px",
              },
              "& svg": {
                color: "#90a4ae",
                fontSize: "1.3rem",
              },
            },
            "& a": {
              color: "#406887",
              "& span.MuiTypography-root": {
                fontWeight: "300",
              },
            },
            "& a.active": {
              color: "#fff",
              "& .css-1gjdz3h-MuiTypography-root": {
                fontSize: "14px",
              },
              "& .MuiListItem-button": {
                background: "#096eb6",
              },
              "& svg": {
                color: "#fff",
              },
            },
            "& hr": {
              borderColor: "rgb(255 255 255 / 12%)",
            },
            "& .css-1u2mxbp": {
              minHeight: "48px",
            },
          },
          // Side Menu End

          //Header
          "& .headerCus": {
            backgroundColor: "#f6f6f6",
            width: "100%",
            boxShadow: "none",
            "& .MuiToolbar-root": {
              minHeight: "48px",
              backgroundColor: "#f6f6f6",
              color: "#096eb6",
              borderRadius: "0px",
              boxShadow: "none",

              "& .css-azeo8y-MuiAvatar-root": {
                color: "#207398",
                backgroundColor: "#ffffff",
              },
            },
            "& .MuiButtonBase-root": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
            "& .MuiTypography-h5": {
              background: "linear-gradient(to right, #2c65f4, #e73323)",
              backgroundClip: "text",
              textFillColor: "transparent",
            },
          },
          //Header End

          //svg icon css
          "& .MuiSvgIcon-root": {
            fontSize: "inherit",
          },
          "& .createBtn": {
            float: "right",
            padding: "8px 0",

            "& .MuiToolbar-root": {
              backgroundColor: "transparent",
              padding: 0,
            },

            "& .MuiIconButton-root": {
              borderRadius: "4px",
              backgroundColor: "#fff",
              color: "#808b9a",
              border: "1px solid #808b9a",
              marginLeft: "4px",
              "&:hover": {
                color: "#296df5",
              },
            },
          },
          "& .refreshBtn": {
            float: "left",
            padding: "8px 0",
            "& .MuiButtonBase-root": {
              border: "1px solid #bdbdbd",
              borderRadius: "4px",
            },
          },
          "& .pvTestSch": {
            "& .refreshBtn": {
              paddingLeft: 16,
            },
            "& .createBtn": {
              paddingRight: 16,
            },
          },
          "& .ag-theme-balham": {
            height: "100%",
            width: "100%",
            "& .highlight-header": {
              color: "green",
            },
            "& .error-header": {
              color: "#ef6c00",
            },
            "& .ag-root-wrapper-body": {
              height: "auto !important",
            },
            "& .ag-overlay": {
              position: "static",
            },
            "& .ag-ltr": {
              "& .ag-cell": {
                borderRight: "1px solid rgb(189 195 199 / 50%)",
              },
            },
            "& .ag-header": {
              backgroundColor: "#e0f3ff",
            },
            "& .rowsDisplay": {
              position: "absolute",
              bottom: "4px",
              width: "80px",
              left: "14px",
              "& .MuiSelect-select": {
                padding: "3.5px 14px",
              },
            },
          },
          "& .logoSec": {
            display: "flex",
            alignItems: "center",
            "& .menuBtn": {
              marginLeft: "0px",
            },
            "& .MuiBox-root": {
              marginRight: "8px",
            },
          },
          "& .MuiToolbar-root": {
            padding: "0px 16px",
          },
          "& .innerHeader": {
            backgroundColor: "#fff",
            color: "#90a4ae",
            padding: "8px 16px",
            marginLeft: "-24px",
            marginRight: "-24px",
            marginBottom: "16px",
            boxShadow: "0 0 10px 0 rgb(9 110 182 / 25%)",
            "& .MuiTypography-h6": {
              color: "#096fb7",
              fontSize: 16,
            },
          },
          "& .selectVal": {
            marginTop: 16,
            "& .selValBody": {
              padding: "16px",
            },
          },
          "& .selColVal": {
            minHeight: "calc(100% - 0px)",
            backgroundColor: "#eaedf7",
          },
          // Radio Button
          "& .MuiRadio-root": {
            "& svg": {
              fontSize: "18px",
            },
          },
          //Radio Button
          //Table UI
          "& table.MuiTable-root": {
            border: "1px solid rgb(189 195 199 / 50%)",
            "& tr": {
              "& th": {
                padding: "4px 10px",
                borderLeft: "1px solid rgb(189 195 199 / 50%)",
                backgroundColor: "#e0f3ff",
              },
              "& td": {
                padding: "4px 10px",
                borderLeft: "1px solid rgb(189 195 199 / 50%)",
                "& .MuiTablePaginationUnstyled-root": {
                  border: "0px",
                },
                "& .MuiIconButton-root": {
                  padding: "3px",
                  fontSize: "1rem",
                },
              },
              "& .MuiSvgIcon-root": {
                fontSize: "20px",
              },
            },
            "& tr.active": {
              backgroundColor: "#e5f6fd",
            },
          },
          //End Table UI

          "& .MuiAccordionSummary-root": {
            "& .MuiAccordionSummary-content": {
              margin: "10px 0",
            },
          },
          "& .validations": {
            "& th, & td": {
              borderLeft: 0,
              padding: "3px 10px",
            },
          },
          "& .MuiAccordion-root": {
            "& .MuiInputBase-input": {
              padding: "3px 10px",
              fontSize: "10px",
            },
            "& .MuiInputLabel-root": {
              top: "-6px",
              fontSize: "10px",
            },
            "& .MuiFormLabel-filled , .MuiInputLabel-shrink": {
              top: "2px",
            },
            "& .MuiButton-contained": {
              padding: "3px 16px",
              lineHeight: "13px",
              fontSize: "10px",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
          },
          "& .dialogCus": {
            "& .MuiDialogActions-spacing": {
              padding: "0px 0px 15px",
              justifyContent: "center",
            },
          },
          "& .MuiAccordion-root": {
            "& .expRow": {
              "& .MuiInputBase-input": {
                padding: "3px 10px",
                fontSize: "10px",
              },
              "& .MuiInputLabel-root": {
                top: "-6px",
                fontSize: "10px",
              },
              "& .MuiFormLabel-filled , .MuiInputLabel-shrink": {
                top: "2px",
              },
            },

            "& .MuiButton-contained.expBtn": {
              padding: "3px 16px",
              lineHeight: "13px",
              fontSize: "10px",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
          },

          //Ag Grid

          "& .ag-root-wrapper": {
            position: "static",
          },

          "& .ag-checkbox-input-wrapper": {
            fontSize: "12px",
            width: "12px",
            height: "12px",
            lineHeight: "12px",
          },

          //Ag Grid End

          "& .MuiStepConnector-line": {
            borderColor: "#0077fe",
            borderTopStyle: "dashed",
            borderTopWidth: "1.5px",
          },
          //PDF
          "& .PDF": {
            "& .MuiCard-root": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },

          //PDF End

          "& .passfailBtn": {
            color: "#333",
            fontSize: "12px!important",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "& span": {
              "&:nth-of-type(1)": {
                color: "green",
                marginRight: 4,
              },
              "&:nth-of-type(2)": {
                color: "#d32f2f",
                marginLeft: 4,
              },
            },
          },
          "& .expRow": {
            backgroundColor: "#fff",
          },
          //Single file
          "& .fileTextbox": {
            border: " 1px solid #ccc",
            position: "relative",
            padding: "5.4px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            overflow: "hidden",
            display: "block",
            textOverflow: "ellipsis",
            paddingRight: "25px",
            "& p": {
              position: "absolute",
              right: "5px",
              top: "5px",
              alignItems: "center",
              display: "flex",
            },
            "& svg.sucIcon": {
              position: "absolute",
              right: "5px",
              top: "4px",
              color: "green",
              fontSize: "20px",
            },
            "& svg.errIcon": {
              fontSize: "13px",
              ml: 0.4,
            },
          },
          "& .drawerFile": {
            "& .fileUpGrid1": {
              flexBasis: "100%",
              maxWidth: "100%",
            },
            "& .gridCusmd": {
              flexBasis: "50%",
              maxWidth: "50%",
            },
            "& .MuiGrid-container": {
              "& .MuiGrid-grid-xs-8": {
                flexBasis: "50%",
                maxWidth: "50%",
              },
              "& .MuiGrid-grid-xs-2": {
                flexBasis: "25%",
                maxWidth: "25%",
              },
            },
          },
          //Single file End

          // Checkbox
          "& .MuiCheckbox-root": {
            "& .MuiSvgIcon-root": {
              fontSize: "20px",
            },
          },
          // Checkbox End

          // Stepper
          "& .MuiStepper-horizontal": {
            "& .MuiStepLabel-iconContainer": {
              "& svg": {
                fontSize: "20px",
              },
            },
          },

          // Stepper End

          // Expanded Row
          "& td.expandableRow": {
            padding: "8px 8px !important",
            background: "#fff",
            "& .MuiTabs-root": {
              minHeight: "auto",
              marginBottom: 8,
              "& .MuiButtonBase-root": {
                padding: "5px 16px",
                minHeight: "auto",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiButtonBase-root.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            },
          },
          "& .passfailStatus": {
            border: "0.5px solid #3a7d33",
            padding: "5px",
            color: "#3a7d33",
            textAlign: "center",
          },
          // Expanded Row End

          //Data Profiling Page
          "& .DPMain": {
            "& .DPDropDown": {
              marginBottom: 16,
              border: "1px dashed #1976d2",
              padding: "16px",
              "& .MuiGrid-grid-lg-12": {
                padding: 0,
              },
            },
          },
          "& .DPFilter": {
            marginBottom: 8,
            "& .MuiButton-root": {
              marginLeft: 4,
            },
          },
          "& .DPConName": {
            display: "flex",
            alignItems: "center",
            "& img": {
              height: 40,
              marginRight: 8,
            },
          },
          "& .colName": {
            textAlign: "center",
            "& h6": {
              color: "#096eb6",
            },
          },

          "& .DPToolTip": {
            position: "relative",
            "& .MuiButtonBase-root": {
              position: "absolute",
              top: "0",
              right: "4px",
            },
          },
          "& .DPGraphHead": {
            padding: "8px",
            borderBottom: "1px solid #ccc",
            position: "relative",
            "& .MuiBox-root": {
              textAlign: "center",
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              borderRadius: "4px",
              "& h6": {
                color: "#096eb6",
              },
            },
            "& .MuiIconButton-root": {
              position: "absolute",
              top: "-16px",
              right: "-8px",
            },
          },

          "& .pieChart": {
            "& svg": {
              margin: "auto",
            },
            "& .dxc-labels": {
              "& g": {
                cursor: "pointer",
                "& text": {
                  cursor: "pointer",
                },
              },
            },
          },

          "& .DPGraphFooter": {
            backgroundColor: "#e7ebf0",
            textAlign: "center",
            padding: "3px 4px",
            "& p": {
              fontSize: "10px",
            },
          },
          "& .DPOuptlabel": {
            backgroundColor: "#e0f3ff",
            textAlign: "center",
            padding: "8px 0px",
          },

          //Data Profiling Page End

          "& .inputNumber": {
            "& .MuiInputBase-inputSizeSmall": {
              padding: "6.7px 14px",
            },
          },

          "& .commonHead": {
            padding: "4px 16px",
            backgroundColor: "#e5f6fd",
          },
          "& .conValHead": {
            backgroundColor: "#fff",
            padding: "4px 0px",
            border: "1px solid #ccc",
            marginBottom: "16px",
            borderRadius: "4px",
            "& .MuiTypography-bold": {
              color: "#096eb6",
            },
          },
          "& .conValSel": {
            marginBottom: "16px",
            "& .MuiButton-root": {
              marginLeft: "8px",
            },
          },

          "& .innerSubHead": {
            borderBottom: "1px solid #eee",
            padding: "4px 16px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            "& .createBtn": {
              padding: 0,
            },
            "& .MuiTypography-bold": {
              color: "#096eb6",
            },
          },

          "& .innerSubRight": {
            textAlign: "right",
          },

          //Chip UI
          "& .MuiFormControl-root": {
            "& .MuiChip-root": {
              fontSize: 12,
              "& .MuiChip-label": {
                height: 20,
              },
              "& svg": {
                fontSize: 14,
              },
            },
          },

          //Chip UI End

          //Error Message
          "& .errorText": {
            color: "#d32f2f",
            display: "flex",
            alignItems: "center",
            "& svg": {
              marginRight: "4px",
            },
          },
          "& .columnName.MuiTypography-root": {
            backgroundColor: "#e0f3ff",
            padding: "3px 8px",
            marginBottom: "4px",
            marginTop: "4px",
            borderRadius: "4px",
          },
          //Error Message End

          //Accordion
          "& .MuiAccordion-root.MuiPaper-root": {
            backgroundColor: "#f3fbff",
            padding: "6px 0px",
            "& .MuiAccordion-root": {
              boxShadow: "none",
            },
          },

          //Button UI
          "& button.MuiButtonBase-root": {
            textTransform: "none",
          },
          //Button UI

          //Comparative Result
          "& .compDSHead": {
            textAlign: "center",
            backgroundColor: "#eee",
            borderRight: "1px solid #fff",

            "& h6": {
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "0px 8px",
            },
            "& .MuiTypography-bold": {
              color: "#096eb6",
            },
          },
          "& .comValMain": {
            maxHeight: "calc(100vh - 192px)",
            overflow: "auto",
          },
          "& .compValBody": {
            border: "1px solid #eee",
            padding: 8,
            "& .compDSHead": {
              textAlign: "left",
              "& p": {
                backgroundColor: "#e0f3ff",
                color: "rgba(0, 0, 0, 0.87)",
                padding: "4px 8px",
              },
            },
          },
          "& .compHead1": {
            padding: "2px 16px",
            backgroundColor: blue[200],
            textAlign: "center",
          },
          "& .compTiles": {
            padding: "8px 0px",

            "& .tile.MuiPaper-root": {
              padding: 8,
              alignItems: "center",
              display: "flex",
              "& .MuiSvgIcon-root": {
                color: blue[500],
                fontSize: "18px",
                opacity: 0.8,
              },
              "& .MuiTypography-root": {
                marginLeft: 8,
                paddingLeft: 8,
                borderLeft: "1px solid #ccc",
                fontSize: "11px",
                "& span": {
                  opacity: 0.5,
                },
              },
              "& .MuiIconButton-root": {
                marginLeft: "auto",
              },
              "&:hover": {
                cursor: "pointer",
                backgroundColor: blue[50],
              },
            },
            "& .MuiPaper-root.TableOne": {
              "& .MuiSvgIcon-root": {
                color: "#5cb85c",
              },
            },
            "& .MuiPaper-root.TableTwo": {
              "&  .MuiSvgIcon-root": {
                color: "#f2b561",
              },
            },
          },
          //Comparativee Result End

          //Data Sources
          "& .DBListMain": {
            marginLeft: "-8px",
            marginRight: "-8px",
            "& .DBList": {
              "& .MuiDivider-root": {
                width: "50px",
                marginBottom: "8px",
              },
              "& .DBLeft": {
                cursor: "pointer",
              },

              "& img": {
                height: "70px",
              },
            },
          },
          "& .DSListItem": {
            backgroundColor: "#f2efef",
            color: "#424242",
            border: "1px solid",
            borderColor: "#e0e0e0",
            padding: "8px 16px",
            margin: "8px",
            borderRadius: "4px",
            fontSize: "0.875rem",
            position: "relative",
            transition: "transform 0.5s ease , box-shadow 0.5s ease",
            cursor: "pointer",
            "&:hover": {
              border: "1px solid #096eb6",
              boxShadow: "0 0.5em 0.5em -0.4em #096eb6",
              transform: "translateY(-0.25em)",
            },
            "&.active": {
              border: "1px solid #096eb6",
              boxShadow: "0 0.5em 0.5em -0.4em #096eb6",
              transform: "translateY(-0.25em)",
            },
            "& .DBAdd": {
              fontSize: "10px",
              cursor: "pointer",
              color: "#fff",
              border: "1px solid",
              textAlign: "center",
              backgroundColor: "#1565c0",
              borderRadius: "4px",
              position: "absolute",
              padding: "0px 6px",
              bottom: "15px",
              right: "10px",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow:
                  "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
              },
            },
          },
          "& .filterBtns": {
            padding: "16px 0px",
            textAlign: "center",
            ".css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type) , .css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)":
              {
                borderColor: "#e0e0e0",
                borderRadius: "20px",
              },
            "& .MuiToggleButton-root": {
              borderColor: "#e0e0e0",
              marginRight: 5,
              borderRadius: "20px",
              color: "inherit",
              padding: "2px 8px",
              fontSize: 12,
              "&:hover": {
                backgroundColor: "#e0f2ff",
              },
              "&.Mui-selected": {
                fontWeight: "600",
                boxShadow: "0 0 6px rgb(0 0 0 / 18%)",
                borderColor: "rgb(9 110 182 / 45%) !important",
                color: "#096eb6",
              },
            },
          },

          //Data Sources End

          //Text Field UI
          "& .MuiInputBase-root": {
            backgroundColor: "#fff",
          },

          //Text Field UI End

          //Image Upload
          "& .imageComparison": {
            width: "100%",
          },
          "& .headerImg": {
            "& .MuiFormControlLabel-root": {
              marginRight: "0px",
              "& .MuiRadio-root": {
                padding: "0 4px 0",
              },
            },
          },

          "& .corCount": {
            backgroundColor: "rgb(255 0 0 / 56%)",
            border: "1px solid red",
            fontSize: "8px",
            width: "18px",
            height: "18px",
            color: "#fff",
            borderRadius: "50%",
            lineHeight: "16.5px",
            textAlign: "center",
            position: "absolute",
            top: "-18px",
          },
          "& .ignoreCordinates": {
            backgroundColor: "#eaeff3",
            minHeight: "389px",
            borderRadius: "4px",
            "& .innerSubHead": {
              borderColor: "#ccc",
              "& h6": {
                fontSize: "12px",
              },
            },
          },
          "& .cordinatesBody": {
            padding: "8px 16px",
            height: "250px",
            overflow: "auto",
            "& .cordinatesSec": {
              "& .MuiBox-root": {
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                "& .MuiCheckbox-root": {
                  padding: 0,
                  marginRight: 2,
                },
                "& p": {
                  fontSize: "10px",
                  "& span": {
                    marginLeft: 6,
                    "&:nth-of-type(1)": {
                      marginLeft: 0,
                    },
                  },
                },
              },
            },
          },
          "& .imageCordinates": {
            padding: "8px 16px",
          },

          "& .imageUpload": {
            "& .kiHXWb": {
              width: "100%",
              minWidth: "auto",
              maxWidth: "100%",
              display: "block",
              textAlign: "center",
              height: "auto",
              border: 0,
              "& .fVfcRr": {
                display: "block",
                "& span": {
                  display: "block",
                  margin: "auto",
                },
              },
            },
            "& p": {
              color: "rgb(5 87 194 / 70%)",
              marginTop: 0,
            },
          },
          "& .filterFields": {
            marginTop: "24px",
          },
          "& .imgComOutput": {
            marginTop: "30px",
            padding: "0px 16px 16px",
            "& .imgOutput": {
              marginTop: "16px",
              height: "330px",
              backgroundColor: "#eaeff3",
              display: "flex",
              alignItems: "center",
              padding: 8,
              borderRadius: "4px",
              "& canvas": {
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "330px",
                margin: "auto",
              },
            },
            "& .ignoreCordinates": {
              minHeight: "330px",
              "& .cordinatesBody": {
                height: "202px",
                overflow: "auto",
              },
            },
          },
          "& .imgUpMain": {
            border: "1.5px dashed #0658c2",
            borderRadius: "4px",
            textAlign: "center",
            backgroundColor: "#eaeff3",
            "& .imgDisplay": {
              height: "250px",
              backgroundColor: "#fff",
              position: "relative",
              "& .imgBox": {
                textAlign: "center",
                backgroundColor: "#f9fbfa",
                display: "flex",
                height: "250px",
                alignItems: "center",

                "& img": {
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "250px",
                  margin: "auto",
                },
                "& canvas": {
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "250px",
                  margin: "auto",
                },
              },
              "& .openCorBtn": {
                position: "absolute",
                width: "100%",
                background: "transparent",
                top: 0,
                left: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "& p": {
                  display: "none",
                  margin: "auto",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "2px 8px",
                },
                "&:hover": {
                  backgroundColor: "rgb(0 0 0 / 28%)",
                  "& p": {
                    display: "block",
                  },
                },
              },
            },
          },

          //Image Upload End

          //Chart Validation
          "& .chartOutput": {
            maxHeight: "358px",
            overflow: "auto",
          },
          "& .CDAOutputBox": {
            padding: "8px",
            borderLeft: "5px solid",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0 0px 12px rgb(0 0 0 / 8%)",
            "& .colCode": {
              width: "18px",
              height: "18px",
              lineHeight: "18px",
              textAlign: "center",
              float: "right",
              borderRadius: "50%",
              color: "#fff",
            },
          },
          //Chart Validation End

          // API Form
          "& .authFields": {
            padding: "16px 16px",
            border: "1px solid #ccc",
            marginTop: "16px",
            borderRadius: "4px",
            "& p": {
              marginBottom: "8px",
            },
          },
          "& .formTabs": {
            "& .MuiTabs-root": {
              minHeight: "30px",
            },
            "& .MuiTabs-flexContainer": {
              border: "1px solid #ccc",
              display: "inline-block",
              borderRadius: "30px",
            },
            "& .MuiTabs-indicator": {
              height: "30px",
              zIndex: "-1",
              top: 1,
              borderRadius: "30px",
            },
            "& .MuiTab-root": {
              minHeight: "30px",
              height: "auto",
              padding: "0 16px",
              lineHeight: "30px",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#fff",
            },
            "& .authFields": {
              marginTop: 8,
            },
          },

          // API Form End

          //Small Button
          "& .MuiButton-root.exSmall": {
            padding: "0 8px",
            minWidth: "auto",
            fontSize: "10px",
          },
          //Small Button End

          "& .DBsec": {
            boxShadow: "0 0px 12px rgb(0 0 0 / 8%)",
            position: "relative",
            background: "#fff",
            borderRadius: 4,
            marginBottom: "20px",
            padding: 10,

            "& .MuiSvgIcon-root": {
              fontSize: "2rem",
              marginRight: "5px",
              color: "#006dba",
            },

            "& .MuiTypography-root": {
              color: "#333",
            },
            "& .MuiTypography-h6": {
              fontSize: 16,
            },
            "& a": {
              textDecoration: "none",
            },
            "& .linkCus": {
              color: "#009df6",
            },
            "&:hover": {
              border: "1px solid #096eb6",
              boxShadow: "0 0.5em 0.5em -0.4em #096eb6",
              transform: "translateY(-0.25em)",
            },
          },
          "& .PassFail": {
            "& .MuiBox-root , a": {
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            },
            "& .MuiTypography-root": {
              fontSize: 10,
            },
            "& .passed": {
              "& .MuiSvgIcon-root , .MuiTypography-root": {
                color: "#00b104",
              },
            },
            "& .failed": {
              "& .MuiSvgIcon-root , .MuiTypography-root": {
                color: "#ff0b0e",
              },
            },
            "& .MuiSvgIcon-root": {
              fontSize: "0.7rem",
              marginRight: "2px",
            },
          },
          "& .themeSwitch ": {
            ".MuiSwitch-root": {
              top: "-5px",
              right: "8px",
            },
          },
          ".selTabHead": {
            padding: "0px 8px",
            background: "#eee",
            borderRadius: "4px",
          },
          ".selTabCol": {
            padding: "5px 8px",
            "& .MuiTypography-root": {
              "&:hover": {
                background: "#eee",
                cursor: "pointer",
                paddingLeft: "8px",
                borderRadius: "4px",
              },
            },
          },
          ".noTests": {
            border: "1px solid #096eb6",
            display: "inline-block",
            padding: "2px 4px",
            lineHeight: "14px",
            borderRadius: " 4px",
            color: "#096eb6",
            fontWeight: "600",
            minWidth: "20px",
            textAlign: "center",
            cursor: "pointer",
          },
          ".previewDrawHead": {
            textAlign: "center",
            border: "1px solid #ccc",
            marginBottom: "10px",
            ".MuiGrid-container .MuiGrid-root": {
              backgroundColor: "#e5f6fd",
              border: "1px solid #fff",
            },
          },
          ".noTestsDetails": {
            marginTop: "16px",
          },
          ".comMain": {
            ".comBgcolor": {
              "&:nth-of-type(1)": {
                backgroundColor: "#e5f6fd",
              },
            },
          },
          ".comSql": {
            textAlign: "center",
            backgroundColor: "#ebebeb",
            borderRadius: "4px",
          },

          "& .preview-highlight": {
            background: "#eee !important",
            zIndex: "1 !important",
            border: "1px solid #096eb6 !important",
          },
          "& .VTPreview": {
            padding: "8px 10px",
            ".VT-Left": {
              ".MuiBox-root": {
                backgroundColor: "#f6f6f6",
                padding: "8px",
                position: "relative",
                cursor: "pointer",
                textAlign: "center",
                p: {
                  display: "none",
                },
                "&:hover": {
                  p: {
                    position: "absolute",
                    backgroundColor: "rgb(0 0 0 / 24%)",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    transition: "background-color 0.5s ease",
                    svg: {
                      margin: "auto",
                      color: "#fff",
                      fontSize: "30px",
                    },
                  },
                },

                img: {
                  width: "auto",
                  maxWidth: "100%",
                  height: "300px",
                },
              },
            },
            ".VT-Right": {
              ".MuiBox-root": {
                backgroundColor: "#f6f6f6",
                padding: "8px",
                textAlign: "center",
                ".MuiTypography-bold": {
                  color: "#096eb6",
                },
              },
            },
          },
          "& .item-selected": {
            border: "1px solid #096eb6",
            boxShadow: "0 0.5em 0.5em -0.4em #096eb6",
            transform: "translateY(-0.25em)",
            backgroundColor: "#e6e6fa",
          },
          "& .DS-Acc": {
            "&.MuiAccordion-root.MuiPaper-root": {
              padding: 0,
              backgroundColor: "transparent !important",
              boxShadow: "none",
            },

            ".MuiAccordionSummary-content": {
              margin: 0,
            },
            "& .MuiAccordionDetails-root": {
              padding: 0,
            },
            "& .MuiAccordionSummary-root": {
              backgroundColor: "#fff",
              "&:hover": {
                cursor: "default",
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                cursor: "pointer",
                textDecoration: "underline",
                color: "#096eb6",
                "&.Mui-expanded": {
                  transform: "none",
                },
              },
            },
            "& .MuiCollapse-wrapperInner.MuiCollapse-vertical": {
              transition: "height 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
          },
          "& .active-ds": {
            display: "flex",
            alignItems: "center",
            img: {
              height: "50px",
            },
            p: {
              margin: "0 8px",
              borderLeft: "1px solid #ccc",
              borderRight: "1px solid #ccc",
              padding: "0 8px",
            },
          },
          "& .ValueClass": {
            border: "1px solid #ccc",
            padding: "4px 8px",
            borderLeft: "4px solid #f9cdc9",
            backgroundColor: "#fff",
            margin: "0px 16px 8px 16px",
            display: "flow-root",
            "& .MuiFormControlLabel-labelPlacementEnd:nth-of-type(1)": {
              width: "40%",
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "600",
              },
            },

            "& .MuiFormControlLabel-labelPlacementEnd:nth-of-type(2)": {
              display: "inline-block",
              float: "right",
              marginRight: 8,
            },
            ".MuiFormControlLabel-labelPlacementEnd:nth-of-type(3)": {
              display: "inline-block",
              float: "right",
              marginRight: 16,
            },
            "& .MuiFormControl-root": {
              width: "58%",
              marginRight: 0,
              marginLeft: 0,
            },
          },
          "& .MatchClass": {
            border: "1px solid #ccc",
            padding: "4px 8px",
            margin: "0px 16px 8px 16px",
            borderLeft: "4px solid #b2d1ff",
            backgroundColor: "#fff",
            "& .MuiFormControlLabel-labelPlacementEnd:nth-of-type(1)": {
              width: "45%",
            },
            "& .MuiFormControlLabel-labelPlacementEnd:nth-of-type(2)": {
              display: "inline-block",
              width: "50%",
              paddingLeft: "28px",
            },
            ".MuiFormControlLabel-labelPlacementEnd:nth-of-type(3)": {
              display: "inline-block",
              width: "45%",
            },
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
              fontWeight: "600",
            },
          },
          ".response-popup": {
            maxHeight: "78vh",
            overflowY: "auto",
          },
          "& ul": {
            backgroundColor: "transparent !important",
          },
          //------------------------------------------------------------------------

          // Dark Theme Start

          "&.dark": {
            backgroundColor: "#1a202c",
            color: "#fff",
            "& .headerCus": {
              backgroundColor: "#1a202c",
              "& .MuiButtonBase-root": {
                backgroundColor: "rgb(255 255 255 / 35%)",
                color: "#d0d2d6",
              },
              "& .css-1t29gy6-MuiToolbar-root": {
                backgroundColor: "#1a202c",
              },
            },
            "& .sidemenuCus": {
              "& .MuiDrawer-paper": {
                backgroundColor: "#283046",
                boxShadow: "none",
                borderRight: "1px solid #3b4253",
              },
            },
            "& .innerHeader": {
              backgroundColor: "#283046",
              boxShadow: "none",
            },
            "& .DSListItem": {
              backgroundColor: "#1a202c",
              color: "#fff",
            },
            "& .DBListMain": {
              "& .DBList": {
                "& .MuiDivider-root": {
                  borderColor: "rgb(204 204 204 / 52%)",
                },
              },
            },

            "& .MuiPaper-root": {
              backgroundColor: "#283046",
              color: "#d0d2d6",
            },
            "& .DQhead , .overallDQ": {
              borderColor: "#3b4253",
              "& .MuiGrid-item": {
                "& .DQ ": {
                  borderColor: "#3b4253",
                },
              },
            },
            "& .compSec": {
              "& .compRight": {
                borderColor: "#3b4253",
              },
            },
            "& .DS": {
              "& .MuiGrid-item:nth-of-type(1)": {
                borderColor: "#3b4253",
              },
            },
            "& .bBox": {
              "& p": {
                borderColor: "#3b4253",
                color: "#d0d2d6",
              },
            },
            "& .rBox": {
              backgroundColor: "transparent",
              borderRight: "1px solid #3b4253",
              "& p": {
                borderColor: "#3b4253",
                color: "#d0d2d6",
              },
            },

            "& .MuiInputLabel-root , .MuiFormLabel-root": {
              color: "#b4b7bd",
            },
            "& .MuiInputBase-root": {
              backgroundColor: "#283046",
              color: "#b4b7bd",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#b4b7bd",
                color: "#b4b7bd",
              },
              "& .MuiIconButton-root": {
                color: "#b4b7bd",
              },
              "& svg": {
                fontSize: "20px",
                color: "#b4b7bd",
              },
            },

            "& .graphHead": {
              "& .MuiPaper-root": {
                "& p": {
                  "& b": {
                    backgroundColor: "transparent",
                    border: "1px solid",
                  },
                },
              },
            },
            "& .graphSec": {
              "& hr": {
                borderColor: "#3b4253",
              },
            },
            "& .wBox": {
              background: "transparent",
              "& a": {
                background: "#283046",
                "& p": {
                  color: "#d0d2d6",
                },
              },
            },
            "& .DBsec": {
              backgroundColor: "#343d55",
              "& .MuiTypography-root": {
                color: "#d0d2d6",
              },
            },
            "& .sidemenuCus": {
              "& .MuiDrawer-paper": {
                boxShadow: "none",
                borderRight: "1px solid #3b4253",
              },
              "& a": {
                color: "#d0d2d6",
              },
            },
            "& .MuiStepper-root": {
              "& .MuiStepLabel-label": {
                color: "#d0d2d6",
              },
            },
            "& .MuiButtonBase-root.Mui-disabled": {
              color: "rgb(255 255 255 / 26%)",
              backgroundColor: "rgb(255 255 255 / 12%)",
            },
            // Table header color
            "& .ag-theme-balham .ag-header , .ag-header-row, table.MuiTable-root tr th , .MuiAccordion-root.MuiPaper-root , .commonHead , .columnName.MuiTypography-root, .conValHead, .MuiListSubheader-root, .MuiFormControl-root .MuiChip-root, .imgUpMain .imgDisplay , .ignoreCordinates, .CDAOutputBox, .innerSubHead, .MuiCardHeader-root":
              {
                backgroundColor: "#343d55",
                color: "#d0d2d6",
              },
            "& .ag-theme-balham .ag-row , .ag-paging-panel , table.MuiTable-root tr td , .DS-Acc .MuiAccordionSummary-root ":
              {
                backgroundColor: "#283046",
                color: "#d0d2d6",
              },
            "& .createBtn .MuiIconButton-root , .imgUpMain , .filterBtns button:hover , .DS-Acc .MuiAccordionDetails-root":
              {
                backgroundColor: "transparent",
              },
            "& .DPGraphHead .MuiBox-root , .expRow, .ag-theme-balham .ag-checkbox-input-wrapper, textarea":
              {
                backgroundColor: "transparent",
              },
            "& .DPOuptlabel , .comSql": {
              backgroundColor: "#343d55",
            },
            "& .DPGraphFooter": {
              backgroundColor: "#1a202c",
            },
            "& .MuiAccordionDetails-root": {
              backgroundColor: "#283046",
            },
            // Dark blue color
            "& .selColVal , .selTabHead , .VTPreview .VT-Left .MuiBox-root, .VTPreview .VT-Right .MuiBox-root":
              {
                backgroundColor: "#1a202c",
              },
            // Font color
            ".MuiCheckbox-root , .MuiFormHelperText-root , .MuiRadio-root , .MuiTableContainer-root tr>td table>thead>tr>th.MuiTableCell-root , .MuiTableContainer-root .MuiChip-root , form.MuiPaper-root svg":
              {
                color: "#d0d2d6",
              },
            ".MuiRadio-root.Mui-checked , .MuiCheckbox-root.Mui-checked , .ag-theme-balham .ag-checkbox-input-wrapper.ag-checked::after":
              {
                color: "#1976d2",
              },
            "& .MuiListSubheader-root": {
              lineHeight: "30px",
            },
            ".css-catpii-MuiSwitch-root .MuiSwitch-thumb": {
              backgroundColor: "#096eb6",
            },
            ".selTabCol .MuiTypography-root": {
              "&:hover": {
                backgroundColor: "#343d55",
              },
            },
            // Border Color
            ".innerSubHead": {
              borderColor: "#3b4253",
            },
            ".previewDrawHead .MuiGrid-container .MuiGrid-root": {
              backgroundColor: "transparent",
            },
            ".comMain": {
              ".comBgcolor": {
                "&:nth-of-type(1)": {
                  backgroundColor: "#343d55",
                },
              },
            },

            "& .ValueClass , .MatchClass ": {
              backgroundColor: "transparent",
            },
            "& .selColVal h6": {
              color: "rgba(0, 0, 0, 0.87)",
            },
          },

          // Dark Theme End
          // -------------------------------------------------------------------------
        },

        //Body End
      },
    },
  },
});

export const useStyles = makeStyles({
  createconnection: {
    "& .MuiBackdrop-root": {
      backgroundColor: "transparent",
    },
  },
  TooltipTop: {
    "& .MuiTooltip-tooltip": {
      backgroundColor: "red",
    },
  },
  title: {
    marginBottom: "16px",
  },
  PaperCus: {
    boxShadow: "0 0px 12px rgb(0 0 0 / 8%)!important",
    position: "relative",
    borderRadius: "4px!important",
    "& .linkCus": {
      color: "#009df6",
      fontSize: "12px",
    },
  },

  headSec: {
    padding: 8,
    paddingBottom: 30,
    background: "linear-gradient(30deg, #92bbc3, #e3efe0, #84b4bd)",
    // background: blueGrey[100],
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    "& .MuiTypography-h6": {
      color: blueGrey[800],
    },
  },

  fileSec: {
    position: "relative",
    background: "#f1faff",
    borderRadius: 10,
    marginBottom: "20px",
    padding: 10,
    paddingBottom: 35,
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },

    "& .MuiTypography-h6": {
      color: "#009df6",
      fontSize: 16,
    },
    "& a": {
      background: "#009df6",
      textDecoration: "none",
    },
    "& .linkCus": {
      background: "none",
    },
  },
  TimeCir: {
    display: "flex",
    alignItems: "center",
  },

  upcomingTests: {
    "& .dx-visibility-change-handler": {
      "& .dxc.dxc-chart": {
        width: "100%",
      },
    },
    "& .wBox": {
      background: "#fff",
      marginTop: "8px",
      marginBottom: "8px",
      "& a": {
        background: "#f3f4f6",
        display: "block",
        padding: "4px 8px",
        marginBottom: "1px",
        borderRadius: "4px",
        "& h6": {
          lineHeight: "16px",
        },
      },

      "& p": {
        "&:last-child": {
          border: 0,
        },
      },
    },

    "& .rBox": {
      backgroundColor: "#fff",
      borderRadius: "4px",
      maxHeight: "117px",
      minHeight: "117px",
      overflow: "auto",
      "& p": {
        padding: "4px 8px",
        borderBottom: "1px solid #eee",
        "& a": {
          fontSize: "12px",
        },
      },
    },
    "& .graphHead": {
      display: "flex",
      "& .MuiPaper-root": {
        textAlign: "center",
        padding: "8px",
        marginRight: "8px",
      },
      "& .MuiPaper-root": {
        "& p": {
          marginRight: "8px",
          "& b": {
            padding: "4px 8px",
            background: "#f3f4f6",
            borderRadius: "4px",
          },
        },
      },
    },

    "& .colorInfo": {
      display: "flex",
      alignItems: "center",
      marginTop: "4px",
      "& .MuiBox-root": {
        display: "flex",
        margin: "auto",
      },
      "& p": {
        display: "flex",
        alignItems: "center",
        marginRight: "16px",
        fontWeight: "500",
        color: "#ffc107",
        "& svg": {
          fontSize: "14px",
          marginRight: "4px",
        },
        "&:nth-of-type(1)": {
          color: "#0074ef",
        },
        "&:last-child": {
          color: "#ff0c00",
        },
      },
    },
    "& .DQhead": {
      padding: "5px 16px",
      borderBottom: "1px solid #eee",
    },
    "& .overallDQ": {
      border: "1px solid #efeff7",
      borderRadius: "4px",

      "& .MuiGrid-item": {
        "& .DQ": {
          padding: "16px",
          minHeight: "79px",
          borderRight: "1px solid #eee",
        },
        "&:last-child": {
          "& .DQ": {
            border: 0,
          },
        },
      },
    },
    "& .graphSec": {
      marginBottom: 16,
      padding: "16px",
      "& .MuiDivider-root": {
        marginBottom: 16,
      },
      "& .card": {
        "& .dx-c-bs4-container": {
          paddingRight: 0,
          paddingLeft: 0,
        },
      },
      "& #bottom-container": {
        position: "absolute",
        top: "-30px",
        right: "0px",
        "& .list-group": {
          listStyle: "none",
          display: "flex",
          padding: "0",
          "& li": {
            paddingLeft: "8px",
          },
        },
      },
      "& .passed , .failed": {
        float: "right",
      },
    },
    "& .compSec": {
      padding: "0 16px",
      "& .compLeft , .compRight": {
        paddingTop: "16px",
      },
      "& .compRight": {
        borderLeft: "1px solid #eee",
        paddingLeft: "16px",
      },
    },
    "& .DS": {
      "& .MuiGrid-item": {
        "&:nth-of-type(1)": {
          borderRight: "1px solid #eee",
        },
      },
    },
  },
  progress: {
    display: "flex",
    border: "2px solid #efeff7",
    borderRadius: "10px",
    position: "relative",
    "& .MuiBox-root": {
      textAlign: "center",
      color: "#fff",
      cursor: "pointer",
      margin: "auto",
      "&:nth-of-type(1)": {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
      },
      "&:last-child": {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      },
    },
    "& .noData": {
      width: "100%",
      background: "#fff",
      borderRadius: "10px",
    },
  },
  STresult: {
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
    "& p.MuiTypography-root": {
      color: "#333",
    },
    "& p": {
      "& a": {
        fontWeight: "500",
      },
    },
    "&  a": {
      color: "#71787e",
      textDecoration: "none",
      "& h5": {
        color: "#006dba",
        fontSize: "12px",
        "& b": {
          fontSize: "14px",
          marginLeft: "5px",
        },
      },
    },
    "& .Rsec": {
      textAlign: "center",
      display: "inline-block",
      marginBottom: "16px",
      "& h5": {
        display: "flex",
        alignItems: "center",
      },
    },
    "& .bBox": {
      width: "100%",
      "& p": {
        display: "inline-block",
        width: "20%",
        border: "1px solid #eee",
        textAlign: "center",
        minHeight: "51px",
        float: "left",
        padding: "5px 0",
        "&:last-child": {
          lineHeight: "38px",
          "& a": {
            fontWeight: "normal",
          },
        },
        "& a": {
          display: "block",
        },
      },
    },
  },
});

export const tableStyles = makeStyles({
  tableCus: {
    "& .popoverTable": {
      "& td": {
        verticalAlign: "top",
      },
    },
    "& .accCus": {
      marginBottom: 16,
      "& .MuiAccordionSummary-root": {
        minHeight: "auto",
      },
    },
    "& .delSec": {
      "& .MuiTypography-root": {
        backgroundColor: "rgba(25, 118, 210, 0.12)",
        display: "inline-block",
        paddingLeft: 8,
      },
    },
  },
  dialogCus: {
    "& .MuiDialogActions-spacing": {
      padding: "0px 0px 15px",
      justifyContent: "center",
    },
  },
});

export const sideUseStyles = makeStyles({
  sidemenuUI: {
    "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
      {
        minWidth: "148px",
        backgroundColor: "#207398",
        "& .MuiMenu-list>li>a": {
          textDecoration: "none",
          color: "#fff",
        },
      },
  },
});
