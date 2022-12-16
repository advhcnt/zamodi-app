import { Box, Card, Group, Image, Paper, Text } from "@mantine/core";
import React from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from "@mantine/core";
import { IconDots, IconDotsVertical } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  secondCard: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2vw",
    marginBlock: "2vh",
    gap: 15,
    borderRadius: theme.radius.md,
    height: 80,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",
    boxShadow: "unset",
  },
}));
function HistoriqueComponent(props) {
  const { classes, theme } = useStyles();
  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <Text size={"md"} fw={400}>
        Historique
      </Text>
      <Box>
        <Group position={"apart"} px={10}>
          <Box>
            <Text size="sm" mt={7} fw={700} c="dark">
              J'ai
            </Text>
          </Box>

          <Box>
            <Text size="sm" mt={7} fw={700} c="dark">
              Je veux
            </Text>
          </Box>
          <Box>
            <Text size="sm" mt={7} fw={700} c="dark">
              Numéro
            </Text>
          </Box>
          <Box>
            <Text size="sm" mt={7} fw={700} c="dark">
              Montant
            </Text>
          </Box>
          <Box>
            <Text size="sm" mt={7} fw={700} c="dark">
              Action
            </Text>
          </Box>
        </Group>
      </Box>
      {[...Array(5).keys()].map((item) => (
        <Paper
          withBorder
          radius="md"
          p="xs"
          className={classes.secondCard}
          key={item}
        >
          <Group
            position={"apart"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Image
                src={mtnLogo}
                style={{ height: "100%", width: "100%" }}
                alt={"Logo mtn"}
              />
            </Box>
            <Box>
              <Image
                src={sbinLogo}
                style={{ height: "100%", width: "100%" }}
                alt={"Logo mtn"}
              />
            </Box>
            <Box>
              <Text size="sm" mt={7} fw={700} c="dark">
                61000001
              </Text>
            </Box>
            <Box>
              <Text
                size="sm"
                mt={7}
                fw={700}
                c="dark"
                className="ArrierePlan"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  color:'white'
                }}
              >
                10.000 Fcfa
              </Text>
            </Box>
            <Box>
              <Text size="xs" mt={1} c="dimmed">
                <IconDotsVertical size={20} color={'red'}/>
              </Text>
            </Box>
          </Group>
        </Paper>
      ))}
    </Box>
  );
}

export default HistoriqueComponent;
