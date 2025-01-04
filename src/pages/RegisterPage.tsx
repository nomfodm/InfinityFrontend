import {
    TextInput,
    Group,
    Title,
    Button,
    Container,
    Text,
    Anchor,
    PasswordInput, Stack, Paper
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {AxiosError} from "axios";
import {$api} from "../api/axios.ts";
import {ErrorResponse} from "../models/error.ts";
import {useLogin} from "../hooks/useLogin.ts";

function capitalize(s: string) {
    if (!s) return ""
    return String(s[0]).toUpperCase() + String(s).slice(1);
}

export default function RegisterPage() {
    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            password2: '',
        },
        validate: {
            username: (value) => {
                if (value.trim().length === 0) {
                    return true
                }

                if (value.trim().length < 5 || value.trim().length > 13) {
                    return "Длина имени пользователя не должна быть меньше 5 и не должна превышать 13 символов"
                }
            },
            email: (value) => !/^\S+@\S+$/.test(value),
            password: (value) => value.trim().length < 6,
            password2: (value) => value.trim().length < 6,
        },
    });

    const navigate = useNavigate();
    const login = useLogin();

    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setErr("")

        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            setLoading(false)
            return
        }

        const {username, password, password2, email} = form.getValues()
        if (password !== password2) {
            form.setErrors({password2: "Пароли не совпадают!"})
            setLoading(false)
            return
        }

        await new Promise(resolve => setTimeout(resolve, 500))

        try {
            await $api.post("/auth/signup", {username, password, email})
            await login(username, password)

        } catch (e) {
            const err = e as AxiosError
            if (!err?.response) {
                setErr("Нет ответа от сервера")
                setLoading(false)
                return
            }
            const error = err.response.data as ErrorResponse
            setErr(error.detail)
        } finally {
            setLoading(false)
        }

    }

    return (
        <Container size={"md"}>
            <Paper withBorder p={"md"}>
                <Title
                    order={2}
                    size="h1"
                    fw={900}
                    ta="center"
                    visibleFrom={"md"}
                >
                    Зарегистрируйтесь
                </Title>
                <Title
                    order={2}
                    size="h2"
                    fw={900}
                    ta="center"
                    hiddenFrom={"md"}
                >
                    Зарегистрируйтесь
                </Title>
                <Text size={"sm"} ta={"center"} c={"dimmed"}>Уже зарегистрированы? <Anchor size="sm"
                                                                                           component="button"
                                                                                           onClick={() => navigate("/login")}>Войдите
                    же скорее!</Anchor></Text>

                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            label="Имя пользователя"
                            placeholder="thebestplayer"
                            name="username"
                            variant="filled"
                            autoFocus
                            {...form.getInputProps('username')}
                        />
                        <TextInput
                            label="E-mail"
                            placeholder="thebestplayer@infinityserver.ru"
                            name="email"
                            variant="filled"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            label="Пароль"
                            placeholder="Сюда ваш пароль"
                            name="password"
                            variant="filled"
                            {...form.getInputProps('password')}
                        />
                        <PasswordInput
                            label="Повторите пароль"
                            placeholder="А сюда тот же пароль, что и в поле сверху"
                            name="password2"
                            variant="filled"
                            {...form.getInputProps('password2')}
                        />
                    </Stack>

                    <Group justify="center" mt="xl">
                        <Button loading={loading} type={"submit"} size="md">
                            Зарегистрироваться
                        </Button>
                    </Group>

                </form>

                <Text mt={"sm"} ta={"center"} c={"red"}>{capitalize(err)}</Text>
            </Paper>
        </Container>
    );
}