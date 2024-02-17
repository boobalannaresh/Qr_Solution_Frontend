import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {LogOut} from "./LogOut"
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

export default function Topbar({ mode, setMode }) {

  const ROLE_ID = {
    Admin: "0",
    Student: "1"
}
const roleId = localStorage.getItem("roleId")

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Profile-Picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
          </IconButton>

          <Button color="inherit" onClick={() => navigate("/portal/home")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => navigate("/portal/course")}>
            Courses
          </Button>
          
          {
            roleId === ROLE_ID.Admin ? 
          <Button color="inherit" onClick={() => navigate("/portal/addcourse")}>
            Add-Course
          </Button> : null 
          
          }

          <Button
            style={{ marginLeft: "60%" }}
            startIcon={mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "light" ? "dark" : "light"} Mode
          </Button>

          <Button
            style={{ marginLeft: "auto" }}
            color="inherit"
            onClick={() => LogOut() }
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
