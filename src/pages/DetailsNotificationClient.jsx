import { Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function DetailsNotificationClient({ operation }) {
const location = useLocation();
const navigate = useNavigate();
const path = window.location.pathname;
  
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, path);
 
  useLayoutEffect(() => {
    console.log(location.pathname.split("/"));
    let path = location.pathname;
    navigate(path);
  }, []);


    return (
        <Box>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Username:
                </strong>{" "}
                {/* {operation.username} */}
                DBHCHSDCHD
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
                {/* <a
                    href={`mailto:${operation.email}`}
                    style={{ textDecoration: "none" }}
                >
                    {/* {operation.email} *
                    EMAIL
                </a> */}
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Opération:{" "}
                </strong>
                {/* {operation.OperationKind.toUpperCase()} */}
                SJKQDSJ
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Montant:
                </strong>
                {/* {operation.montant}F cfa */}
                DSFKNSDJJSND
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Réseau de départ:{" "}
                </strong>
                DSCJSD
                {/* {operation.jai.toUpperCase()} */}
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Réseau d'arriver:{" "}
                </strong>
                SDFJDSJFDJ
                {/* {operation.jeveux.toUpperCase()} */}
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Message:{" "}
                </strong>
                {/* {operation.notification} */}
                SDKNSDJKJKSD
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Description:{" "}
                </strong>
                KSQJDJSJK
                {/* {operation.Description} */}
            </Text>
            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Lecture:{" "}
                </strong>
                DS?KCNJKSDCJKSD
                {/* {!operation.readNotification ? "Non" : 'Oui'} */}
            </Text>

            <Text>
                <strong
                    style={{
                        margin: "5px 20px 5px 20px",
                    }}
                >
                    Date:
                </strong>
                CDS?NCSJKD
                {/* {operation.updatedAt.split("T")[0]} à{" "}
                {operation.updatedAt.split("T")[1].split(".")[0]} */}
            </Text>

            <Group position={"center"} my={20} >
                <Button variant="light" color="red">
                    Fermer
                </Button>
            </Group>
        </Box>
    );
}

export default DetailsNotificationClient;