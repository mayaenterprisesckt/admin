import type { NextPage } from "next";
import React, { SyntheticEvent, useState } from "react";
import {
    chakra,
    GridItem,
    Stack,
    FormControl,
    FormLabel,
    VisuallyHidden,
    Select,
    Text,
    Box,
    Flex,
    Icon,
    useColorModeValue,
    Button,
    useToast,
} from "@chakra-ui/react";
import FileService from "@/app/service/fileService";
import { useSession } from "next-auth/react";
import IndexLayout from "../../components/Layout/Index";

const Settings: NextPage = () => {
    const toast = useToast();
    const { data: session } = useSession();
    const accessToken = session?.token;
    // console.log(accessToken);
    const [selectedFile, setSelectedFile] = useState<any>("");
    const [selectedClient, setSelectedClient] = useState("");
    function handleSelectChange(event: any) {
        setSelectedClient(event.target.value);
        toast({
            title: event.target.value,

            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
    }
    const handleChange = async (element: HTMLInputElement) => {
        const file = element.files;
        setSelectedFile(file);
    };

    const handleFileUpload = async (e: any) => {
        e.preventDefault();

        const file = selectedFile;
        if (!file) {
            return;
        }
        // const validFileType = await validateFileType(FileService.getFileExtension(file[0].name));

        // if (!validFileType.isValid) {
        //     setUploadFormError(validFileType.errorMessage);
        //     return;
        // }
        // if (uploadFormError && validFileType.isValid) {
        //     setUploadFormError("");
        // }

        // havt to pass acces token need to auth the user btw
        const fileService = new FileService(file[0], selectedClient, accessToken as string);
        const fileUploadResponse = await fileService.uploadFile();
        fileUploadResponse;
        toast({
            title: fileUploadResponse.success ? "File Uploaded" : "Upload Failed",
            description: fileUploadResponse.message,
            status: fileUploadResponse.success ? "success" : "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });

        setSelectedFile("");
    };
    return (
        <IndexLayout>
            {/* <FileUpload /> */}
            <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
                <chakra.form>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                        <FormLabel
                            htmlFor="country"
                            fontSize="sm"
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                        >
                            FILE TYPE
                        </FormLabel>
                        <Select
                            isRequired
                            value={selectedClient}
                            onChange={handleSelectChange}
                            id="filetype"
                            name="filetype"
                            autoComplete="dbf"
                            placeholder="Select option"
                            mt={1}
                            focusBorderColor="brand.400"
                            shadow="sm"
                            size="sm"
                            w="full"
                            rounded="md"
                        >
                            <option value="WBR1">WBR1</option>
                            <option value="WBR2">WBR2</option>
                            <option value="WBR3">WBR3</option>
                        </Select>
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
                            borderColor={useColorModeValue("gray.300", "gray.500")}
                            borderStyle="dashed"
                            rounded="md"
                        >
                            <Stack spacing={1} textAlign="center">
                                <Icon
                                    mx="auto"
                                    boxSize={12}
                                    color={useColorModeValue("gray.400", "gray.500")}
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
                                    color={useColorModeValue("gray.600", "gray.400")}
                                    alignItems="baseline"
                                >
                                    <chakra.label
                                        htmlFor="file-upload"
                                        cursor="pointer"
                                        rounded="md"
                                        fontSize="md"
                                        color={useColorModeValue("brand.600", "brand.200")}
                                        pos="relative"
                                        _hover={{
                                            color: useColorModeValue("brand.400", "brand.300"),
                                        }}
                                    >
                                        <span>Upload a file</span>
                                        <VisuallyHidden>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                onChange={(e: SyntheticEvent) =>
                                                    handleChange(
                                                        e.currentTarget as HTMLInputElement
                                                    )
                                                }
                                            />
                                        </VisuallyHidden>
                                    </chakra.label>

                                    <Text pl={1}>or drag and drop</Text>
                                </Flex>
                                <Text
                                    fontSize="xs"
                                    color={useColorModeValue("gray.500", "gray.50")}
                                >
                                    PNG, JPG, GIF up to 10MB
                                </Text>
                            </Stack>
                        </Flex>
                    </FormControl>
                    <Box
                        px={{ base: 4, sm: 6 }}
                        py={3}
                        bg={useColorModeValue("gray.50", "gray.900")}
                        textAlign="right"
                    >
                        <Button
                            // type="submit"
                            colorScheme="green"
                            _focus={{ shadow: "" }}
                            fontWeight="md"
                            onClick={handleFileUpload}
                        >
                            UPLOAD
                        </Button>
                    </Box>
                </chakra.form>
            </Box>
        </IndexLayout>
    );
};

export default Settings;
