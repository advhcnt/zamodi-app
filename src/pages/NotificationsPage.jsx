import React from "react";
import notificationsService from "../services/notifications.service";
import { useEffect } from "react";
import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Paper,
  Text,
  TypographyStylesProvider,
  createStyles,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import authService from "../services/authService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import notificationAdminService from "./../services/admin/notificationsService.js";
import blankTable from "./../assets/blankTable.png";
import { useLayoutEffect } from "react";
const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    marginBlock: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export function NotificationsPage(props) {
  const [notification, setnotification] = useState([]);
  const [operation, setoperation] = useState(false);
  const [openedShow, ouvrir] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [who, setwho] = useState("CLIENT");
  const path = window.location.pathname;
  const location = useLocation();

  const navigate = useNavigate();
  useLayoutEffect(() => {
    console.log(location.pathname.split("/"));
    let path = location.pathname;
    navigate(path);
  }, []);
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [path]);

  // Pour ouvrir le modal permettant d'afficher les details
  const afficheOperation = (identifiant) => {
    const resultat = notification.find(
      (item) => item.transactionId === identifiant
    );
    setoperation({ ...resultat });

    setTimeout(() => {
      notificationsService.lireNotification(operation._id).then(
        (data) => {
          console.log("lue");
        },
        (error) => {
          console.log("error");
        }
      );
    }, 500);

    ouvrir.open();
  };

  useEffect(() => {
    authService.isAdmin().then(
      (data) => {
        if (data.data.isAdmin) {
          notificationAdminService.listNotifications().then(
            (data) => {
              setwho("ADMIN");
              setnotification([...data.data.contenu]);
              console.log(data.data.contenu);
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          notificationsService.listeNotification().then(
            (data) => {
              console.log(data);
              setnotification([...data.data]);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        navigate("/login");
      }
    );
  }, []);
  return (
    <>
      {who === "CLIENT" ? (
        <>
          {notification.filter((item) => item.statut !== "En attente").length >
          0 ? (
            <>
              {notification.map((item) => (
                <>
                  {item.statut !== "En attente" && (
                    <Paper
                      withBorder
                      radius="md"
                      className={classes.comment}
                      onClick={() => afficheOperation(item.transactionId)}
                    >
                      <Group>
                        <Avatar alt={"zamodiapp"} radius="xl" />
                        <div>
                          <Text size="sm">ZAMODI TEAM</Text>
                          <Text
                            size="xs"
                            color={item.statut === "Valide" ? "green" : "red"}
                          >
                            {item.statut}{" "}
                            {!item.readNotification && (
                              <Badge color={"red"}>NL</Badge>
                            )}
                          </Text>
                        </div>
                      </Group>
                      <TypographyStylesProvider className={classes.body}>
                        <div
                          className={classes.content}
                          dangerouslySetInnerHTML={{
                            __html: item.notification,
                          }}
                        />
                      </TypographyStylesProvider>
                    </Paper>
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              <Box
                mt={100}
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
              <Text ta={"center"} c="#000" mt={20}>
                Vous n'avez pas de notifications actuellement
              </Text>
            </>
          )}
        </>
      ) : who === "ADMIN" ? (
        <>
          {notification.length > 0 ? (
            <>
              {notification.map((item) => (
                <>
                  <Paper
                    withBorder
                    radius="md"
                    className={classes.comment}
                    onClick={() => afficheOperation(item.transactionId)}
                  >
                    <Group>
                      <Avatar alt={"zamodiapp"} radius="xl" />
                      <div>
                        <Text size="sm">ZAMODI TEAM</Text>
                        <Text
                          size="xs"
                          color={item.statut === "Valide" ? "green" : "red"}
                        >
                          {item.statut}{" "}
                          {!item.readNotification && (
                            <Badge color={"red"}>NL</Badge>
                          )}
                        </Text>
                      </div>
                    </Group>
                    <TypographyStylesProvider className={classes.body}>
                      <div
                        className={classes.content}
                        dangerouslySetInnerHTML={{ __html: item.notification }}
                      />
                    </TypographyStylesProvider>
                  </Paper>
                </>
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
                Vous n'avez pas de notifications actuellement
              </Text>
            </>
          )}
        </>
      ) : (
        <Navigate to={"/"} />
      )}

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
                {!operation.readNotification ? "Non" : "Oui"}
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
