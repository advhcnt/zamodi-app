import { Box, Container, createStyles, Grid } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardComponent from "../component/DashboardComponent";
import HearderLayout from "../layout/HearderLayout";
import SidebarLayout from "../layout/SidebarLayout";



const useStyles = createStyles((theme) => ({
  colonne1: {
    [theme.fn.smallerThan("md")]: {
      display: 'none'
    },
  }
}))

function DashboardPage(props) {

  const { classes, cx } = useStyles();
  return (
    <Box style={{ overflowX: 'hidden' }}>
      <Grid style={{ height: "100vh", overflowX: 'hidden', }} gutter={1} >


        {/* Première partie */}
        <Grid.Col md={2} className={classes.colonne1}>
          <SidebarLayout />
        </Grid.Col>


        <Grid.Col md={10} style={{ backgroundColor: '#f7f7f7' }}>
          <Box>
            <HearderLayout />
          </Box>
          <Box style={{ paddingInline: '20px' }}>
            <Outlet />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
