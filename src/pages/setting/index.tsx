import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
// Chakra imports
import {
    Avatar,
    Box,
    Button,
    chakra,
    Checkbox,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    GridItem,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    Select,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react";
// Custom components
import { getSession } from "next-auth/react";
import { fetcher } from "@/app/lib/fetcher";
import { InferGetServerSidePropsType } from "next";
import { FaUser } from "react-icons/fa";
// Assets
const IndexLayout = dynamic(() => import("../../components/layout"));

function Settings({ fallbackData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const textColor = useColorModeValue("gray.700", "white");
    const emailColor = useColorModeValue("gray.400", "gray.300");
    // const { data: session, status } = useSession();
    // const { data } = useSwr<any | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     fetcher,
    //     {
    //         fallbackData,
    //     }
    // );
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
                                // @ts-ignore
                                // src={session?.user?.avatar ? session?.user.avatar : null}
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
                                    {fallbackData.user.name}
                                </Text>
                                <Text
                                    fontSize={{ sm: "sm", md: "md" }}
                                    color={emailColor}
                                    fontWeight="semibold"
                                >
                                    {fallbackData.user.email}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>

                <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
                    <Box>
                        <SimpleGrid
                            display={{ base: "initial", md: "grid" }}
                            columns={{ md: 3 }}
                            spacing={{ md: 6 }}
                        >
                            <GridItem colSpan={{ md: 1 }}>
                                <Box px={[4, 0]}>
                                    <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                        Profile
                                    </Heading>
                                    <Text
                                        mt={1}
                                        fontSize="sm"
                                        color={useColorModeValue("gray.600", "gray.400")}
                                    >
                                        This information will be displayed publicly so be careful
                                        what you share.
                                    </Text>
                                </Box>
                            </GridItem>
                            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                                <chakra.form
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        bg={useColorModeValue("white", "gray.700")}
                                        spacing={6}
                                        p={{ sm: 6 }}
                                    >
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Website
                                                </FormLabel>
                                                <InputGroup size="sm">
                                                    <InputLeftAddon
                                                        bg={useColorModeValue(
                                                            "gray.50",
                                                            "gray.800"
                                                        )}
                                                        color={useColorModeValue(
                                                            "gray.500",
                                                            "gay.50"
                                                        )}
                                                        rounded="md"
                                                    />
                                                    <Input
                                                        type="tel"
                                                        placeholder="www.example.com"
                                                        focusBorderColor="brand.400"
                                                        rounded="md"
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                        </SimpleGrid>

                                        <div>
                                            <FormControl id="email" mt={1}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    About
                                                </FormLabel>
                                                <Textarea
                                                    placeholder="you@example.com"
                                                    mt={1}
                                                    rows={3}
                                                    shadow="sm"
                                                    focusBorderColor="brand.400"
                                                    fontSize={{ sm: "sm" }}
                                                />
                                                <FormHelperText>
                                                    Brief description for your profile. URLs are
                                                    hyperlinked.
                                                </FormHelperText>
                                            </FormControl>
                                        </div>

                                        <FormControl>
                                            <FormLabel
                                                fontSize="sm"
                                                fontWeight="md"
                                                color={useColorModeValue("gray.700", "gray.50")}
                                            >
                                                Photo
                                            </FormLabel>
                                            <Flex alignItems="center" mt={1}>
                                                <Avatar
                                                    boxSize={12}
                                                    bg={useColorModeValue("gray.100", "gray.800")}
                                                    icon={
                                                        <Icon
                                                            as={FaUser}
                                                            boxSize={9}
                                                            mt={3}
                                                            rounded="full"
                                                            color={useColorModeValue(
                                                                "gray.300",
                                                                "gray.700"
                                                            )}
                                                        />
                                                    }
                                                />
                                                <Button
                                                    type="button"
                                                    ml={5}
                                                    variant="outline"
                                                    size="sm"
                                                    fontWeight="medium"
                                                    _focus={{ shadow: "none" }}
                                                >
                                                    Change
                                                </Button>
                                            </Flex>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel
                                                fontSize="sm"
                                                fontWeight="md"
                                                color={useColorModeValue("gray.700", "gray.50")}
                                            >
                                                Cover photo
                                            </FormLabel>
                                            <Flex
                                                mt={1}
                                                justify="center"
                                                px={6}
                                                pt={5}
                                                pb={6}
                                                borderWidth={2}
                                                borderColor={useColorModeValue(
                                                    "gray.300",
                                                    "gray.500"
                                                )}
                                                borderStyle="dashed"
                                                rounded="md"
                                            >
                                                <Stack spacing={1} textAlign="center">
                                                    <Icon
                                                        mx="auto"
                                                        boxSize={12}
                                                        color={useColorModeValue(
                                                            "gray.400",
                                                            "gray.500"
                                                        )}
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </Icon>
                                                    <Flex
                                                        fontSize="sm"
                                                        color={useColorModeValue(
                                                            "gray.600",
                                                            "gray.400"
                                                        )}
                                                        alignItems="baseline"
                                                    >
                                                        <chakra.label
                                                            htmlFor="file-upload"
                                                            cursor="pointer"
                                                            rounded="md"
                                                            fontSize="md"
                                                            color={useColorModeValue(
                                                                "brand.600",
                                                                "brand.200"
                                                            )}
                                                            pos="relative"
                                                            _hover={{
                                                                color: useColorModeValue(
                                                                    "brand.400",
                                                                    "brand.300"
                                                                ),
                                                            }}
                                                        >
                                                            <span>Upload a file</span>
                                                            <VisuallyHidden>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                />
                                                            </VisuallyHidden>
                                                        </chakra.label>
                                                        <Text pl={1}>or drag and drop</Text>
                                                    </Flex>
                                                    <Text
                                                        fontSize="xs"
                                                        color={useColorModeValue(
                                                            "gray.500",
                                                            "gray.50"
                                                        )}
                                                    >
                                                        PNG, JPG, GIF up to 10MB
                                                    </Text>
                                                </Stack>
                                            </Flex>
                                        </FormControl>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue("gray.50", "gray.900")}
                                        textAlign="right"
                                    >
                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </chakra.form>
                            </GridItem>
                        </SimpleGrid>
                    </Box>
                    <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
                        <Box py={5}>
                            <Box
                                borderTop="solid 1px"
                                borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                            ></Box>
                        </Box>
                    </Box>

                    <Box mt={[10, 0]}>
                        <SimpleGrid
                            display={{ base: "initial", md: "grid" }}
                            columns={{ md: 3 }}
                            spacing={{ md: 6 }}
                        >
                            <GridItem colSpan={{ md: 1 }}>
                                <Box px={[4, 0]}>
                                    <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                                        Personal Information
                                    </Heading>
                                    <Text
                                        mt={1}
                                        fontSize="sm"
                                        color={useColorModeValue("gray.600", "gray.400")}
                                    >
                                        Use a permanent address where you can receive mail.
                                    </Text>
                                </Box>
                            </GridItem>
                            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                                <chakra.form
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        p={[null, 6]}
                                        bg={useColorModeValue("white", "gray.700")}
                                        spacing={6}
                                    >
                                        <SimpleGrid columns={6} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[6, 3]}>
                                                <FormLabel
                                                    htmlFor="first_name"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    First name
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="first_name"
                                                    id="first_name"
                                                    autoComplete="given-name"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 3]}>
                                                <FormLabel
                                                    htmlFor="last_name"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Last name
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="last_name"
                                                    id="last_name"
                                                    autoComplete="family-name"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 4]}>
                                                <FormLabel
                                                    htmlFor="email_address"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Email address
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="email_address"
                                                    id="email_address"
                                                    autoComplete="email"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 3]}>
                                                <FormLabel
                                                    htmlFor="country"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Country / Region
                                                </FormLabel>
                                                <Select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country"
                                                    placeholder="Select option"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                >
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={6}>
                                                <FormLabel
                                                    htmlFor="street_address"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    Street address
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="street_address"
                                                    id="street_address"
                                                    autoComplete="street-address"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                                                <FormLabel
                                                    htmlFor="city"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    City
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="city"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                                <FormLabel
                                                    htmlFor="state"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    State / Province
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    autoComplete="state"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>

                                            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                                                <FormLabel
                                                    htmlFor="postal_code"
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue("gray.700", "gray.50")}
                                                >
                                                    ZIP / Postal
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    name="postal_code"
                                                    id="postal_code"
                                                    autoComplete="postal-code"
                                                    mt={1}
                                                    focusBorderColor="brand.400"
                                                    shadow="sm"
                                                    size="sm"
                                                    w="full"
                                                    rounded="md"
                                                />
                                            </FormControl>
                                        </SimpleGrid>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue("gray.50", "gray.900")}
                                        textAlign="right"
                                    >
                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </chakra.form>
                            </GridItem>
                        </SimpleGrid>
                    </Box>

                    <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
                        <Box py={5}>
                            <Box
                                borderTop="solid 1px"
                                borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                            ></Box>
                        </Box>
                    </Box>

                    <Box mt={[10, 0]}>
                        <SimpleGrid
                            display={{ base: "initial", md: "grid" }}
                            columns={{ md: 3 }}
                            spacing={{ md: 6 }}
                        >
                            <GridItem colSpan={{ md: 1 }}>
                                <Box px={[4, 0]}>
                                    <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                                        Notifications
                                    </Heading>
                                    <Text
                                        mt={1}
                                        fontSize="sm"
                                        color={useColorModeValue("gray.600", "gray.400")}
                                    >
                                        Decide which communications you&apos;d like to receive and
                                        how.
                                    </Text>
                                </Box>
                            </GridItem>
                            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                                <chakra.form
                                    method="POST"
                                    shadow="base"
                                    rounded={[null, "md"]}
                                    overflow={{ sm: "hidden" }}
                                >
                                    <Stack
                                        px={4}
                                        py={5}
                                        p={[null, 6]}
                                        bg={useColorModeValue("white", "gray.700")}
                                        spacing={6}
                                    >
                                        <chakra.fieldset>
                                            <Box
                                                as="legend"
                                                fontSize="md"
                                                color={useColorModeValue("gray.900", "gray.50")}
                                            >
                                                By Email
                                            </Box>
                                            <Stack mt={4} spacing={4}>
                                                <Flex alignItems="start">
                                                    <Flex alignItems="center" h={5}>
                                                        <Checkbox
                                                            colorScheme="brand"
                                                            id="comments"
                                                            rounded="md"
                                                        />
                                                    </Flex>
                                                    <Box ml={3} fontSize="sm">
                                                        <chakra.label
                                                            htmlFor="comments"
                                                            fontWeight="md"
                                                            color={useColorModeValue(
                                                                "gray.700",
                                                                "gray.50"
                                                            )}
                                                        >
                                                            Comments
                                                        </chakra.label>
                                                        <Text
                                                            color={useColorModeValue(
                                                                "gray.500",
                                                                "gray.400"
                                                            )}
                                                        >
                                                            Get notified when someones posts a
                                                            comment on a posting.
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                                <Flex alignItems="start">
                                                    <Flex alignItems="center" h={5}>
                                                        <Checkbox
                                                            colorScheme="brand"
                                                            id="candidates"
                                                            rounded="md"
                                                        />
                                                    </Flex>
                                                    <Box ml={3} fontSize="sm">
                                                        <chakra.label
                                                            htmlFor="candidates"
                                                            fontWeight="md"
                                                            color={useColorModeValue(
                                                                "gray.700",
                                                                "gray.50"
                                                            )}
                                                        >
                                                            Candidates
                                                        </chakra.label>
                                                        <Text
                                                            color={useColorModeValue(
                                                                "gray.500",
                                                                "gray.400"
                                                            )}
                                                        >
                                                            Get notified when a candidate applies
                                                            for a job.
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                                <Flex alignItems="start">
                                                    <Flex alignItems="center" h={5}>
                                                        <Checkbox
                                                            colorScheme="brand"
                                                            id="offers"
                                                            rounded="md"
                                                        />
                                                    </Flex>
                                                    <Box ml={3} fontSize="sm">
                                                        <chakra.label
                                                            htmlFor="offers"
                                                            fontWeight="md"
                                                            color={useColorModeValue(
                                                                "gray.700",
                                                                "gray.50"
                                                            )}
                                                        >
                                                            Offers
                                                        </chakra.label>
                                                        <Text
                                                            color={useColorModeValue(
                                                                "gray.500",
                                                                "gray.400"
                                                            )}
                                                        >
                                                            Get notified when a candidate accepts or
                                                            rejects an offer.
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Stack>
                                        </chakra.fieldset>
                                        <chakra.fieldset>
                                            <Box
                                                as="legend"
                                                fontSize="md"
                                                color={useColorModeValue("gray.900", "gray.50")}
                                            >
                                                Push Notifications
                                                <Text
                                                    fontSize="sm"
                                                    color={useColorModeValue(
                                                        "gray.500",
                                                        "gray.400"
                                                    )}
                                                >
                                                    These are delivered via SMS to your mobile
                                                    phone.
                                                </Text>
                                            </Box>
                                            <RadioGroup
                                                fontSize="sm"
                                                color={useColorModeValue("gray.700", "gray.50")}
                                                colorScheme="brand"
                                                mt={4}
                                                defaultValue="1"
                                            >
                                                <Stack spacing={4}>
                                                    <Radio spacing={3} value="1">
                                                        Everything
                                                    </Radio>
                                                    <Radio spacing={3} value="2">
                                                        Same as email
                                                    </Radio>
                                                    <Radio spacing={3} value="3">
                                                        No push notifications
                                                    </Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </chakra.fieldset>
                                    </Stack>
                                    <Box
                                        px={{ base: 4, sm: 6 }}
                                        py={3}
                                        bg={useColorModeValue("gray.50", "gray.900")}
                                        textAlign="right"
                                    >
                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            _focus={{ shadow: "" }}
                                            fontWeight="md"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </chakra.form>
                            </GridItem>
                        </SimpleGrid>
                    </Box>
                </Box>
            </Flex>
        </IndexLayout>
    );
}

export default Settings;

export const getServerSideProps: GetServerSideProps = async context => {
    const { req } = context;
    const session = await getSession({ req });
    // console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    // if (session?.user?.usertype === "DIS") {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }
    const data = await fetcher(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
        req
    );
    data;
    return {
        props: {
            fallbackData: data,
        },
    };
};
