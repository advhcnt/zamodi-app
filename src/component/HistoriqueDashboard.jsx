import { Box, Card, Image, Paper, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from "@mantine/core";
import operationsService from "../services/operations.service";

const useStyles = createStyles((theme) => ({
  secondCard: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2vw",
    marginBlock: "2vh",
    gap: 1,
    borderRadius: theme.radius.md,
    height: 80,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",
    boxShadow: "unset",
    marginInline: "3px",
  },
}));
function HistoriqueDashboard(props) {
  const { classes, theme } = useStyles();
  const [historique, sethistorique] = useState([]);

  useEffect(() => {
    operationsService.getUserOperation().then(
      (data) => {
        const dataR = data.data;
        sethistorique([...dataR]);
        console.log("Historique ", historique);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Text size={"md"} fw={"bolder"}>
        Historique
      </Text>

      {historique.map((item) => (
        <Paper
          withBorder
          radius="md"
          p="xs"
          className={classes.secondCard}
          key={item}
        >
          <Box sx={{display:'flex',alignItems:'center'}}>
            <Box>
              <Image
                src={
                  item.jai.split(" ")[0] === "Mtn"
                    ? mtnLogo
                    : item.jai.split(" ")[0] === "Moov"
                    ? moovLogo
                    : sbinLogo
                }
                style={{ height: "80%", width: "80%" }}
                alt={item.jai.split(" ")[0]}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Box>
                <Text size="xs" fw={"bold"} c="dark">
                  {item.jai.split(" ")[0]}{" "}
                  <span className={"EcritVert"} style={{ fontSize: 20 }}>
                    {"=>"}
                  </span>{" "}
                  {item.jeveux.split(" ")[0]}
                </Text>
                <Text size="10px" c={"dimmed"}>
                  {item.updatedAt.split("T")[0]} à{" "}
                  {item.updatedAt.split("T")[1].split(".")[0]}
                </Text>
              </Box>
              <Box>
                <Text size="xs" mt={7} fw={"bold"} c="dark">
                  {item.montant} cfa
                </Text>
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}

      {historique.length === 0 && (
        <Paper withBorder radius="md" p="xs" className={classes.secondCard}>
          <Box>
            <Text fz={"xl"} fw={500} ta={"center"}>
              Pas d'historique{" "}
            </Text>
          </Box>
        </Paper>
      )}
    </Card>
  );
}

export default HistoriqueDashboard;
