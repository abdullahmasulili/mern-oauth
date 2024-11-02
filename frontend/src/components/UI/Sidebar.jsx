/* eslint-disable no-unused-vars */
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../hooks";
import { handleLogout } from "../../util/FirebaseAuth";
import { handleUserLogout } from "../../util/Http";

import SidebarMenu from "../Lists/SidebarMenu";
import { useState } from "react";
import { useCookies } from "react-cookie";
import LoadingModal from "./LoadingModal";

export default function Sidebar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "uid"]);
  const { currentUser, setAccessToken, setCurrentUser } = useUser();
  const displayName = [currentUser.first_name, currentUser.last_name].join(" ");
  const [loading, setLoading] = useState(false);

  function handleNavigate() {
    console.log("navigate menu");
  }

  async function onLogoutClick() {
    setLoading(true);

    try {
      await handleUserLogout(currentUser.id);
      removeCookie("accessToken");
      removeCookie("uid");
      setAccessToken(null);
      setCurrentUser({});
      handleLogout();
      setLoading(false);
      navigate("/auth?mode=login");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <>
      <Drawer open>
        <List>
          <Toolbar>
            <Typography>{displayName}</Typography>
          </Toolbar>
          <Divider />
          <SidebarMenu
            text="Dashboard"
            Icon={DashboardIcon}
            to="/dashboard"
            onClick={handleNavigate}
          />
          <SidebarMenu
            text="Settings"
            Icon={SettingsIcon}
            to="/settings"
            onClick={handleNavigate}
          />
          <Divider />
          <ListItem>
            <ListItemButton
              dense
              sx={{ borderRadius: 3 }}
              onClick={onLogoutClick}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <LoadingModal isOpen={loading} title="Logging out.." />
    </>
  );
}
