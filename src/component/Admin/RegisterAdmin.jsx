import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Button,
  Stack,
  Grid,
  Box,
  createStyles,
  Card,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconLock, IconMail, IconUser } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import Chargement from "../../component/Chargement";
import { verifyEmail } from "../../utils/fonctions";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  logo: {
    marginBottom: "1%",
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
  partieNeutre: {
    backgroundColor: "#20986e",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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
  boxStyle: {
    width: "70%",
    [theme.fn.smallerThan("md")]: {
      width: "80%",
    },
  },
}));

// const verifyEmail = (email)=> {
//   var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   return regex.test(email);
// }
function RegisterAdmin(props) {
  const errRef = useRef();
  const [user, setUser] = useState({ valeur: "", erreur: false });
  const [pwd, setPwd] = useState({ valeur: "", erreur: false });
  const [mail, setMail] = useState({ valeur: "", erreur: false });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const [condition, setcondition] = useState({ valeur: false, erreur: false });
  const navigation = useNavigate();
  const { classes, cx } = useStyles();
  const [type, toggle] = useToggle(["register", "login"]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (e) => {
    setvisible(true)
    e.preventDefault();
    if (user.valeur && user.valeur !== "") {
      if (mail.valeur && mail.valeur !== "" && verifyEmail(mail.valeur)) {
        if (pwd.valeur && pwd.valeur.length >= 8) {
         
            setvisible(true);
            authService
              .registerAdmin(user.valeur, mail.valeur, pwd.valeur)
              .then(
                (data) => {
                  if (data.status === 200 || data.state === "success") {
                    setvisible(false);
                   setMail({ valeur: "", erreur: false });
                   setPwd({ valeur: "", erreur: false });
                   setUser({ valeur: "", erreur: false });
                  } else {
                    setvisible(false);
                    setErrMsg(data.message);
                  }
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();

                  setvisible(false);
                  setErrMsg(resMessage);
                }
              );
        } else {
          setvisible(false);
          setPwd({ ...pwd, erreur: "Veuillez entrer un mot de passe valide" });
        }
      } else {
        setvisible(false);
        setMail({ ...mail, erreur: "Veuillez entrer un mail valide" });
      }
    } else {
      setvisible(false);
      setUser({ ...user, erreur: "Veuillez entrer un nom d'utilisateur" });
    }
  };

  return (
    <div>
      {/* LAZY LOAD */}
      <Chargement visible={visible} />
      <Grid>
        {/* Partie une */}
        <Grid.Col
          md={8}
          order={2}
          orderMd={1}
          mx={"auto"}
        >
          <Card style={{ width: "70%" }} p={50}>
            <Text size={20} weight={900} ta={"center"}>
              Créer un compte pour Administrateur
            </Text>
            <Text size={"xs"} mb={"8%"} ta={"center"}>
              Une fois le compte créé l'administrateur recevra un mail
            </Text>
            <Text
              ta={"center"}
              c={"red"}
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </Text>
            <form>
              <Stack>
                <TextInput
                  icon={
                    <IconUser
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  radius="32px"
                  variant={"filled"}
                  placeholder="Nom d'utilisateur administrateur"
                  value={user.valeur}
                  onChange={(event) =>
                    setUser({
                      valeur: event.currentTarget.value,
                      erreur: false,
                    })
                  }
                  error={user.erreur && <>{user.erreur}</>}
                />

                <TextInput
                  radius="32px"
                  icon={
                    <IconMail
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  required
                  size={"sm"}
                  placeholder="exemple@zamodi.com"
                  variant={"filled"}
                  value={mail.valeur}
                  onChange={(event) =>
                    setMail({
                      valeur: event.currentTarget.value,
                      erreur: false,
                    })
                  }
                  error={mail.erreur && <>{mail.erreur}</>}
                />

                <PasswordInput
                  radius="32px"
                  size={"sm"}
                  icon={
                    <IconLock
                      size={20}
                      color={"#20986e"}
                      className={classes.lesIcones}
                    />
                  }
                  required
                  placeholder="Your password"
                  variant={"filled"}
                  value={pwd.valeur}
                  onChange={(event) =>
                    setPwd({ valeur: event.currentTarget.value, erreur: false })
                  }
                  error={pwd.erreur && <>{pwd.erreur}</>}
                />
              </Stack>

              <Button
                size="xs"
                fw={"xs"}
                // type="submit"
                radius={"lg"}
                className={classes.loginButton}
                onClick={handleSubmit}
              >
                {upperFirst("Créer le compte")}
              </Button>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default RegisterAdmin;
