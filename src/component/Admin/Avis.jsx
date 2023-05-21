import {
  ActionIcon,
  Box,
  createStyles,
  Menu,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconLock,
  IconTrash,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import AvisService from "./../../services/avis.service";

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
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Avis(props) {
  const { classes, cx } = useStyles();
  const [Listavis, setListavis] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  // Pour checker le state d'une demande
  const checkState = (state) => {
    if (state === "En attente") {
      return "attente";
    } else if (state === "Valide") {
      return "valide";
    } else {
      return "caché";
    }
  };

  useEffect(() => {
    AvisService.getAllAvis().then(
      (data) => {
        let reponse = data.data.data;
        setListavis([...reponse]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleAfficher = ()=>{
    alert('Afficher');
  }

  const handleCacher = ()=>{
   alert('Cacher');
  }

  const handleDelete = ()=>{
   alert('Delete');
   
  }

  return (
    <Box>
      <Text variant={"title"} fz={"xl"} fw={900} my={10}>
        Liste des Avis clients
      </Text>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
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
              <th>Note</th>
              <th>Message</th>
              <th>Dates</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {setListavis.length > 0 ? (
              <>
                {Listavis.map((item) => (
                  <tr key="">
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item._doc.note}</td>
                    <td>
                      <p>{item._doc.description}</p>
                    </td>
                    <td>
                      {item._doc.createdAt.split("T")[0]} à{" "}
                      {item._doc.createdAt.split("T")[1].split(".")[0]}
                    </td>
                    <td>
                      <span className={checkState(item._doc.state)}>
                        {item._doc.state.toUpperCase() === "EN ATTENTE"
                          ? "ATTENTE"
                          : item._doc.state.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon>
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item icon={<IconEye size={14} />} 
                          onClick={handleAfficher}
                          >
                            Afficher
                          </Menu.Item>
                          <Menu.Item icon={<IconEyeOff size={14} />}
                          onClick={handleCacher}
                          >
                            Blocker
                          </Menu.Item>
                          <Menu.Item icon={<IconTrash size={14} />} color="red"
                          onClick={handleDelete}
                          >
                            Supprimer
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <Text ta={"center"}>Il n'y a pas de note actuellement</Text>
              </>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}

export default Avis;
