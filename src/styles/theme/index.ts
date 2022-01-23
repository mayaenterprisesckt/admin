import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
// @ts-ignore
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import Button from "./components/button";
import fonts from "./fonts";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const tailwind = resolveConfig(tailwindConfig);

chakraTheme.colors.blue = tailwind.theme.colors.blue;

const customTheme = extendTheme({
    fonts,
    config,
    colors: {
        ...chakraTheme.colors,
        blue: {
            ...chakraTheme.colors.blue,
            50: chakraTheme.colors.gray[50],
            100: chakraTheme.colors.gray[100],
        },
        primaryLight: "#FFFFFF",
        lightAccent: "#00C480",
        primaryDark: "#151516",
        darkAccent: "#00C480",
        textLight: "#151516",
        textDark: "#FFFFFF",
    },
    components: {
        Button,
    },
});

export default customTheme;
