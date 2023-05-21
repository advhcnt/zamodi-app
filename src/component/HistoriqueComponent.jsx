import { Box, Button, Group, Image, Paper, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import operationsService from "../services/operations.service";
import blankTable from "./../assets/blankTable.png";
import { useNavigate } from "react-router-dom";
import RechargeTableau from "./tableauHistorique/RechargeTableau";
import AchatTableau from "./tableauHistorique/AchatTableau";

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
  paddingBox: {
    paddinInline: 150,
    [theme.fn.largerThan("md")]: {
      marginInline: 0,
    },
  },
}));
function HistoriqueComponent(props) {
  const { classes, theme } = useStyles();
  const [echangeTable, setechangeTable] = useState([]);
  const [achatTable, setachatTable] = useState([]);
  const [historiqueType, toggle] = useToggle(["echanges", "recharges"]);

  useEffect(() => {
    operationsService.getUserOperation().then(
      (data) => {
        const dataR = data.data;
        let achat = dataR.filter((item) => item.OperationKind === "achat");
        let echange = dataR.filter((item) => item.OperationKind === "echange");

        setachatTable([...achat]);
        setechangeTable([...echange]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const navigate = useNavigate();

  return (
    <Box className={classes.paddingBox}>
      <Group position={"apart"}>
        <Text size={"xl"} fw={400} c={"black"}>
          Historique des{" "}
          {historiqueType === "echanges" ? "échanges" : historiqueType}
        </Text>
        <Paper withBorder sx={{ dsplay: "flex" }}>
          <Box sx={{ display: "flex" }}>
            <Button
              mx={10}
              my={5}
              className={
                historiqueType === "echanges"
                  ? "ArrierePlan"
                  : "ArrierePlanNeutre"
              }
              // "ArrierePlan"
              style={{
                padding: "10px",
                borderRadius: "8px",
                color: "white",
                fontSize: 11,
              }}
              onClick={toggle}
            >
              Historiques des échanges
            </Button>
            <Button
              mx={3}
              my={5}
              className={
                historiqueType === "recharges"
                  ? "ArrierePlan"
                  : "ArrierePlanNeutre"
              }
              style={{
                padding: "10px",
                borderRadius: "8px",
                color: "white",
                fontSize: 11,
              }}
              onClick={toggle}
            >
              Historiques des recharges
            </Button>
          </Box>
        </Paper>
      </Group>

      {historiqueType === "echanges" ? (
        <>
          
          {echangeTable.length > 0 ? (
            <>
             <RechargeTableau data={echangeTable} />
            </>
          ) : (
            <>
              <Box
               mt={80}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >

                <Image
                  src={blankTable}
                  width={150}
                  alt="table vide"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                />
              </Box>
              <Text ta={"center"} c="#000"  mt={20}>
                Vous n'avez encore fait aucun échange.{" "}
              </Text>

              
              <Group position="center" mt={40}>
                <Button
                  className={"ArrierePlan"}
                  onClick={() => navigate("/echange")}
                >
                  Faire un recharge{" "}
                </Button>
              </Group>
            </>
          )}
        </>
      ) : (
        <>
         
          {achatTable.length > 0 ? (
            <>
               <AchatTableau data={achatTable} />
            </>
          ) : (
            <>
              <Box
              mt={80}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Image
                  src={blankTable}
                  width={150}
                  alt="table vide"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                />
              </Box>
              <Text ta={"center"} c="#000"  mt={20}>
                Vous n'avez encore fait aucun achat.{" "}
              </Text>

              <Group position="center"   mt={40}>
                <Button
                  className={"ArrierePlan"}
                  onClick={() => navigate("/recharge")}
                >
                  Faire un recharge{" "}
                </Button>
              </Group>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default HistoriqueComponent;
