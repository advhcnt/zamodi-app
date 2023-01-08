import { useState } from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconTrash,
  IconSettings,
  IconBell,
  IconAlignCenter,
} from "@tabler/icons";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import {
  IconStar,
  IconLogout,
  IconArrowsLeftRight,
  IconWallet,
  IconAlertOctagon,
  IconFileText,
  IconHome,
} from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { LanguagePicker } from "../component/langue";

const user = {
  name: "J. Spoonfgf",
  email: "janspoon@fighter.dev",
  image:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
};



const DrawerData = [
  { link: "/admin", label: "Dashboard", icon: IconHome },
  { link: "echange", label: "Echange", icon: IconArrowsLeftRight },
  { link: "recharge", label: "Recharge", icon: IconWallet },
  { link: "historique", label: "Historique", icon: IconFileText },
  { link: "contact", label: "Tickets clients", icon: IconAlertOctagon },
  { link: "avis", label: "Avis clients", icon: IconStar },
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
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${theme.spacing.sm}px  0px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      marginTop: "80px",
    },
    langue: {
      border: "1px solid ",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: "background-color 100ms ease",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      },

      [theme.fn.smallerThan("xs")]: {
        display: "none",
      },
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
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${theme.spacing.sm}px  0px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
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
      color: "black",
      marginRight: theme.spacing.sm,
    },

    linkDrawerActive: {
      "&, &:hover": {
        backgroundColor: "#20986e",
        color: "white",
        borderRadius: "0px 12px 12px 0px",
        [`& .${icon}`]: {
          color: "white",
        },
      },
    },

    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 86,

      [theme.fn.smallerThan("sm")]: {
        justifyContent: "flex-start",
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

      [theme.fn.largerThan("sm")]: {
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
    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
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
  };
});

function HearderAdminLayout(props) {
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
      <div style={{ width: "100%" }}>
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

  return (
    <>
      <Header height={70} mb={30}>
        <Box className={classes.inner}>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size="sm"
            className={classes.burger}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              justifyItems: "center",
              width: "100%",
            }}
          >
            <Box ta={"center"}>
              {" "}
              <Image
                src={ZamodiLogo}
                size={30}
                className={classes.hiddenDesktop}
              />
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
              <LanguagePicker />
              <IconBell className={"EcritVert "} /> {/* Utilisateur */}{" "}
            </Box>

            {/* Langue */}
            <Box>
              {" "}
              <Menu
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
                    <Group spacing={7}>
                      <div>
                        <Text
                          weight={500}
                          size="sm"
                          sx={{ lineHeight: 1 }}
                          mr={3}
                        >
                          {/* {currentUser.message.username} */}
                          toto
                        </Text>
                        <Text
                          weight={500}
                          size="xs"
                          sx={{ lineHeight: 1 }}
                          ta={"center"}
                          className={"EcritVert "}
                        >
                          Admin
                        </Text>
                      </div>

                      <Avatar
                        src={user.image}
                        alt={user.name}
                        radius="xl"
                        size={20}
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
        // transition="rotate-left"
        // transitionDuration={2500}
        // transitionTimingFunction="ease"
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        // title="ZAMODI"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        closeOnEscape
      >
        <Box>
          <Image src={ZamodiLogo} />
        </Box>
        <Box>{linksDrawer}</Box>

        <Box my={"100px"}>
          <Paper style={{ border: "2px solid #f7f7f7", padding: "15px" }}>
            <Text ta="center" fw={"bold"}>
              À Propos
            </Text>
            <Text fz={"xs"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor
            </Text>
          </Paper>
        </Box>
        <Box className={classes.footer}>
          <Link
            to="/login"
            className={classes.link2}
            // onClick={(event) => event.preventDefault()}

            style={{
              backgroundColor: "#20986e",
              borderRadius: "12px",
              paddingLeft: "10px",
              color: "white",
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Deconnexion</span>
          </Link>
        </Box>
      </Drawer>
    </>
  );
}

export default HearderAdminLayout;
