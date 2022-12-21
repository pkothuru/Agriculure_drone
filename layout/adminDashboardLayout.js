import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "../components/Navbar";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { signOut } from "next-auth/react";
import Link from "next/link";
const drawerWidth = 300;
const Items = [
  {
    id: 1,
    label: "Drone Catalog",
    url: "/",
  },
  {
    id: 2,
    label: "Drone Cloud Tracking",
    url: "/admin/cloudTracking",
  },
  {
    id: 3,
    label: "Add Drone",
    url: "/admin/addDrone",
  },
  {
    id: 4,
    label: "Service",
    url: "/admin/startService",
  },
];
export default function ClippedDrawer({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Navbar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box className="h-full shadow-sm" sx={{ overflow: "auto" }}>
          <div className="mt-10 px-3">
            <p className="text-2xl font-semibold text-[color:var(--primary)]">
              Dashboard
            </p>
          </div>
          <List>
            {Items.map((item, index) => (
              <Link key={item.id} href={item.url}>
                <ListItem disablePadding className="py-2">
                  <ListItemButton>
                    <ListItemIcon>
                      {item.label === "Drone Catalog" ? (
                        <SettingsIcon />
                      ) : item.label === "Drone Cloud Tracking" ? (
                        <WidgetsOutlinedIcon />
                      ) : item.label === "My bookings" ? (
                        <LibraryBooksOutlinedIcon />
                      ) : item.label === "Billing" ? (
                        <MailIcon />
                      ) : (
                        ""
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => signOut()}>
                <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        className="min-h-screen bg-slate-50"
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <div className="">{children}</div>
      </Box>
    </Box>
  );
}
