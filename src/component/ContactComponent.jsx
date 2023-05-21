import {
  Card,
  Divider,
  Image,
  Text,
  Textarea,
  TextInput,
  Grid,
  Container,
  Box,
  Button,
  Modal,
  Notification,
  Group,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import React, { useState } from "react";
import ticketService from "../services/ticket.service";
import ContactLogo from "./../assets/contact.svg";

function ContactComponent(props) {
  const [openedMessageModal, setOpenedMessageModal] = useState(false);
  const [Message, setMessage] = useState("");
  const [sujet, setsujet] = useState("");
  const [message, setmessage] = useState("");

  const [error, seterror] = useState({
    statut: false,
    message: "",
  });

  const handleSubmit = () => {
    if (sujet && message) {
      ticketService
        .addUserTicket({
          sujet: sujet,
          description: message,
        })
        .then(
          (data) => {
            
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
            setOpenedMessageModal(true);
            setMessage(resMessage);
            // alert(resMessage);
          }
        );
    } else {
      seterror({
        statut: true,
        message: "Veuillez remplir les champs",
      });
    }
  };

  return (
    <div>
      <Container>
        <Text fz={"lg"} fw={"bold"} my={30}>
          Créer un ticket
        </Text>
        {error.statut && (
          <Notification
          my={20}
            icon={<IconX size={18} />}
            color="red"
            onClick={() => seterror(false, "")}
          >
            {error.message}
          </Notification>
        )}
        <Card shadow="lg">
          <Card.Section>
            <Grid>
              <Grid.Col
                md={5}
                style={{
                  justifyContent: "space-around",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <Image src={ContactLogo} style={{ width: "80%" }} mt={40} />
                <Container mt={20}>
                  <Text ta={"center"}>
                    Notre service client disponible pour vous écouter 24h/ 24h
                  </Text>
                </Container>
              </Grid.Col>
              <Grid.Col md={7}>
                <Container>
                  <Text fz={"md"} fw={"bold"} mt={20}>
                    Support
                  </Text>
                  <Divider mt={15} mb={40} />
                  <Box my={20}>
                    <Text size={"lg"} my={5}>
                      Sujet
                    </Text>
                    <TextInput
                      value={sujet}
                      onChange={(event) => setsujet(event.target.value)}
                      size={"md"}
                      variant={"filled"}
                      style={{ borderColor: "#20986e" }}
                    />
                  </Box>

                  <Box my={20}>
                    <Text size={"lg"} my={5}>
                      Message
                    </Text>
                    <Textarea
                      autosize
                      minRows={5}
                      variant={"filled"}
                      style={{ borderColor: "#20986e" }}
                      value={message}
                      onChange={(event) => setmessage(event.target.value)}
                    />
                  </Box>
                  <Group position={'center'} my={40}>
                    <Button
                      className={"ArrierePlan"}
                      c={"white"}
                      // fullWidth={true}
                      onClick={handleSubmit}
                    >
                      Envoyer
                    </Button>
                  </Group>
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

export default ContactComponent;
