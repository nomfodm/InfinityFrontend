import {Container, rem, Tabs} from "@mantine/core";
import {IconUser} from "@tabler/icons-react";
import PersonalAccountMain from "../components/personalaccountparts/PAMain.tsx";

export default function PersonalAccount() {
    const iconStyle = {width: rem(15), height: rem(15)};

    return <>
        <Container size={"lg"}>
            <Tabs variant={"pills"} defaultValue="main">
                <Tabs.List mb={"sm"}>
                    <Tabs.Tab value="main" leftSection={<IconUser style={iconStyle}/>}>
                        Основные настройки
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="main">
                    <PersonalAccountMain/>
                </Tabs.Panel>
            </Tabs>
        </Container>
    </>
}