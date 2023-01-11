import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Menu,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import notificationsService from "../../services/admin/notificationsService";
import operationsService from "../../services/operations.service";
import Chargement from "../Chargement";
import { UpdatedModal } from "./UpdateModale";

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

function Echange(props) {
  const [opened, updateModale] = useDisclosure(false);
  const [openedShow, ouvrir] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [operations, setoperations] = useState(false);
  const [operation, setoperation] = useState(false);
  const [statut, setstatut] = useState(false);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    operationsService.getAllOperations().then(
      (data) => {
        const liste = data.data.data;
        setoperations([...liste]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // Pour fermer le modal permettant la muise à jour
  const handleChange = (identifiant) => {
    const resultat = operations.find(
      (item) => item.transactionId === identifiant
    );
    setoperation({ ...resultat });
    updateModale.open();
  };
  // Pour checker le state d'une demande
  const checkState = (state) => {
    if (state === "En attente") {
      return "attente";
    } else if (state === "Valide") {
      return "valide";
    } else {
      return "annule";
    }
  };

  // Pour ouvrir le modal permettant d'afficher les details
  const afficheOperation = (identifiant) => {
    const resultat = operations.find(
      (item) => item.transactionId === identifiant
    );
    setoperation({ ...resultat });

    ouvrir.open();
  };

  // Pour la mise à jour d'une demande(creation de notification)
  const handleNotification = () => { };

  useEffect(() => {
    if (operation && operation) setoperation({ ...operation, statut: statut });
  }, [statut]);

  const handleMessage = (message) => {
    if (message && message !== "") {
      setoperation({ ...operation, notification: message });
    }


  };

  // Soumission de la notification
  const handleSubmit = () => {
    setvisible(true);
    updateModale.close();
    try {
      notificationsService.addNotifications(operation).then(
        (data) => {
          setvisible(false);

          operationsService.getAllOperations().then(
            (data) => {
              const liste = data.data.data;

              setoperations([...liste]);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          setvisible(false);
          console.log(error);
        }
      );
    } catch (error) {
      setvisible(false);
      console.log(error);
    }
  };

  return (
    <>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Text variant={"title"} fz={"xl"} fw={900} my={10}>
          Liste des échanges clients
        </Text>
        <Table
          sx={{ minWidth: 700 }}
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          horizontalSpacing="md"
          verticalSpacing="md"
          fontSize="md"
        >
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Operation</th>
              <th>Identifiant</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operations !== false ? (
              <>
                {operations.map((item) => (
                  <tr key={item.transactionId}>
                    <td>{item.username.toUpperCase()}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.email}
                      </a>{" "}
                    </td>
                    <td>{item.OperationKind.toUpperCase()}</td>
                    <td>{item.transactionId}</td>
                    <td>
                      <span className={checkState(item.statut)}>
                        {item.statut.toUpperCase() === 'EN ATTENTE' ? 'ATTENTE' : item.statut.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {item.updatedAt.split("T")[0]} à{" "}
                      {item.updatedAt.split("T")[1].split(".")[0]}
                    </td>
                    <td>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<IconEdit size={14} />}
                            onClick={() => handleChange(item.transactionId)}
                          >
                            Modifier
                          </Menu.Item>
                          <Menu.Item
                            icon={<IconEye size={14} />}
                            onClick={() => afficheOperation(item.transactionId)}
                          >
                            Afficher
                          </Menu.Item>
                          <Menu.Item icon={<IconTrash size={14} />} color="red">
                            Supprimer
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                ))}{" "}
              </>
            ) : (
              <tr>
                <td colSpan={7} > <Text ta={'center'}> Pas d'opérations</Text> </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>

      {/* <Button onClick={open} hidden id="openModal"  >
        Open modal
      </Button> */}

      <Modal
        centered
        closeOnClickOutside={false}
        withCloseButton={true}
        opened={opened}
        onClose={updateModale.close}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <h2>Mise à jour </h2>
          </div>
          <Box>
            <Select
              label="Changer l'état de la demande"
              placeholder="Pick one"
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              defaultValue={operation.statut}
              onChange={setstatut}
              styles={{ rightSection: { pointerEvents: "none" } }}
              data={["En attente", "Valide", "Annule"]}
            />

            <Textarea
              my={15}
              label="Message "
              autosize
              minRows={2}
              maxRows={4}
              onChange={(event) => handleMessage(event.currentTarget.value)}
            />

            <Group position={"center"} my={20} onClick={handleSubmit}>
              <Button className={'ArrierePlan'} sx={{ color: "white" }}>Valider</Button>
            </Group>
          </Box>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal
        centered
        closeOnClickOutside={false}
        withCloseButton={true}
        opened={openedShow}
        onClose={ouvrir.close}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div>
          <div style={{ marginBottom: theme.spacing.sm }}>
            <Center>
              <h2> Détails sur l'opération</h2>
            </Center>
          </div>
          {operation ? (
            <Box>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Username:
                </strong>{" "}
                {operation.username}
              </Text>

              <Text>
                {" "}
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Email:
                </strong>{" "}
                <a
                  href={`mailto:${operation.email}`}
                  style={{ textDecoration: "none" }}
                >
                  {operation.email}
                </a>{" "}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Opération:{" "}
                </strong>
                {operation.OperationKind.toUpperCase()}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Montant:
                </strong>
                {operation.montant}F cfa
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Réseau de départ:{" "}
                </strong>
                {operation.jai.toUpperCase()}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Réseau d'arriver:{" "}
                </strong>
                {operation.jeveux.toUpperCase()}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Message:{" "}
                </strong>
                {operation.notification}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Description:{" "}
                </strong>
                {operation.Description}
              </Text>
              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Lecture:{" "}
                </strong>
                {!operation.readNotification ? "Non" : 'Oui'}
              </Text>

              <Text>
                <strong
                  style={{
                    margin: "5px 20px 5px 20px",
                  }}
                >
                  Date:
                </strong>
                {operation.updatedAt.split("T")[0]} à{" "}
                {operation.updatedAt.split("T")[1].split(".")[0]}
              </Text>

              <Group position={"center"} my={20} onClick={ouvrir.close}>
                <Button variant="light" color="red">
                  Fermer
                </Button>
              </Group>
            </Box>
          ) : (
            <Text>En cours de chargement</Text>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Echange;
