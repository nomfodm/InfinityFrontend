import { useEffect } from "react";
import {Text} from "@mantine/core";

export default function Redirect(props: { url: string; }) {
    const { url } = props
    useEffect(() => {
        window.location.replace(url);
    }, [url]);

    return <Text fz={"xl"} ta={"center"}>Загрузка...</Text>;
}