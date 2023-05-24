import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SnackbarContext } from "../../App";
import ApiService from "../../services/app.service";
import { CustomAgGrid } from "../AgGrid";
import AddNewMail from "./AddNewMail";
import { headCells } from "./Model";
import SmtpDrawer from "./SmtpDrawer";

export default function UsersList({
  dropDown,
  users,
  setUsers,
  initialUserState,
  smptData,
}) {
  const gridRef = useRef();
  const { setSnack } = useContext(SnackbarContext);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersData, setUsersData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [SelectedValue, setSelectedValue] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [params] = useState({
    Name: "",
    Email: "",
  });

  useEffect(() => {
    (async () => {
      let pagination = { rowsPerPage: rowsPerPage };
      let data = { ...pagination, ...params };
      try {
        let response = await ApiService.getUsersList(data);
        setUsersData(response?.data?.data);
        setRowsPerPage(response?.data?.rowsPerPage);
      } catch (error) {
        setSnack({ message: error?.message, open: true, colour: "error" });
      }
    })();
  }, [rowsPerPage, params]);

  const getUserLink = async () => {
    try {
      let response = await ApiService.getUsersList({
        rowsPerPage: rowsPerPage,
      });
      setUsersData(response?.data?.data);
      setRowsPerPage(response?.data?.rowsPerPage);
    } catch (error) {
      setSnack({ message: error.message, open: true, colour: "error" });
    }
  };

  const deleteSelected = async () => {
    try {
      await ApiService.deleteUser({ ids: selected });
      setOpenDialog(false);
      getUserLink();
      setSelected([]);
      setSnack({ message: "Deleted", open: true, colour: "success" });
    } catch (error) {
      setSnack({ message: error?.message, open: true, colour: "error" });
    }
  };

  const action = {
    headerName: "Actions",
    sortable: false,
    cellRenderer: ActionsCell,
    lockPosition: "right",
    cellClass: "locked-col",
    suppressColumnsToolPanel: true,
    filter: false,
  };

  useMemo(() => {
    headCells[headCells.length - 1] = action;
  }, []);

  function ActionsCell(props) {
    const row = props.data;
    return (
      <AddNewMail
        dropDown={dropDown}
        userData={row}
        SelectedValue={row.TestValidationIds}
        setSelectedValue={setSelectedValue}
        fetchData={getUserLink}
        edit={true}
      />
    );
  }

  return (
    <Grid item md={12}>
      <Box className="createBtn" display="flex">
        <SmtpDrawer smptData={smptData} />
        <AddNewMail
          dropDown={dropDown}
          users={users}
          setUsers={setUsers}
          SelectedValue={SelectedValue}
          setSelectedValue={setSelectedValue}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          fetchData={getUserLink}
          initialUserState={initialUserState}
          edit={false}
          selected={selected}
          deleteSelected={deleteSelected}
        />
      </Box>
      <Box>
        <CustomAgGrid
          gridRef={gridRef}
          headCells={headCells}
          setSelected={setSelected}
          rows={usersData}
        />
      </Box>
    </Grid>
  );
}
