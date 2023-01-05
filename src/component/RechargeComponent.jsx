import {
  ActionIcon,
  Card,
  Container,
  Menu,
  Text,
  TextInput,
  Box,
  Grid,
  Select,
  Button,
  Notification,
} from "@mantine/core";
import React, { useState } from "react";
import { IconArrowsLeftRight, IconChevronDown, IconX } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import ResumeRechargeComponent from "./ResumeRechargeComponent";
import authService from "../services/authService";
import { verifyAmount, verifyPhoneNumber } from "../utils/fonctions";

function RechargeComponent(props) {
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
              message: "Veillez entrer un montant correct",
            });
          }
        } else {
          seterror({
            statut: true,
            message:
              `Tu ne peux pas avoir ${jai.split(' ')[0].toUpperCase()} et recevoir ${jeveux.split(' ')[0].toUpperCase()}`,
          });
        }
      } else {
        seterror({ statut: true, message: "Veillez entrer un numéro correct" });
      }
    } else {
      seterror({ statut: true, message: "Veillez remplir les champs" });
    }
  };

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

              <Box mb={50}>
                <Box
                  mt={15}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 30,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Type d'opération
                    </Text>
                    <Select
                      width={"100%"}
                      placeholder="Opération Type"
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
                  </Box>
                  <Box>
                    <IconArrowsLeftRight size={20} color="green" />
                  </Box>
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Montant de recharge
                    </Text>
                    <TextInput
                      value={montant}
                      onChange={(event) => setMontant(event.target.value)}
                      type={'number'}
                      placeholder={'Entrer votre montant'}
                    />
                  </Box>
                </Box>

                <Box
                  mt={15}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 30,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      J'ai
                    </Text>
                    <Select
                      width={"100%"}
                      placeholder="I get"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjai}
                    />
                  </Box>
                  <Box>
                    <IconArrowsLeftRight size={20} color="green" />
                  </Box>
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Je veux
                    </Text>
                    <Select
                      placeholder="I want"
                      rightSection={<IconChevronDown size={14} />}
                      rightSectionWidth={30}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      data={["Moov Money", "Mtn money", "Celtiis money"]}
                      onChange={setjeveux}
                    />
                  </Box>
                </Box>

                <Box
                  mt={15}
                  mb={30}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 30,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Le numéro :
                    </Text>
                    <TextInput
                      placeholder="Votre numéro"
                      withAsterisk
                      className={"ombre"}
                      value={numero}
                      onChange={(event) => setnumero(event.target.value)}
                    />
                  </Box>
                  <Box></Box>
                  <Box>
                    <Text fz={"md"} weight={500} my={10} className={"dh"}>
                      Confirmé le numéro :
                    </Text>
                    <TextInput
                      placeholder="Confirmer numéro"
                      withAsterisk
                      className={"ombre"}
                      value={numeroConfirm}
                      onChange={(event) => setnumeroConfirm(event.target.value)}
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    mr={"sm"}
                    className={"ArrierePlan"}
                    onClick={handleRecharge}
                  >
                    Valider <IconArrowRight size={14} mx={3} />{" "}
                  </Button>
                </Box>
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
        />
      )}
    </Container>
  );
}

export default RechargeComponent;
