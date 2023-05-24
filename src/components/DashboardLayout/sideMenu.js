import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import CompareIcon from "@mui/icons-material/Compare";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DataThresholdingOutlinedIcon from "@mui/icons-material/DataThresholdingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";

export default function SideMenu() {
  return (
    <div>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <ListItem button key="Data Sources">
          <Tooltip title="Data Sources" placement="top-end" arrow>
            <ListItemIcon>
              <AddLinkOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Data Sources" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/test-hub" style={{ textDecoration: "none" }}>
        <ListItem button key="Data Quality Rules">
          <Tooltip title="Data Quality Rules" placement="top-end" arrow>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Data Quality Rules" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/data/profiling" style={{ textDecoration: "none" }}>
        <ListItem button key="Data Profiling">
          <Tooltip title="Data Profiling" placement="top-end" arrow>
            <ListItemIcon>
              <DataThresholdingOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Data Profiling" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/scheduled/list" style={{ textDecoration: "none" }}>
        <ListItem button key="Scheduled Tests">
          <Tooltip title="Scheduled Tests" placement="top-end" arrow>
            <ListItemIcon>
              <ScheduleOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Scheduled Tests" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/pipeline/list" style={{ textDecoration: "none" }}>
        <ListItem button key="CI/CD Pipelines">
          <Tooltip title="CI/CD Pipelines" placement="top-end" arrow>
            <ListItemIcon>
              <AllInclusiveOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="CI/CD Pipelines" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/Settings" style={{ textDecoration: "none" }}>
        <ListItem button key="Settings">
          <Tooltip title="Settings" placement="top-end" arrow>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Settings" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/image" style={{ textDecoration: "none" }}>
        <ListItem button key="ImageComparision">
          <Tooltip title="Image Comparision" placement="top-end" arrow>
            <ListItemIcon>
              <AutoAwesomeMotionOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Image Comparision" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/chart" style={{ textDecoration: "none" }}>
        <ListItem button key="Chart Validation">
          <Tooltip title="Pie Chart Validation" placement="top-end" arrow>
            <ListItemIcon>
              <PieChartOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Pie Chart Validation" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/visual/test" style={{ textDecoration: "none" }}>
        <ListItem button key="Visual Test">
          <Tooltip title="Visual Test" placement="top-end" arrow>
            <ListItemIcon>
              <CompareIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Visual Test" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/masterdata" style={{ textDecoration: "none" }}>
        <ListItem button key="Masterdata">
          <Tooltip title="Master Data" placement="top-end" arrow>
            <ListItemIcon>
              <DataObjectIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Master Data" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/api-automation" style={{ textDecoration: "none" }}>
        <ListItem button key="API Automation">
          <Tooltip title="API Automation" placement="top-end" arrow>
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="API Automation" color="white" />
        </ListItem>
      </NavLink>
      <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItem button key="Dashboard">
          <Tooltip title="Dashboard" placement="top-end" arrow>
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Dashboard" color="white" />
        </ListItem>
      </NavLink>
    </div>
  );
}
