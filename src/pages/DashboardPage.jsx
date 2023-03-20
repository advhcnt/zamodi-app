import { Box, createStyles, Grid } from "@mantine/core";
import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import HearderLayout from "../layout/HearderLayout";
import SidebarLayout from "../layout/SidebarLayout";
import authService from "../services/authService";

const useStyles = createStyles((theme) => ({
  colonne1: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
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
    console.log(location.pathname.split("/"));
    let path = location.pathname;
    navigate(path);
  }, []);

  return currentUser ? (
    <Box style={{ overflowX: "hidden" }}>
      <Grid style={{ height: "100vh", overflowX: "hidden" }} gutter={1}>
        {/* Première partie */}
        <Grid.Col md={2} className={classes.colonne1}>
          <SidebarLayout />
        </Grid.Col>

        <Grid.Col md={10} style={{ backgroundColor: "#f7f7f7" }}>
          <Box>
            <HearderLayout />
          </Box>
          <Box style={{ paddingInline: "5px" }}>
            <Outlet />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default DashboardPage;
