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
  createStyles,
  Group,
} from "@mantine/core";
import React, { useState } from "react";
import { IconArrowsLeftRight, IconChevronDown, IconX } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import ResumeRechargeComponent from "./ResumeRechargeComponent";
import authService from "../services/authService";
import { verifyAmount, verifyPhoneNumber } from "../utils/fonctions";
import { useEffect } from "react";

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

function RechargeComponent(props) {
  const { classes, cx } = useStyles();
  const currentUser = authService.getCurrentUser();
  const [operation, setOperation] = useState({});
  const [montant, setMontant] = useState("");
  const [jai, setjai] = useState("");
  const [jeveux, setjeveux] = useState("");
  const [numero, setnumero] = useState("");
  const [numeroConfirm, setnumeroConfirm] = useState("");
  const [error, seterror] = useState({
    statut: false,
    message: "",
  });

  const [valideRecharge, setValideRecharge] = useState(false);
  const [Reset, setreset] = useState(false);

  const handleRecharge = () => {
    if (montant && jai && jeveux && numero && numeroConfirm && operation) {
      if (numero === numeroConfirm && verifyPhoneNumber(numero)) {
        if (jeveux !== jai) {
          if (verifyAmount(montant)) {
            seterror(false, "");
            setValideRecharge(true);
          } else {
            seterror({
              statut: true,
              message: "Veuillez entrer un montant correct",
            });
          }
        } else {
          seterror({
            statut: true,
            message: `Tu ne peux pas avoir ${jai
              .split(" ")[0]
              .toUpperCase()} et recevoir ${jeveux
              .split(" ")[0]
              .toUpperCase()}`,
          });
        }
      } else {
        seterror({ statut: true, message: "Veuillez entrer un numéro correct" });
      }
    } else {
      seterror({ statut: true, message: "Veuillez remplir les champs" });
    }
  };

  useEffect(() => {
    if (Reset) {
      setMontant("");
      setnumeroConfirm("");
      setnumero("");
    }
  }, [Reset]);

  return (
    <Container size={"sm"}>
      {!valideRecharge && (
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
                    Recharge
                  </Text>
                </Box>
              </Card.Section>

              <Box mb={50} pt={30}>
                <Grid>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Type d'opération
                    </Text>
                    <Select
                      width={"100%"}
                      placeholder="Type d'opération"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={[
                        "Forfait internet",
                        "Forfait appel simple",
                        "Forfait appel composé",
                        "Forfait GoPack",
                        "Credit",
                      ]}
                      onChange={setOperation}
                    />
                  </Grid.Col>
                  <Grid.Col md={2} className={`${classes.hiddenMobile}`}>
                    <Group position="center" align={'center'} sx={{marginBlock:20}}>
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
                      Montant de recharge
                    </Text>
                    <TextInput
                      value={montant}
                      onChange={(event) => setMontant(event.target.value)}
                      type={"number"}
                      placeholder={"Entrer votre montant"}
                    />
                  </Grid.Col>
                </Grid>

                <Grid mt={10}>
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
                      width={"100%"}
                      placeholder="J'ai"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjai}
                    />
                  </Grid.Col>
                  <Grid.Col md={2} className={`${classes.hiddenMobile}`}>
                  <Group position="center" align={'center'} sx={{marginBlock:20}}>
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
                      Le numéro :
                    </Text>
                    <TextInput
                      placeholder="Votre numéro"
                      withAsterisk
                      className={"ombre"}
                      value={numero}
                      onChange={(event) => setnumero(event.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col md={2}></Grid.Col>
                  <Grid.Col md={5}>
                    <Text
                      fz={"md"}
                      weight={500}
                      my={10}
                      className={`dh ${classes.hiddenMobile}`}
                    >
                      Confirmé le numéro :
                    </Text>
                    <TextInput
                      placeholder="Confirmer numéro de réception"
                      withAsterisk
                      className={"ombre"}
                      value={numeroConfirm}
                      onChange={(event) => setnumeroConfirm(event.target.value)}
                    />
                  </Grid.Col>
                </Grid>

                <Group position="center">
                  <Button
                    mr={"sm"}
                    className={"ArrierePlan"}
                    onClick={handleRecharge}
                  >
                    <span style={{ marginInline: 5 }}>Valider</span>{" "}
                    <IconArrowRight size={14} mx={3} />{" "}
                  </Button>
                </Group>
              </Box>
            </Card>
          </Grid.Col>
        </Grid>
      )}
      {valideRecharge && (
        <ResumeRechargeComponent
          numero={numero}
          jai={jai}
          jeveux={jeveux}
          montant={montant}
          operation={operation}
          setValideRecharge={setValideRecharge}
          setreset={setreset}
        />
      )}
    </Container>
  );
}

export default RechargeComponent;
