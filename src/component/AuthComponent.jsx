import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Grid,
  Box,
  createStyles,
  Card,
  Image,
} from "@mantine/core";
import ZamodiLogo from "./../assets/Zamodi-Logo.png";
import { Link } from "react-router-dom";
import { IconLock, IconMail } from "@tabler/icons";
import facebook from "./../assets/facebookSVG.svg";
import authLogo from "./../assets/Auth.svg";
const useStyles = createStyles((theme) => ({
  logo: {
    marginBottom: "12vh",
    marginInline: "10vw",
    justifyContent: "center",
    alignContent: "center",
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  loginButton: {
    backgroundColor: "#20986e",
    width: "100%",
    marginTop: "3vh",
  },
  partieChamp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    height: "100vh",
  },
  partieNeutre: {
    backgroundColor: "#20986e",
    display: "flex",
    alignItems: "center",
    justifyContent:'space-around',
    borderRadius: " 110px 0px 0px 0px ",
    border: "1px solid white",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
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

function AuthComponent(props) {
  const { classes, cx } = useStyles();
 

  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden", maxHeight: "100vh" }}>
      <Grid
        className={"secondplaceLogin"}
        style={{ maxHeight: "102vh", overflow: "hidden" }}
      >
        <Grid.Col
          md={6}
          order={2}
          orderMd={1}
          className={` ${classes.partieChamp}`}
        >
         {/* Ici c'est pour mettre le composant parent */}
        </Grid.Col>
        <Grid.Col md={6} order={1} orderMd={2} className={classes.partieNeutre}>
          <Box style={{ width: "58%" }}>
            {" "}
            <Box style={{display:'flex',alignItems:'center',justifyContent:'space-around'}} >
              <Image
                src={authLogo}
                alt="auth logo"
                width={"100%"}
                marginX={"auto"}
              />
            </Box>
            <Box style={{marginInline:'auto', width: "80%",textAlign:'center',justifyContent:'center',alignContent:'center',display:'flex' }}>
              <Text size={10} ta='center' style={{color:'whitesmoke',}}>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos sed
            blanditiis sint. Odio, magni vero minus blanditiis cupiditate nisi
           </Text>
            </Box>
           
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default AuthComponent;
