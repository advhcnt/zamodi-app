import {
  Card,
  Container,
  Text,
  TextInput,
  Box,
  Grid,
  Select,
  Button,
  Notification,
  Group,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconArrowsLeftRight, IconChevronDown, IconX } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import ResumeComponent from "./ResumeComponent";
import operation from "./../services/operations.service";
import authService from "../services/authService";
import { verifyAmount, verifyPhoneNumber } from "../utils/fonctions";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

function EchangeComponent(props) {
  const { classes, cx } = useStyles();
  const currentUser = authService.getCurrentUser();
  const [operations, setOperation] = useState({});
  const [montant, setMontant] = useState("");
  const [jai, setjai] = useState("");
  const [jeveux, setjeveux] = useState("");
  const [numero, setnumero] = useState("");
  const [numeroConfirm, setnumeroConfirm] = useState("");
  const [valide, setvalide] = useState(false);
  const [error, seterror] = useState({
    statut: false,
    message: "",
  });
  const [Reset, setreset] = useState(false);

  useEffect(() => {
    setOperation(operation.getUserOperation(currentUser.message._id));
  }, []);

  useEffect(() => {
    if (Reset) {
      setMontant("");
      setnumero("");
      setnumeroConfirm("");
      setjeveux("");
      setjai("");
    }
  }, [Reset]);

  useEffect(() => {
    if (jeveux === "Celtiis money" || jai === "Celtiis money") {
      seterror({
        statut: true,
        message:
          "Les opérations avec Celltiis ne sont pas encore disponible pour le moment",
      });
    } else {
      seterror(false, "");
    }
  }, [jeveux, jai]);

  const handleEchange = () => {
    if (montant && jai && jeveux && numero && numeroConfirm) {
      if (numero === numeroConfirm && verifyPhoneNumber(numero)) {
        if (jeveux !== jai) {
          if (jeveux !== "Celtiis money" && jai !== "Celtiis money") {
            if (verifyAmount(montant)) {
              seterror(false, "");
              setvalide(true);
            } else {
              seterror({
                statut: true,
                message: "Veuillez entrer un montant correct",
              });
            }
          } else {
            seterror({
              statut: true,
              message:
                "Les opérations avec Celltiis ne sont pas encore disponible pour le moment",
            });
          }
        } else {
          seterror({
            statut: true,
            message: `Vous ne pouvez pas avoir ${jai
              .split(" ")[0]
              .toUpperCase()} et recevoir ${jeveux
              .split(" ")[0]
              .toUpperCase()}`,
          });
        }
      } else {
        seterror({
          statut: true,
          message: "Veuillez entrer un numéro correct",
        });
      }
    } else {
      seterror({ statut: true, message: "Veuillez remplir les champs" });
    }
  };

  return (
    <Container size={"sm"}>
      {!valide && (
        <Grid style={{ justifyContent: "space-around" }}>
          <Grid.Col md={10}>
            {error.statut && (
              <Notification
                my={30}
                icon={<IconX size={18} />}
                color="red"
                onClick={() => seterror(false, "")}
              >
                {error.message}
              </Notification>
            )}
            <Card shadow="lg" p="lg" radius="md" withBorder>
              <Card.Section
                withBorder
                inheritPadding
                py="xs"
                className="ArrierePlan"
              >
                <Box>
                  <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                    Faire un échange
                  </Text>
                </Box>
              </Card.Section>

              <Box mb={50}>
                <Grid>
                  <Grid.Col md={4} mt={30}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Montant à recharger
                    </Text>
                    <TextInput
                      placeholder="Montant à recharger"
                      withAsterisk
                      className={"ombre"}
                      width={"100%"}
                      value={montant}
                      onChange={(event) => setMontant(event.target.value)}
                      type={"number"}
                    />
                  </Grid.Col>
                </Grid>

                <Grid mt={15}>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      J'ai
                    </Text>
                    <Select
                      // fullWidth={true}
                      placeholder="J'ai"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjai}
                      defaultValue={jai}
                    />
                  </Grid.Col>
                  <Grid.Col md={2} className={`${classes.hiddenMobile}`}>
                    <Group
                      position="center"
                      align={"center"}
                      sx={{ marginBlock: 20 }}
                    >
                      <IconArrowsLeftRight size={20} color="green" />
                    </Group>
                  </Grid.Col>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Je veux
                    </Text>
                    <Select
                      placeholder="Je veux"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjeveux}
                      defaultValue={jeveux}
                    />
                  </Grid.Col>
                </Grid>

                <Grid mt={15} mb={30}>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Numéro de réception :
                    </Text>
                    <TextInput
                      placeholder="Numéro de réception"
                      withAsterisk
                      className={"ombre"}
                      onChange={(event) => setnumero(event.target.value)}
                      value={numero}
                      type={"tel"}
                    />
                  </Grid.Col>
                  <Grid.Col
                    md={2}
                    className={`${classes.hiddenMobile}`}
                  ></Grid.Col>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Confirmer le numéro :{/* de réception : */}
                    </Text>
                    <TextInput
                      placeholder=" Confirmer le numéro de réception"
                      withAsterisk
                      className={"ombre"}
                      onChange={(event) => setnumeroConfirm(event.target.value)}
                      value={numeroConfirm}
                      type={"tel"}
                    />
                  </Grid.Col>
                </Grid>

                <Group position="center">
                  <Button
                    mr={"lg"}
                    className={"ArrierePlan"}
                    onClick={handleEchange}
                  >
                    <span style={{ marginInline: 5 }}>Valider</span>{" "}
                    <IconArrowRight size={20} mx={3} />{" "}
                  </Button>
                </Group>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>
      )}

      {valide && (
        <ResumeComponent
          setreset={setreset}
          setValide={setvalide}
          numero={numero}
          jai={jai}
          jeveux={jeveux}
          montant={montant}
        />
      )}
    </Container>
  );
}

export default EchangeComponent;
