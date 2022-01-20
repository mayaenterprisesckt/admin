import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
// Chakra imports
import { Avatar, Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "@/components/Card/Card";
import CardBody from "@/components/Card/CardBody";
import CardHeader from "@/components/Card/CardHeader";
// Assets
const IndexLayout = dynamic(() => import("../../components/layout"));

const Settings: NextPage = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const emailColor = useColorModeValue("gray.400", "gray.300");

    return (
        <IndexLayout>
            <Flex direction="column">
                <Box
                    // bgImage={ProfileBgImage}
                    w="100%"
                    h="300px"
                    borderRadius="25px"
                    bgPosition="50%"
                    bgRepeat="no-repeat"
                    // position="relative"
                    display="flex"
                    justifyContent="center"
                >
                    <Flex
                        direction={{ sm: "column", md: "row" }}
                        mx="1.5rem"
                        maxH="130px"
                        w={{ sm: "90%", xl: "95%" }}
                        justifyContent={{ sm: "center", md: "space-between" }}
                        align="center"
                        backdropFilter="saturate(200%) blur(50px)"
                        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
                        p="24px"
                        borderRadius="20px"
                    >
                        <Flex
                            align="center"
                            mt={{ sm: "20px", md: "32px" }}
                            mr={{ sm: 20 }}
                            direction={{ sm: "column", md: "row" }}
                            w={{ sm: "100%" }}
                            textAlign={{ sm: "center", md: "start" }}
                        >
                            <Avatar
                                me={{ md: "22px" }}
                                // src={avatar4}
                                w="80px"
                                h="80px"
                                borderRadius="15px"
                            />
                            <Flex
                                direction="column"
                                maxWidth="100%"
                                my={{ sm: "14px" }}
                                ml={{ base: "20px" }}
                            >
                                <Text
                                    fontSize={{ sm: "lg", lg: "xl" }}
                                    color={textColor}
                                    fontWeight="bold"
                                    ms={{ sm: "8px", md: "0px" }}
                                >
                                    Esthera Jackson
                                </Text>
                                <Text
                                    fontSize={{ sm: "sm", md: "md" }}
                                    color={emailColor}
                                    fontWeight="semibold"
                                >
                                    esthera@simmmple.com
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>

                <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
                    <Card p="16px">
                        <CardHeader p="12px 5px" mb="12px">
                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Platform Settings
                            </Text>
                        </CardHeader>
                        <CardBody px="5px">hmmmmm</CardBody>
                    </Card>
                    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
                        <CardHeader p="12px 5px" mb="12px">
                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Profile Information
                            </Text>
                        </CardHeader>
                        <CardBody px="5px">hmmmm</CardBody>
                    </Card>
                    <Card p="16px">
                        <CardHeader p="12px 5px" mb="12px">
                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                Conversations
                            </Text>
                        </CardHeader>
                        <CardBody px="5px">hmmmmm</CardBody>
                    </Card>
                </Grid>
            </Flex>
        </IndexLayout>
    );
};

export default Settings;
