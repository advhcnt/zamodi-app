import {
  createStyles,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import React, { useState } from "react";

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

function Historique(props) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  return (
    <ScrollArea
      sx={{ height: 600 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Text variant={"title"} fz={"xl"} fw={900} my={10}>
        Historique des activités
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
            <th>Action</th>
            <td>Description</td>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr key="row.namfge">
            <td>Valididation de la demande N° 123456789</td>

            <td>
              Lorem ipsum voluptatum sequi nostrum fuga consequatur eveniet sed
              mollitia. Molestiae.
            </td>
            <td>12/12/2022</td>
          </tr>
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default Historique;
