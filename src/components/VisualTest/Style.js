const style = {
  display: "flex",
  alignItems: "center",
  width: "auto",
  textAlign: "center",
  height: "100vh",
  maxHeight: "100vh",
  overflow: "auto",
  "& .pop": {
    margin: "auto",
    "& img": {
      backgroundColor: "#fff",
    },
  },
  "& .popBtns": {
    position: "absolute",
    top: "4px",
    right: "0",
    zIndex: "9",
    "& button": {
      marginRight: "4px",
    },
    "& button.MuiIconButton-root": {
      border: "1px solid #ed6c02",
      backgroundColor: "#ed6c02",
      color: "#fff",
      borderRadius: "4px",
      marginRight: "8px",
    },
  },
};

export default style;
