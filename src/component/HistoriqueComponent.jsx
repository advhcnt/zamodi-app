import { Box, Button, Group, Image, Paper, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";
import { createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import operationsService from "../services/operations.service";
import blankTable from "./../assets/canvas-pana.png";
import { useNavigate } from "react-router-dom";

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
        console.log(data.data);
        let achat = dataR.filter((item) => item.OperationKind === "achat");
        let echange = dataR.filter((item) => item.OperationKind === "echange");

        setachatTable([...achat]);
        setechangeTable([...echange]);

        console.log("Echange ", echangeTable);
        console.log("Achat ", achatTable);
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
          Historique des {historiqueType==='echanges'?'échanges':historiqueType}
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
              {/* <Box>
                <Text size="sm" mt={7} fw={700} c="dark">
                  Action
                </Text>
              </Box> */}
            </Group>
          </Box>
          {echangeTable.length > 0 ? (
            <>
              {echangeTable.map((item) => (
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
                        src={
                          item.jai.split(" ")[0] === "Mtn"
                            ? mtnLogo
                            : item.jai.split(" ")[0] === "Moov"
                            ? moovLogo
                            : sbinLogo
                        }
                        style={{ height: "100%", width: "100%" }}
                        alt={`Logo ${item.jai}`}
                      />
                    </Box>
                    <Box>
                      <Image
                        src={
                          item.jeveux.split(" ")[0] === "Mtn"
                            ? mtnLogo
                            : item.jeveux.split(" ")[0] === "Moov"
                            ? moovLogo
                            : sbinLogo
                        }
                        style={{ height: "100%", width: "100%" }}
                        alt={`Logo ${item.jeveux}`}
                      />
                    </Box>
                    <Box>
                      <Text size="sm" mt={7} fw={400} c="dark">
                        {item.numero}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        size="sm"
                        mt={7}
                        fw={400}
                        c="dark"
                        className="ArrierePlan"
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      >
                        {item.montant} Fcfa
                      </Text>
                    </Box>
                    {/* <Box>
                  <Text size="xs" mt={1} c="dimmed">
                    <IconDotsVertical size={20} color={"red"} />
                  </Text>
                </Box> */}
                  </Group>
                </Paper>
              ))}
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Image
                  src={blankTable}
                  width={200}
                  alt="table vide"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                />
              </Box>
              <Text ta={"center"} c="green">
                Vous n'avez encore fait aucun échange.{" "}
              </Text>

              <Button className={"ArrierePlan"} onClick={()=>navigate('/echange')}>Faire un échange </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Box>
            <Group position={"apart"} px={5}>
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
                  Type d'opération
                </Text>
              </Box>
              {/* <Box>
                <Text size="sm" mt={7} fw={700} c="dark">
                  Action
                </Text>
              </Box> */}
            </Group>
          </Box>
          {achatTable.length > 0 ? (
            <>
              {achatTable.map((item) => (
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
                        src={
                          item.jai.split(" ")[0] === "Mtn"
                            ? mtnLogo
                            : item.jai.split(" ")[0] === "Moov"
                            ? moovLogo
                            : sbinLogo
                        }
                        style={{ height: "100%", width: "100%" }}
                        alt={`Logo ${item.jai}`}
                      />
                    </Box>
                    <Box>
                      <Image
                        src={
                          item.jeveux.split(" ")[0] === "Mtn"
                            ? mtnLogo
                            : item.jeveux.split(" ")[0] === "Moov"
                            ? moovLogo
                            : sbinLogo
                        }
                        style={{ height: "100%", width: "100%" }}
                        alt={`Logo ${item.jeveux}`}
                      />
                    </Box>
                    <Box>
                      <Text size="sm" mt={7} fw={400} c="dark">
                        {item.numero}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        size="sm"
                        mt={7}
                        fw={400}
                        c="dark"
                        className="ArrierePlan"
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      >
                        Achat {item.Description}
                      </Text>
                    </Box>
                    {/* <Box>
                  <Text size="xs" mt={1} c="dimmed">
                    <IconDotsVertical size={20} color={"red"} />
                  </Text>
                </Box> */}
                  </Group>
                </Paper>
              ))}
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Image
                  src={blankTable}
                  width={200}
                  alt="table vide"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                />
              </Box>
              <Text ta={"center"} c="green">
                Vous n'avez encore fait aucun achat.{" "}
              </Text>

              <Button className={"ArrierePlan"} onClick={()=>navigate('/recharge')}>Faire un recharge </Button>

            </>
          )}
        </>
      )}
    </Box>
  );
}

export default HistoriqueComponent;
