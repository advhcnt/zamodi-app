import {
  ActionIcon,
  Card,
  Container,
  Menu,
  Text,
  TextInput,
  Box,
  Grid,
  Select,
  Button,
  Image,
} from "@mantine/core";
import React from "react";
import { Group } from "@mantine/core";
import { IconArrowLeft, IconArrowsLeftRight, IconChevronDown } from "@tabler/icons";
import { IconArrowRight } from "@tabler/icons";
import mtnLogo from "./../assets/momo.png";
import moovLogo from "./../assets/flooz.png";
import sbinLogo from "./../assets/celtiis.png";

function ResumeComponent(props) {
  return (
    <Box>
      <Grid style={{ justifyContent: "space-around" }}>
        <Grid.Col md={8}>
          <Card shadow="lg" p="lg" radius="md" withBorder>
            <Card.Section
              withBorder
              inheritPadding
              py="xs"
              className="ArrierePlan"
            >
              <Box>
                <Text fz={"md"} weight={500} ta={"center"} c={"white"}>
                  Resumé
                </Text>
              </Box>
            </Card.Section>

            <Card.Section mb={50}>
              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={25}>
                  Montant{" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={25}>
                  {" "}
                  5000{" "}
                </Text>
              </Group>

              <Group
                position={"apart"}
                my={20}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Text fz="lg" fx={900} c={"black"} mx={25} my={10}>
                  J'ai :{" "}
                </Text>
                <Group mx={25} my={10}>
                  <Image
                    src={mtnLogo}
                    style={{ height: "35%", width: "35%" }}
                    alt={"Logo mtn"}
                  />
                  <Text fz="lg" c={"black"}>
                    MTN{" "}
                  </Text>
                </Group>
              </Group>

              <Group position={"apart"} my={20}>
                <Text fz="lg" fx={900} c={"black"} mx={25}>
                  Je veux{" "}
                </Text>
                <Group mx={25}>
                  <Image
                    src={sbinLogo}
                    style={{ height: "35%", width: "35%" }}
                    alt={"Logo mtn"}
                  />
                  <Text fz={"lg"} c={"black"}>
                    Celtiis{" "}
                  </Text>
                </Group>
              </Group>

              <Group
                position={"apart"}
                my={20}
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <Text fz="lg" fx={900} c={"black"} mx={25} my={10}>
                  Le numéro{" "}
                </Text>
                <Text fz={"lg"} c={"black"} mx={25} my={10}>
                  61000001{" "}
                </Text>
              </Group>

              <Box
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
                my={50}
              >
                <Group position={'center'} >
                  <Button size={"sm"} mr={"lg"} bg={'black'}
                  onClick={()=>props.setValide(false)}>
                     <IconArrowLeft size={20} mx={3} />{" "}Modifier
                  </Button>
                  <Button size={"sm"} mr={"lg"} className={"ArrierePlan"}>
                    Valider <IconArrowRight size={20} mx={3} />{" "}
                  </Button>
                </Group>
              </Box>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default ResumeComponent;
