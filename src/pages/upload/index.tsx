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
import Layout from "@/Layout/Index";
import { validateFileSize, validateFileType } from "@/app/service/fileValidatorService";
import { getFileSize } from "@/app/validators/DocumentFileSizeValidator";
function Upload() {
    const toast = useToast();
    const { data: session } = useSession();
    const accessToken = session?.token;
    // console.log(accessToken);
    const [selectedFile, setSelectedFile] = useState<any>("");
    const [selectedType, setSelectedType] = useState("");
    function handleSelectChange(event: any) {
        setSelectedType(event.target.value);
        toast({
            title: event.target.value,
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    }

    const handleChange = async (element: HTMLInputElement) => {
        const file = element.files;
        // @ts-ignore
        const validFileType = await validateFileType(FileService.getFileExtension(file[0]?.name));
        // @ts-ignore
        const validFileSize = await validateFileSize(file[0]?.size);
        if (!validFileSize.isValid) {
            toast({
                title: validFileSize.errorMessage,
                duration: 5000,
                status: "error",
                isClosable: true,
                position: "top",
            });
            return;
        }

        if (!validFileType.isValid) {
            toast({
                title: validFileType.errorMessage,
                duration: 5000,
                status: "error",
                isClosable: true,
                position: "top",
            });
            return;
        }
        setSelectedFile(file);
    };

    const handleFileUpload = async (e: any) => {
        e.preventDefault();
        const file = selectedFile;
        if (!file) {
            return;
        }
        // havt to pass acces token need to auth the user btw
        const fileService = new FileService(file[0], selectedType, accessToken as string);
        const fileUploadResponse = await fileService.uploadFile();
        fileUploadResponse;
        toast({
            title: fileUploadResponse.success ? "File Uploaded" : "Upload Failed",
            description: fileUploadResponse.message,
            status: fileUploadResponse.success ? "success" : "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
        console.log(selectedFile);
        console.log(JSON.stringify(selectedFile));

        // setSelectedFile("");s
        // console.log(selectedFile);
        // console.log(JSON.stringify(selectedFile[0]));
    };

    const fileSize = getFileSize(selectedFile[0]?.size as number);
    const fileName = selectedFile[0]?.name;
    return (
        <>
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
                            required
                            value={selectedType}
                            onChange={handleSelectChange}
                            id="filetype"
                            name="filetype"
                            autoComplete="dbf"
                            placeholder="Select File Type"
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
                            mt={"5"}
                            fontSize="sm"
                            fontWeight="md"
                            color={useColorModeValue("gray.700", "gray.50")}
                        >
                            File info
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

                                        {/* <Text pl={1}>or drag and drop</Text> */}
                                    </Flex>
                                    <Text
                                        fontSize="lg"
                                        color={useColorModeValue("gray.500", "gray.50")}
                                    >
                                        {selectedFile ? fileName : "Please Select A file to upload"}
                                    </Text>
                                    <Text
                                        fontSize="lg"
                                        color={useColorModeValue("gray.500", "gray.50")}
                                    >
                                        {selectedFile ? fileSize : ""}
                                    </Text>
                                </Stack>
                            </chakra.label>
                        </Flex>
                    </FormControl>
                    <Box
                        px={{ base: 4, sm: 6 }}
                        py={3}
                        // bg={useColorModeValue("gray.50", "gray.900")}
                        textAlign="right"
                    >
                        <Button
                            // type="submit"
                            disabled={!selectedType}
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
        </>
    );
}
Upload.PageLayout = Layout;
export default Upload;
