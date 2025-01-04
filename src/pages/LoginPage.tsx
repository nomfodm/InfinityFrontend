import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button, Checkbox,
} from '@mantine/core';
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {FormEvent, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useLogin} from "../hooks/useLogin.ts";
import {ErrorResponse} from "../models/error.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {authSliceActions} from "../store/auth/authSlice.ts";

function capitalize(s: string) {
    if (!s) return ""
    return String(s[0]).toUpperCase() + String(s).slice(1);
}

export default function LoginPage() {
    const login = useLogin()

    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<string>("")

    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";

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

    const persist = useAppSelector(state => state.auth.persist)
    const dispatch = useAppDispatch()

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist]);


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErr("")

        const validationResult = form.validate()
        if (validationResult.hasErrors) {
            setLoading(false);
            return
        }
        const {username, password} = form.getValues()

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            await login(username, password)

            form.reset()

            if (from == "/") {
                navigate("/pa", {replace: true})
                return
            }
            navigate(from, {replace: true});
        } catch (e) {
            const err = e as AxiosError
            if (!err?.response) {
                setErr("Нет ответа от сервера")
                setLoading(false);
                return
            }
            const error = err.response.data as ErrorResponse
            setErr(error.detail)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container size={420} my={30}>
            <Title ta="center" fw={900}>
                Добро пожаловать!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Нет аккаунта?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate("/register")}>
                    Создайте же его!
                </Anchor>
            </Text>

            <form onSubmit={handleSubmit}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Имя пользователя" placeholder="thebestplayer" required
                               key={form.key("username")} {...form.getInputProps("username")} autoFocus/>
                    <PasswordInput label="Пароль" placeholder="Сюда ваш пароль" required mt="md"
                                   key={form.key("password")} {...form.getInputProps("password")}/>
                    <Checkbox
                        mt={"md"}
                        defaultChecked={persist}
                        onChange={() => dispatch(authSliceActions.setPersist(!persist))}
                        label="Запомнить меня"
                    />
                    <Button type={"submit"} loading={loading} fullWidth mt="xl">
                        Войти
                    </Button>
                    <Text c={"red"} size={"sm"} mt={"sm"}>{capitalize(err)}</Text>
                </Paper>
            </form>
        </Container>
    );
}