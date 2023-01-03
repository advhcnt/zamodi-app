import {
  Card,
  Paper,
  Text,
  Container,
  Box,
  Button,
  Group,
  TextInput,
  Grid,
  Divider,
  Textarea,
  Progress,
  Modal,
} from "@mantine/core";
import { IconStar } from "@tabler/icons";
import React, { useState } from "react";
import authService from "../services/authService";
import NoteComponent from "./NoteComponent";
import userservice from "./../services/avis.service";
import Chargement from "./Chargement";
import { useSetState } from "@mantine/hooks";
function ServiceComponent(props) {
  const currentUser = authService.getCurrentUser().message;
  const [note, setnote] = useState(0);
  const [description, setdescription] = useState("");
  const [openedMessageModal, setOpenedMessageModal] = useState(false);
  const [visible, setvisible] = useState(false)

  const [Message, setMessage] = useState("");

  const handleSubmit = () => {
    setvisible(true);
    if (currentUser.username && description) {
      userservice
        .addUserAvis({
          note,
          description,
        })
        .then(
          (data) => {
            setOpenedMessageModal(true);
            setMessage(data.data.message);
            setvisible(false)
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setvisible(false)
            setOpenedMessageModal(true);
            setMessage(resMessage);
          }
        );
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />
      <Container size={"sm"}>
        <Card shadow="lg">
          <Card.Section
            withBorder
            inheritPadding
            py="xs"
            className="ArrierePlan"
          >
            <Box>
              <Text fz={"sm"} weight={500} ta={"center"} c={"white"}>
                Noter le service
              </Text>
            </Box>
          </Card.Section>
          <Card.Section>
            <Container>
              <Paper my={20} shadow={"lg"}>
                <Group position={"apart"}>
                  <Box sx={{ gap: 3, color: "black", marginLeft: 30 }}>
                    <Text fz={15}>Note globale</Text>
                    <Text fz={45} fw={400} sx={{ alignItems: "center" }}>
                      <IconStar color="yellow" size={40} /> 94%
                    </Text>
                    <Text fz={10}>2 .115 évaluations</Text>
                  </Box>
                  <Box c={"dark"}>
                    <Group mb={5}>
                      <Text>Fonctionnalités</Text>
                      <Progress defaultValue={50} vocab color={"red"} />
                    </Group>
                    <Group my={5}>
                      <Text>Simplicité d'utilisation</Text>
                    </Group>
                    <Group my={5}>
                      <Text>Support client </Text>
                    </Group>
                  </Box>
                </Group>
              </Paper>
            </Container>
          </Card.Section>

          <Card.Section>
            <Grid>
              <Grid.Col md={5} style={{ justifyContent: "space-around" }}>
                <Paper withBorder px={15} my={20}>
                  <Text fz={"md"} fw={"900"} mt={20}>
                    Note globale
                  </Text>
                  <Divider mt={15} mb={40} />

                  <Box>
                    <NoteComponent note={note} niveau={5} setnote={setnote} />
                    <NoteComponent note={note} niveau={4} setnote={setnote} />
                    <NoteComponent note={note} niveau={3} setnote={setnote} />
                    <NoteComponent note={note} niveau={2} setnote={setnote} />
                    <NoteComponent note={note} niveau={1} setnote={setnote} />
                    {/* checked={false} */}
                  </Box>
                </Paper>

                <Box display={"flex"} sx={{ alignItems: "center", gap: 3 }}>
                  <Text fz={45} fw={500}>
                    94%
                  </Text>
                  <Text fz={10}>
                    Des utilisateurs recommandent cette application
                  </Text>
                </Box>
              </Grid.Col>
              <Grid.Col md={7}>
                <Container>
                  <Text fz={"md"} fw={"900"} mt={20}>
                    Écrire un avis sur
                  </Text>
                  <Divider mt={15} mb={40} />
                  <Box my={20}>
                    <Text size={"md"}>Nom d'utilisateur</Text>
                    <TextInput
                      size={"md"}
                      variant={"filled"}
                      style={{ borderColor: "#20986e" }}
                      value={currentUser.username}
                      readOnly
                    />
                  </Box>

                  <Box my={20}>
                    <Text size={"md"}>Avis</Text>
                    <Textarea
                      autosize
                      minRows={2}
                      variant={"filled"}
                      style={{ borderColor: "#20986e" }}
                      value={description}
                      onChange={(event) => setdescription(event.target.value)}
                    />
                  </Box>
                  <Box my={40}>
                    <Button
                      className={"ArrierePlan"}
                      c={"white"}
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Envoyer
                    </Button>
                  </Box>
                </Container>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
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
        </Modal>
      </Container>
    </div>
  );
}

export default ServiceComponent;
