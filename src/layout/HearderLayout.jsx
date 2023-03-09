import { useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Group,
  Burger,
  Drawer,
  Image,
  Box,
  Text,
  TextInput,
  Menu,
  Avatar,
  UnstyledButton,
  Paper,
  Indicator,
  Container,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconTrash,
  IconSettings,
  IconBell,
  IconAlignCenter,
  IconArrowsLeftRight,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconLetterX,
} from "@tabler/icons";
import ZamodiLogo from "./../assets/Zamodi-Logo3.png";
import ZamodiLogo2 from "./../assets/Zamodi-Logo2.png";
import {
  IconStar,
  IconLogout,
  IconWallet,
  IconShare,
  IconAlertOctagon,
  IconFileText,
  IconLayoutDashboard,
} from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { LanguagePicker } from "../component/langue";
import notificationsService from "../services/notifications.service";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const user = {
  name: "J. Spoonfgf",
  email: "janspoon@fighter.dev",
  image: "http://localhost:8000/files/zamodi-1673012335659.jpeg",
  // "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
};

const DrawerData = [
  { link: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "echange", label: "Faire un échange", icon: IconArrowsLeftRight },
  { link: "recharge", label: "Recharge", icon: IconWallet },
  { link: "historique", label: "Historique", icon: IconFileText },
  { link: "contact", label: "Créer un ticket", icon: IconAlertOctagon },
  { link: "partager", label: "Partager l'App", icon: IconShare },
  { link: "service", label: "Noter le service", icon: IconStar },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    link2: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: "#fff",
      padding: `10px  30px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
    },

    user: {
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: "background-color 100ms ease",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      },

      // [theme.fn.smallerThan("xs")]: {
      //   display: "none",
      // },
    },
    userActive: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
    linkDrawer: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: "#fff",
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${theme.spacing.sm}px  0px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: "#fff",
        color: "#20986e",

        [`& .${icon}`]: {
          color: "#20986e",
        },
      },
    },

    firstPartActive: {
      backgroundColor: "black",
      display: "block",
    },
    firstPart: {
      display: "none",
    },

    linkDrawerIcon: {
      ref: icon,
      color: "#fff",
      marginRight: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
    },

    linkDrawerActive: {
      "&, &:hover": {
        backgroundColor: "#fff",
        color: "#20986e",
        borderRadius: "0px 12px 12px 0px",
        [`& .${icon}`]: {
          color: "#20986e",
        },
      },
    },

    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 86,

      [theme.fn.smallerThan("md")]: {
        // justifyContent: "flex-start",
        display: "block",
        paddingBlock:20
      },
    },

    links: {
      width: 260,

      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },

    burger: {
      marginRight: theme.spacing.md,
      marginLeft: theme.spacing.md,

      [theme.fn.largerThan("md")]: {
        display: "none",
      },
    },

    link: {
      display: "block",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
    hiddenDesktop: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
    hiddenDesktop2: {
      [theme.fn.largerThan("md")]: {
        display: "none",
      },
    },
    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    hiddenMobile2: {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
    NavhiddenMobile: {
      display: "flex",
      gap: 20,
      alignItems: "center",
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    divHidden: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      justifyItems: "center",
      width: "100%",
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
  };
});

function HearderLayout(props) {
  const currentUser = authService.getCurrentUser();

  const navigate = useNavigate();
  const logOut = () => {
    authService.logout();
    navigate("/login");
  };
  // const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, cx } = useStyles();

  const [activeDrawerLink, setActiveDrawerLink] = useState("Dashboard");
  const [DivActive, setDivActive] = useState("Dashboard");

  const linksDrawer = DrawerData.map((item) => (
    <div
      style={{ display: "flex", width: "100%" }}
      onClick={(event) => {
        event.preventDefault();
        closeDrawer();
        setActiveDrawerLink(item.label);
        setDivActive(item.label);
      }}
      key={item.icon}
    >
      <span
        className={cx(classes.firstPart, {
          [classes.firstPartActive]: item.label === activeDrawerLink,
        })}
      >
        ..
      </span>
      <div style={{ width: "80%" }}>
        {" "}
        <Link
          className={cx(classes.linkDrawer, {
            [classes.linkDrawerActive]: item.label === activeDrawerLink,
          })}
          to={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkDrawerIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      </div>
    </div>
  ));

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigation = useNavigate();

  const [countNotifications, setcountNotifications] = useState(0);

  useEffect(() => {
    notificationsService.listeNotification().then(
      (data) => {
        const retour = data.data;
        const compteurTable = retour.filter(
          (item) => !item.readNotification && item.statut !== "En attente"
        );
        console.log("taille", compteurTable.length);
        setcountNotifications(parseInt(compteurTable.length));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Supprimer votre profil",
      centered: true,
      children: (
        <Text size="sm">
          Voulez-vous vraiment supprimer votre profil ? Cette action est
          destructrice et vous aurez pour contacter le support technique afin de
          restaurer vos données.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {
        SuccessNotification(
          "Suppression de compte",
          "Suppression de compte annulée avec succès",
          1
        );
      },
      onConfirm: () => {
        authService.deleteAccount().then(
          (data) => {
            SuccessNotification(
              "Suppression de compte",
              "Votre compte a été supprimé avec succès"
            );
            setTimeout(() => {
              logOut();
            }, 2000);
          },
          (error) => {
            ErrorNotification("Suppression de compte", error);
          }
        );
      },
    });

  const SuccessNotification = (titre, texte, kind = false) => {
    showNotification({
      title: titre,
      message: texte,
      icon: kind ? <IconInfoCircle size={16} /> : <IconCheck size={16} />,
      autoClose: 2000,
    });
  };

  const ErrorNotification = (titre, texte) => {
    showNotification({
      color: "red",
      title: titre,
      message: texte,
      icon: <IconX size={16} />,
      autoClose: 2000,
    });
  };

  return (
    <>
      <Header height={70} mb={30}>
        <Box className={classes.inner}>

          <Group position="apart" className={classes.hiddenDesktop2} width={'100vw'} pr={20}>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              size="sm"
              className={classes.burger}
            />
            <Image src={ZamodiLogo} width={130} />
            {/* cloche de notification */}{" "}
            {countNotifications > 0 ? (
              <Indicator
                color="red"
                label={countNotifications}
                overflowCount={10}
                inline
                size={22}
              >
                <IconBell
                  className={"EcritVert spanButton"}
                  onClick={() => navigate("notifications")}
                />{" "}
              </Indicator>
            ) : (
              <IconBell
                className={"EcritVert spanButton"}
                onClick={() => navigate("notifications")}
              />
            )}
          </Group>
          <div className={classes.divHidden}>
            <Box ta={"center"}>
              {" "}
              <Group position="center" className={classes.hiddenDesktop}>
                <Image
                  src={ZamodiLogo}
                  width={130}
                  style={{ marginLeft: 50 }}
                />
              </Group>
              <Text
                fz="xl"
                fw={900}
                ta={"center"}
                style={{ marginLeft: "20px" }}
                className={classes.hiddenMobile}
              >
                Dashboard
              </Text>
            </Box>

            <Box
              className={classes.NavhiddenMobile}
              pr={20}
              // style={{ display: "flex", gap: 20, alignItems: "center" }}
            >
              <TextInput
                icon={<IconSearch size={14} />}
                type={"search"}
                placeholder="Recherche"
                rightSection={
                  <IconAlignCenter size={24} className={"EcritVert"} />
                }
                radius={"md"}
                size={"sm"}
                style={{ width: "40vw" }}
              />
              {/* Menu pour le choix de la langue */}
              <LanguagePicker />
              {/* cloche de notification */}{" "}
              {countNotifications > 0 ? (
                <Indicator
                  color="red"
                  label={countNotifications}
                  overflowCount={10}
                  inline
                  size={22}
                >
                  <IconBell
                    className={"EcritVert spanButton"}
                    onClick={() => navigate("notifications")}
                  />{" "}
                </Indicator>
              ) : (
                <IconBell
                  className={"EcritVert spanButton"}
                  onClick={() => navigate("notifications")}
                />
              )}
            </Box>

            {/* Client info */}
            <Box display={"flex"} sx={{ alignItems: "center",paddingRight:10 }}>
              <Box className={classes.hiddenDesktop}>
                {countNotifications > 0 ? (
                  <Indicator
                    color="red"
                    label={countNotifications}
                    overflowCount={10}
                    inline
                    size={22}
                  >
                    <IconBell
                      className={"EcritVert spanButton"}
                      onClick={() => navigate("notifications")}
                    />{" "}
                  </Indicator>
                ) : (
                  <IconBell
                    className={"EcritVert spanButton"}
                    onClick={() => navigate("notifications")}
                  />
                )}
              </Box>{" "}
              <Menu
                className={classes.NavhiddenMobile}
                width={"300px"}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7} position="center">
                      <div>
                        <Text
                          weight={500}
                          size="sm"
                          sx={{ lineHeight: 1 }}
                          mr={3}
                        >
                          {currentUser.message.username}
                        </Text>

                        <Text
                          weight={500}
                          size="xs"
                          sx={{ lineHeight: 1 }}
                          ta={"center"}
                          className={"EcritVert "}
                        >
                          Client
                        </Text>
                      </div>

                      <Avatar
                        src={
                          currentUser.message.photo
                            ? currentUser.message.photo
                            : user.image
                        }
                        alt={user.name}
                        radius="xl"
                        width={400}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    icon={<IconSettings size={14} stroke={1.5} />}
                    onClick={() => navigation("profile")}
                  >
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconLogout size={14} stroke={1.5} />}
                    onClick={logOut}
                  >
                    Logout
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    icon={<IconTrash size={14} stroke={1.5} />}
                    onClick={openDeleteModal}
                  >
                    Delete account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>

            {/* Utilisateur */}
          </div>
        </Box>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        // title="ZAMODI"
        className={classes.hiddenDesktop2}
        zIndex={1000000}
        style={{ background: "#20986e !important" }}
      >
        <Box
          py={10}
          sx={{
            background: "#fff",
            borderRadius: "0 0 0 32px",
            marginTop: "-100",
          }}
        >
          <Group position={"right"}>
            <span
              onClick={closeDrawer}
              style={{
                border: "1px solid #fff",
                borderRadius: "360px",
                padding: "5px 10px",
                marginRight: 10,
                background: "#f3f3f3",
              }}
            >
              {/*  */}
              <IconLetterX size={14} color={"#20986E"} />
            </span>
          </Group>
          <Group pl={35}>
            {/* <Image src={ZamodiLogo} width={130} /> */}
            {/* <IconLetterX mt={-100} /> */}
            <Group>
              <Avatar
                src={
                  currentUser.message.photo
                    ? currentUser.message.photo
                    : user.image
                }
                alt={user.name}
                radius="xl"
                size={50}
              />
              <Box>
                <Text fw={500} fz={"md"}>
                  {currentUser.message.username}
                </Text>
                <Text
                  fz={"xs"}
                  className="dh"
                  onClick={() => {
                    closeDrawer();
                    navigate("profile");
                  }}
                >
                  Edit Profile
                </Text>
              </Box>
            </Group>
          </Group>
        </Box>
        <Box mt={30}>
          <ScrollArea type={"scroll"} sx={{ paddingBottom: 30 }}>
            <Box>{linksDrawer}</Box>

            <Box style={{ bottom: 0, position: "fixed", paddingBottom: 20 }}>
              {/* <Group position={"center"} my={"5px"} >
              <Paper style={{marginLeft:30, border: "1px solid #f7f7f7", padding: "20px",background:"#62C3A1",marginRight:20 }}>
                <Text ta="center" fw={"bold"} c={'#fff'}>
                  À Propos
                </Text>
                <Text fz={"xs"} c={'#fff'} ta={'center'}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing
                  diam nonumy eirmod tempor
                </Text>
              </Paper>
            </Group> */}

              <Group position={"center"} ml={30}>
                <span
                  
                  className={classes.link2}
                  onClick={(event) =>{
                    event.preventDefault();
                    logOut();
                  } }

                  style={{
                    borderRadius: "12px",
                    paddingLeft: "15px",
                    color: "#20986e",
                    background: "#fff",
                  }}
                >
                  <IconLogout className={classes.linkIcon} stroke={1.5} />
                  <span>Deconnexion</span>
                </span>
              </Group>
            </Box>
          </ScrollArea>
        </Box>
      </Drawer>
    </>
  );
}

export default HearderLayout;
