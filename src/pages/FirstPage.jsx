import { Box, Button, Grid, Group, Text } from "@mantine/core";
import React from "react";

function FirstPage(props) {
  return (
    <div style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Grid style={{ height: "100.5vh" }}>
        {/* Première partie */}
        <Grid.Col
          md={6}
          order={2}
          orderMd={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "80%" }}>
            <Text fz="xl" ta={"center"}>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            borderRadius: " 115px 0px 0px 0px ",
            border: "1px solid black",
          }}
        >
          
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            deserunt dignissimos voluptates mollitia suscipit totam nemo
            consequuntur asperiores, ipsa quos placeat aliquam eos iste harum
            esse amet blanditiis! Expedita cupiditate, ab dolorem nobis
            architecto accusamus consequatur placeat commodi natus deserunt?
          
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default FirstPage;
