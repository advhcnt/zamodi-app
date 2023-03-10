import {
  Card,
  Text,
  TextInput,
  Box,
  Grid,
  Button,
  Image,
  Modal,
  CopyButton,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Group } from "@mantine/core";
import {
  IconArrowLeft,
  IconClipboard,
  IconCopy,
  IconPhoneCall,
} from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import mtnLogo from "./../assets/export22/MT.png";
import moovLogo from "./../assets/export22/M.png";
import sbinLogo from "./../assets/export22/C.png";
import operationsService from "../services/operations.service";
import authService from "../services/authService";
import Chargement from "./Chargement";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

function ResumeComponent(props) {
  const { classes } = useStyles();
  const currentUser = authService.getCurrentUser();
  const [opened, setOpened] = useState(false);
  const [openedSecondModal, setOpenedSecondModal] = useState(false);
  const [openedMessageModal, setOpenedMessageModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [Message, setMessage] = useState("");
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();

  const [NumeroMarchand, setNumeroMarchand] = useState("61815442");

  useEffect(() => {
    if (props.jai.split(" ")[0] === "Mtn") {
      let num =
        "*880*41*96969*" +
        (parseInt(props.montant) / 100 + parseInt(props.montant)) +
        "#";
      setNumeroMarchand(num);
    } else if (props.jai.split(" ")[0] === "Moov") {
      let num =
        "*880*41*95959*" +
        (parseInt(props.montant) / 100 + parseInt(props.montant)) +
        "#";
      setNumeroMarchand(num);
    } else if (props.jai.split(" ")[0] === "Celtiis") {
      let num =
        "*880*41*40404*" +
        (parseInt(props.montant) / 100 + parseInt(props.montant)) +
        "#";
      setNumeroMarchand(num);
    }
  }, [props.jai]);

  const handleSubmit = () => {
    setOpenedSecondModal(false);
    setvisible(true);

    operationsService
      .addUserOperation({
        numero: props.numero,
        jai: props.jai,
        jeveux: props.jeveux,
        transactionId: transactionId,
        montant: props.montant,
        OperationKind: "echange",
        userId: currentUser.message._id,
      })
      .then(
        (data) => {
          setvisible(false);
          setOpenedMessageModal(true);
          setMessage(data.data.message);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setvisible(false);
          setOpenedMessageModal(true);
          setMessage(resMessage);
          // alert(resMessage);
        }
      );
  };

  const handleModal = () => {
    setOpened(false);
    setOpenedSecondModal(true);
  };
  return (
    <Box sx={{ position: "relative" }}>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />
      <Grid style={{ justifyContent: "space-around" }}>
        <Grid.Col md={8}>
          <Card shadow="lg" p="lg" radius="md" withBorder>
            <Card.Section
              withBorder
              inheritPadding
              py="xs"
              className="ArrierePlan"
            >
              <Box>
                <Text fz={"md"} weight={500} ta={"center"} c={"white"}>
                  Resumé
                </Text>
              </Box>
            </Card.Section>

            <Card.Section mb={50}>
              <Group
                position={"apart"}
                my={20}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Text fz="lg" fx={900} c={"black"} mx={10} my={10}>
                  Le numéro{" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={10} my={10}>
                  {props.numero}
                </Text>
              </Group>

              <Group
                position={"apart"}
                my={20}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Text fz="lg" fx={900} c={"black"} mx={10} my={10}>
                  J'ai :{" "}
                </Text>
                <Group mx={10} my={10}>
                  <Image
                    src={
                      props.jai.split(" ")[0] === "Mtn"
                        ? mtnLogo
                        : props.jai.split(" ")[0] === "Moov"
                        ? moovLogo
                        : sbinLogo
                    }
                    width={35}
                    alt={"Logo mtn"}
                  />
                  <Text fz="lg" c={"black"}>
                    {props.jai.split(" ")[0]}
                  </Text>
                </Group>
              </Group>

              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={10}>
                  Je veux{" "}
                </Text>
                <Group mx={10}>
                  <Image
                    src={
                      props.jeveux.split(" ")[0] === "Mtn"
                        ? mtnLogo
                        : props.jeveux.split(" ")[0] === "Moov"
                        ? moovLogo
                        : sbinLogo
                    }
                    width={35}
                    alt={"Logo mtn"}
                  />
                  <Text fz={"lg"} c={"black"}>
                    {props.jeveux.split(" ")[0]}
                  </Text>
                </Group>
              </Group>

              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={10}>
                  Montant{" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={10}>
                  {" "}
                  {props.montant} F
                </Text>
              </Group>

              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={10}>
                  Commission (1%){" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={10}>
                  {" "}
                  {parseInt(props.montant) / 100} F
                </Text>
              </Group>

              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={10}>
                  Montant total{" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={10} fw={900}>
                  {" "}
                  {parseInt(props.montant) / 100 + parseInt(props.montant)} F
                </Text>
              </Group>

              <Box
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
                my={50}
              >
                <Group position={"center"}>
                  <Button
                    id="retour"
                    size={"sm"}
                    mr={"lg"}
                    className={"noire"}
                    onClick={() => props.setValide(false)}
                  >
                    <IconArrowLeft size={20} mx={3} /> Modifier
                  </Button>
                  <Button
                    size={"sm"}
                    mr={"lg"}
                    className={"ArrierePlan"}
                    onClick={() => setOpened(true)}
                  >
                    Valider <IconArrowRight size={20} mx={5} />{" "}
                  </Button>
                </Group>
              </Box>
            </Card.Section>
          </Card>

          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Dépôt de l'argent"
          >
            <Text fz={"xl"} fw={900} c={"red"} mb={10} mT={30} ta={"center"} className={classes.hiddenMobile}>
              <CopyButton value={NumeroMarchand} mb={30}>
                {({ copied, copy }) => (
                  <Button className={"ArrierePlan"} onClick={copy}>
                    <span style={{ margin: " 0px 10px" }}> Copier ce code</span>{" "}
                    <IconCopy mx={1000} />
                  </Button>
                )}
              </CopyButton>

              {NumeroMarchand}
            </Text>
            <Group position={"center"} className={classes.hiddenDesktop}>
              <a href={`tel:${NumeroMarchand}`}>
                <Button className={"ArrierePlan"}>
                  Composer <IconPhoneCall />{" "}
                </Button>
              </a>

              <Text> {NumeroMarchand}</Text>
            </Group>

            <Text fz={10} c={"dimmed"} mt={15} mb={30} ta={"center"}>
              {" "}
              Copiez ce code et poursuivez la transaction sur votre téléphone.
              Revenez valider l'opération juste après !
            </Text>
            <Group position={"center"}>
              <Button
                size={"sm"}
                mr={"lg"}
                className={"ArrierePlan"}
                onClick={handleModal}
              >
                Valider <IconArrowRight size={20} mx={5} />{" "}
              </Button>
            </Group>
          </Modal>

          {/* Modal pour coller le ID */}
          <Modal
            centered
            opened={openedSecondModal}
            onClose={() => setOpenedSecondModal(false)}
            title="Coller l'ID"
          >
            <TextInput
              placeholder="idnumMomo12543254812"
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
              rightSection={
                <Button
                  px={0}
                  className={"ArrierePlan"}
                  onClick={() => {
                    navigator.clipboard
                      .readText()
                      .then((text) => {
                        setTransactionId(text);
                        console.log("Pasted content: ", text);
                      })
                      .catch((err) => {
                        console.error(
                          "Failed to read clipboard contents: ",
                          err
                        );
                      });
                  }}
                >
                  <IconClipboard />
                  coller
                </Button>
              }
            />

            <Text fz={10} c={"dimmed"} my={30}>
              {" "}
              Copiez et collez l'ID  de la transaction obtenu dans le SMS que
              vous venez de recevoir pour finaliser l'opération !{" "}
            </Text>

            <Group position={"center"} >
              <Button
                size={"sm"}
                mr={"lg"}
                className={"ArrierePlan"}
                onClick={handleSubmit}
              >
                Faire une nouvelle opération <IconArrowRight size={20} mx={3} />{" "}
              </Button>
            </Group>
            
          </Modal>

          {/* Modal pour afficher la réponse du serveur */}
          <Modal
            centered
            opened={openedMessageModal}
            onClose={() => setOpenedMessageModal(false)}
            title="Réponse"
          >
            <Text fz={"md"} my={30}>
              {" "}
              {Message}
            </Text>

            <Box
              mt={20}
              style={{
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Button
                className={"ArrierePlan"}
                onClick={() => {
                  props.setreset(true);
                  props.setValide(false);
                }}
                px={15}
              >
                Fermer
              </Button>
            </Box>
          </Modal>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default ResumeComponent;
