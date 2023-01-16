import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Menu,
  Modal,
  Paper,
  ScrollArea,
  Table,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconLock, IconTrash } from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import ticketService from "../../services/ticket.service";
import Chargement from "../Chargement";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Tickets(props) {
  const errRef = useRef();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, AnswerModal] = useDisclosure(false);
  const [tickets, settickets] = useState(false)
  const [ticket, setticket] = useState(false)
  const [reponse, setreponse] = useState('')
  const theme = useMantineTheme();
  const [visible, setvisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");


  const handleAnswerModal = (data) => {
    setticket({ ...data })
    AnswerModal.open()
  }

  const handleChange = () => {

    AnswerModal.close();
  };

  useEffect(() => {
    ticketService.getAllTicket().then(
      (data) => {
        const resultat = data.data.data
        settickets([...resultat]);
      },
      (error) => {
        console.log(error)
      }
    )
  }, [tickets])


  const handleSubmitAnswer = () => {
    setvisible(true)

    setticket({ ...ticket, reponse: reponse })
    console.log(ticket)

    let tick = { ...ticket, reponse: reponse }
    console.log(tick)
    ticketService.updateUserTicket(ticket._id, tick).then(
      (data) => {
        AnswerModal.close();
        setvisible(false)
        console.log(data)
      },
      (error) => {
        setvisible(false)
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage)
      }
    )
  }


  return (
    <>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />

      <ScrollArea
        sx={{ height: 600 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >

        <Text variant={"title"} fz={"xl"} fw={900} my={10}>
          Liste des tickets
        </Text>
        <Table sx={{ minWidth: 700 }}
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="md"
          fontSize="md"
        >

          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>Numero</th>
              <th>Username</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {tickets ? (
              <>
                {tickets.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td> <a
                      href={`mailto:${item.email}`}
                      style={{ textDecoration: "none" }}
                    >
                      {item.email}
                    </a></td>
                    <td>{item.sujet}</td>
                    <td>
                      {item.description}
                    </td>
                    <td> {item.createdAt.split("T")[0]} à{" "}
                      {item.createdAt.split("T")[1].split(".")[0]}</td>
                    <td>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item icon={<IconEdit size={14} />} onClick={() => handleAnswerModal(item)} >Répondre</Menu.Item>
                          <Menu.Item icon={<IconLock size={14} />}>Blocker</Menu.Item>
                          <Menu.Item icon={<IconTrash size={14} />} color="red">
                            Supprimer
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                ))}

              </>

            ) : (<>
              <tr  >
                <td colSpan={7} > <Center> Pas d'opérations</Center> </td>
              </tr>
            </>)}

          </tbody>
        </Table>
      </ScrollArea>


      <Modal
        centered
        closeOnClickOutside={false}
        withCloseButton={true}
        opened={opened}
        onClose={AnswerModal.close}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div>
        <Text
              ta={"center"}
              c={"red"}
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </Text>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <h2>Répondre au ticket </h2>
          </div>
          <Box>
            <Paper withBorder shadow={'xl'} p={'md'} >
              <Text>
                {ticket.description}
              </Text>
            </Paper>

            <TextInput placeholder="Sujet" required label={'Sujet'} value={ticket.sujet} readOnly />

            <Textarea
              my={15}
              label="Message "
              autosize
              minRows={2}
              maxRows={4}
              required
              onChange={(event) => setreponse(event.target.value)}
            />
            {reponse}

            <Group position={"center"} my={20} onClick={handleSubmitAnswer}>
              <Button className={'ArrierePlan'} sx={{ color: "white" }}>Répondre</Button>
            </Group>
          </Box>
        </div>
      </Modal>
    </>
  );
}

export default Tickets;
