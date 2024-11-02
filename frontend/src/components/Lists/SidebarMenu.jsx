/* eslint-disable react/prop-types */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function SidebarMenu({ to, Icon, onClick, text }) {
  const { pathname } = useLocation();

  return (
    <ListItem>
      <ListItemButton
        sx={{ borderRadius: 3 }}
        onClick={onClick}
        selected={to === pathname}
        dense
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
