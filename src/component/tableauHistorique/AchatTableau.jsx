import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: "white",
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filtrerDonnees(donnees, recherche) {
  const requete = recherche.toLowerCase().trim();
  return donnees.filter((element) =>
    Object.keys(donnees[0]).some((cle) => {
      const valeur = element[cle];
      if (typeof valeur === "string") {
        return valeur.toLowerCase().includes(requete);
      }
      return false;
    })
  );
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filtrerDonnees(data, payload.search);
  }

  let reponse = filtrerDonnees(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
  return reponse;
}

function AchatTableau({data}) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [historique, sethistorique] = useState([{}]);

  useEffect(() => {
    setSortedData([...data]);
    sethistorique([...data]);
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(historique, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);

    setSortedData(
      sortData(historique, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row, index) => (
    <tr key={row.transactionId}>
      <td style={{ padding: 0 }}>
        {" "}
        <Text tt={"uppercase"} p={0} m={0}>
          {row.jai.split(" ")[0]} {"->"} {row.jeveux.split(" ")[0]}
        </Text>
      </td>

      <td style={{ padding: 3 }}>
        <Text p={0} m={0}>
          {" "}
          {row.montant}{" "}
        </Text>{" "}
      </td>

      <td>
        {" "}
        <Text
          className={
            row.statut === "Annuler"
              ? "warning"
              : row.statut === "success"
              ? "validated"
              : "waiting"
          }
          p={0}
          m={0}
        >
          {row.statut}
        </Text>{" "}
      </td>

      <td>
        <Text tt={"uppercase"}> {row.OperationKind}</Text>
      </td>
    </tr>
  ));
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea
      sx={{ height: 400 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      mt={30}
    >
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        radius={"lg"}
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr className={`enteteTableau`}>
            <Th
              sorted={sortBy === "jeveux"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("jeveux")}
              color={"white"}
            >
              <Text ml={10}>Opérateurs</Text>
            </Th>
            <Th
              sorted={sortBy === "montant"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("montant")}
              color={"white"}
            >
              <Text ta={"center"}>Montant</Text>
            </Th>
            <Th
              sorted={sortBy === "statut"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("statut")}
              style={{ textAlign: "center" }}
              color={"white"}
            >
              Etat
            </Th>

            <th>
              <Text weight={500} size="sm" color={"white"}>
                Action
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={4}>
                <Text weight={500} align="center">
                  Pas d'opérations
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default AchatTableau;
