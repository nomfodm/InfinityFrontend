import {Link} from "react-router-dom";
import classes from "./InfinityLogo.module.css"
import {useMantineTheme} from "@mantine/core";

export default function InfinityLogo() {
    const theme = useMantineTheme()

    return <Link to={"/"} className={classes.linkWrapper}>
        <img src="/logo.svg" alt="logo" width={54 * theme.scale} height={54 * theme.scale} style={{display: "block"}} />
        <div style={{fontFamily: theme.other.headerTitleFont}}>Infinity</div>
    </Link>
}