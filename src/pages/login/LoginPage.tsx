import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from './LoginPage.module.css';
import {useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {useAppSelector} from "../../store/hooks.ts";
import {login} from "../../http/auth.ts";
import {useEffect} from "react";

function capitalize(s: string) {
    if (!s) return ""
    return String(s[0]).toUpperCase() + String(s).slice(1);
}

export default function LoginPage() {
    const auth = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (auth.authed) {
            navigate("/pa")
        }
    })

    const navigate = useNavigate();
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },

        validate: {
            username: (value) => {
                if (!value) {
                    return "Укажите имя пользователя"
                }
            },
            password: (value) => {
                if (!value) {
                    return "Укажите свой пароль"
                }
            }
        }
    })


    async function handleSubmit() {
        const validationResult = form.validate()
        if (validationResult.hasErrors) {
            return
        }
        const values = form.getValues()
        const loginSuccessful = await login(values.username, values.password)
        if (loginSuccessful) {
            navigate("/pa")
        }
    }

    return (
        <Container size={420} my={30}>
            <Title ta="center" className={classes.title}>
                Добро пожаловать!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Нет аккаунта?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate("/register")}>
                    Создайте же его!
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Имя пользователя" placeholder="thebestplayer" required key={form.key("username")} {...form.getInputProps("username")}/>
                <PasswordInput label="Пароль" placeholder="Сюда ваш пароль" required mt="md" key={form.key("password")} {...form.getInputProps("password")}/>
                <Button loading={auth.authing} onClick={handleSubmit} fullWidth mt="xl">
                    Войти
                </Button>
                <Text c={"red"} size={"sm"} mt={"sm"}>{capitalize(auth.messageOnLoginPage)}</Text>
            </Paper>
        </Container>
    );
}