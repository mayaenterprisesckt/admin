import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputRightElement,
    InputGroup,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    passwordField?: boolean;
    // placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    type,
    passwordField,
    ...props
}) => {
    const [field, { error }] = useField(props);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    return (
        <div>
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <InputGroup size="md">
                    <Input
                        {...field}
                        {...props}
                        id={field.name}
                        placeholder={props.placeholder}
                        type={show ? "text" : `${type}`}
                    />

                    {passwordField === true ? (
                        <InputRightElement width="4.5rem">
                            <p className="cursor-pointer h-5" onClick={handleClick}>
                                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </p>
                        </InputRightElement>
                    ) : null}
                </InputGroup>
                {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        </div>
    );
};
