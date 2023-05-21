import { Box, createStyles, Grid } from "@mantine/core";
import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import HearderLayout from "../layout/HearderLayout";
import SidebarLayout from "../layout/SidebarLayout";
import authService from "../services/authService";

const useStyles = createStyles((theme) => ({
  colonne1: {
    position:'fixed',
    width:"20vw",
    height:'100vh',
    overflow:'auto',
    paddingBottom:'3vh',
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  colonne2:{
    position:'absolute',
    left:"20vw",
    display:'flex',
    width:'80vw',
    flexDirection:'column',
    height:'100vh',
    overflow:'scroll',
    [theme.fn.smallerThan("md")]: {
      left:0,
      width:'100vw',
    },
  },
  conteneur:{
    display:'flex',
    width:'100vw',
  }
}));

function DashboardPage(props) {
  const currentUser = authService.getCurrentUser();
  const { classes, cx } = useStyles();
  const location = useLocation();
  const path = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [path]);

  useEffect(() => {
    let path = location.pathname;
    navigate(path);
  }, []);

  return currentUser ? (
    <Box style={{ overflowX: "hidden" }}>
      <Box className={classes.conteneur}>
        {/* Première partie */}
        <Box md={2} className={classes.colonne1}>
          <SidebarLayout />
        </Box>

        <Box md={10} style={{ backgroundColor: "#f7f7f7" }} className={classes.colonne2}>
          <Box>
            <HearderLayout />
          </Box>
          <Box style={{ paddingInline: "5px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default DashboardPage;
