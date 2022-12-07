import { Box, Button, Grid, Group, Image, Text } from "@mantine/core";
import React from "react";
import authLogo from "./../assets/authLogo.svg";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";

function FirstPage(props) {
  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Grid style={{ height: "100vh" }}>
        {/* Première partie */}
        <Grid.Col
          md={6}
          order={2}
          orderMd={1}
          className={"FirstPathAuth"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "80%" }}>
            <Text fz="xl" ta={"center"} fw={700}>
              WELCOME
            </Text>
            <Text fz={"xs"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              reiciendis eaque maxime quisquam fuga cum corrupti ullam. Maxime,
              porro veniam? Vel, amet aperiam rerum magni fugit ex at modi
              dolore.
            </Text>
            <Group grow mb="md" mt="md" position="center">
              <Button
                style={{
                  borderRadius: "32px",
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Connexion
              </Button>
              <Button
                style={{
                  borderRadius: "32px",
                  color: "white",
                  backgroundColor: "green",
                }}
              >
                Inscription
              </Button>
            </Group>
          </Box>
        </Grid.Col>

        {/* Seconde partie */}
        <Grid.Col
          md={6}
          order={1}
          orderMd={2}
          style={{
            borderRadius: " 115px 0px 0px 0px ",
            border: "1px solid black",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              justifyItems: "center",
              textAlign: "center",
              // justifyContent: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            <Image
              radius="md"
              src={ZamodiLogo}
              alt="Random unsplash image"
              height={"100%"}
              width={"100%"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              marginTop:'18vh'
            }}
          >
            <Image radius="md" src={authLogo} alt="Random unsplash image" />
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default FirstPage;
