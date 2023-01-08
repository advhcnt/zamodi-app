import { Box, createStyles, Grid } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import DetailsComponent from "../../component/Admin/DetailsComponent";
import HearderAdminLayout from "../../layout/HeaderAdmin";
import SidebarAdminLayout from "../../layout/SidebarAdmin";

const useStyles = createStyles((theme) => ({
  colonne1: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

function AdminDashboard(props) {
  const { classes } = useStyles();
  return (
    <Box>
      <Grid style={{ height: "100vh", overflowX: "hidden" }} gutter={1}>
        {/* Première partie */}
        <Grid.Col md={2} className={classes.colonne1}>
          <SidebarAdminLayout />
        </Grid.Col>

        <Grid.Col
          md={10}
          style={{ backgroundColor: "#f7f7f7", right: 0, left: 0 }}
        >
          <Box>
            <HearderAdminLayout />
          </Box>
          <Box my={25}>
            <DetailsComponent />
          </Box>
          <Box style={{ paddingInline: "20px" }}>
            <Outlet />
            {/* <HomeAdmin /> */}
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
