import {useEffect} from "react";
import {Button, Container, Group, Image, rem, Text, Title} from "@mantine/core";
import classes from "./MainPage.module.css"
import {useNavigate} from "react-router-dom";

export default function MainPage() {
    useEffect(() => {
        document.title = "Infinity"
    }, [])

    const navigate = useNavigate();

    function handlePlay() {
        navigate("/launcher")
    }

    function handleLogin() {
        navigate("/login")
    }

    return (
        <>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Добро пожаловать на Infinity
                        </Title>
                        <Text c="dimmed" mt="md">
                            Infinity — это место, где оживают мечты. Создавайте грандиозные постройки, исследуйте бескрайние миры и сражайтесь с опасностями вместе с друзьями.
                        </Text>

                        <Group mt={30}>
                            <Button onClick={handlePlay} radius="sm" size="md" w={rem(130)} className={classes.control}>
                                Играть
                            </Button>
                            <Button onClick={handleLogin} variant="default" radius="sm" size="md" className={classes.control}>
                                Войти
                            </Button>
                        </Group>
                    </div>
                    <Image src={"/mainPageImg.png"} className={classes.image} />
                </div>
            </Container>
        </>
    )
}
