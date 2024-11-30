import {
    Menu,
    Group,
    Burger,
    Container,
    UnstyledButton,
    Text,
    Avatar,
    rem, Button, Collapse, Divider, Box, Space
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {
    IconChevronDown,
    IconLogin2, IconLogout,
    IconSettings, IconUserPlus
} from '@tabler/icons-react';
import classes from './Header.module.css';
import InfinityLogo from "../infinitylogo/InfinityLogo.tsx";
import {useLayoutEffect, useState} from "react";
import cx from "clsx";
import {checkAuth, logout} from "../../http/auth.ts";
import {useAppSelector} from "../../store/hooks.ts";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {ThemeToggleButton} from "../themetogglebutton/ThemeToggleButton.tsx";
import {getTextureAvatarURL} from "../../utils/textures.ts";

const links = [
    {link: '/about', label: 'О нас'},
    {link: "/launcher", label: 'Лаунчер'},
];
export default function Header() {
    useLayoutEffect(() => {
        async function wrapper() {
            await checkAuth();
        }

        wrapper()
    }, [])

    const [opened, {toggle, close}] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const auth = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    function handleSettings() {
        navigate("/pa")
        close()
    }

    function handleLogin() {
        navigate("/login")
        close()
    }

    function handleRegister() {
        navigate("/register")
        close()
    }

    async function handleLogout() {
        await logout()
    }

    const navItems = links.map((link) => {
        return (
            <Link
                key={link.label}
                to={link.link}
                className={classes.link}
                onClick={close}
            >
                {link.label}
            </Link>
        );
    });
    const userMenu = () => {
        const user = auth.user!;
        return <>
            <Menu
                width={260}
                position="bottom-end"
                transitionProps={{transition: 'pop-top-right'}}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton
                        className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                    >
                        <Group gap={7}>
                            <Avatar src={getTextureAvatarURL(user.textures.skinHash)} alt={user.username} radius="xl"
                                    size={24}/>
                            <div style={{flex: 1}}>
                                <Text fw={500} size="sm" lh={1} mr={3}>
                                    {user.username}
                                </Text>
                                {user.minecraftCredential.username !== user.username && <Text c="dimmed" size="xs">
                                    {user.minecraftCredential.username}
                                </Text>}
                            </div>
                            <IconChevronDown style={{width: rem(12), height: rem(12)}} stroke={1.5}/>
                        </Group>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Управление</Menu.Label>
                    <Menu.Item
                        leftSection={
                            <IconSettings style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
                        }
                        onClick={handleSettings}
                    >
                        Личный кабинет
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconLogout style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
                        }
                        color={"red"}
                        onClick={handleLogout}
                    >
                        Выйти
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    }
    const userMenuMobile = () => {
        const user = auth.user!;
        return <>
            <Group gap={7}>
                <Avatar src={getTextureAvatarURL(user.textures.skinHash)} alt={user.username} radius="xl"
                        size={24}/>
                <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.username}
                </Text>
            </Group>
            <Box
                style={{marginTop: rem(10)}}
                onClick={handleSettings}
                className={classes.link}
            >
                <IconSettings style={{width: rem(19), height: rem(19)}} stroke={1.5}/>
                Личный кабинет
            </Box>
            <Box
                onClick={logout}
                className={cx(classes.link, classes.linkRed)}
            >
                <IconLogout style={{width: rem(16), height: rem(16)}} stroke={1.5}/>
                Выйти
            </Box>
        </>
    }

    return (
        <>
            <header className={classes.header}>
                <Container size="lg">
                    <div className={classes.inner}>
                        <InfinityLogo/>
                        <Group gap={5} visibleFrom="sm">
                            {navItems}
                            {auth.authed && userMenu()}
                            {!auth.authed &&
                                <Button loading={auth.authing} size={"xs"} onClick={handleLogin}
                                        leftSection={<IconLogin2 size={18}/>}
                                        variant="filled">
                                    Войти
                                </Button>
                            }
                            <ThemeToggleButton/>
                        </Group>
                        <Group gap={5} hiddenFrom="sm">
                            <ThemeToggleButton/>
                            <Burger opened={opened} onClick={toggle} size="sm"/>
                        </Group>
                    </div>
                </Container>
            </header>
            <Collapse hiddenFrom="sm" className={classes.mobileNavigation} in={opened}>
                <Container size="xs">
                    <Space h={10}/>
                    {navItems}
                    <Divider my={"md"}/>
                    {auth.authed && userMenuMobile()}
                    {!auth.authed &&
                        <Group gap={10}>
                            <Button loading={auth.authing} onClick={handleLogin}
                                    leftSection={<IconLogin2 size={18}/>} variant="filled">
                                Войти
                            </Button>
                            <Button loading={auth.authing} onClick={handleRegister}
                                    leftSection={<IconUserPlus size={18}/>}
                                    variant="outline">
                                Зарегистрироваться
                            </Button>
                        </Group>
                    }
                    <Space h={15}/>
                </Container>
            </Collapse>
            <Space h={10}/>
            <Outlet/>
        </>
    );
}