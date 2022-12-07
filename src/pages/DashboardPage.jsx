import { Box, Container, createStyles, Grid } from "@mantine/core";
import React from "react";
import HearderLayout from "../layout/HearderLayout";
import SidebarLayout from "../layout/SidebarLayout";



const useStyles = createStyles((theme) => ({
    colonne1:{
      [theme.fn.smallerThan("md")]: {
        display:'none'
      },
    }
  }))

function DashboardPage(props) {

  const { classes, cx } = useStyles();
  return (
    <div>
      <Grid style={{ height: "100vh" }} gutter={1} >


        {/* Première partie */}
        <Grid.Col md={2} className={classes.colonne1}>
          <SidebarLayout />
        </Grid.Col>
       
       
        <Grid.Col md={10}>
          <Box>
            <HearderLayout />
          </Box>
          <Container>Hello la team</Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default DashboardPage;
