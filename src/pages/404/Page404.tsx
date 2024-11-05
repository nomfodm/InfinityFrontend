import { Container, Title, Text, Button, Group } from '@mantine/core';
import classes from './404.module.css';
import Svg404 from "./Svg404.tsx";
import {useNavigate} from "react-router-dom";

export function Page404() {
    const navigate = useNavigate();
    return (
        <Container className={classes.root}>
            <div className={classes.inner}>
                <Svg404 className={classes.image} />
                <div className={classes.content}>
                    <Title className={classes.title}>Здесь ничего нет</Title>
                    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                        Страница, на которую вы хотите попасть, не существует. Вы просто могли немного опечататься в строке адреса, или
                        страницу переместили на другой URL. Если вы думаете, что это ошибка, сообщите администратору.
                    </Text>
                    <Group justify="center">
                        <Button onClick={() => navigate("/")} size="md">Отправиться на главную</Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}