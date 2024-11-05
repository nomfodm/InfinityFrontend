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
import {useAppSelector} from "../../store/hooks.ts";
import {register} from "../../http/auth.ts";
import {useEffect} from "react";

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
    const authed = useAppSelector((state) => state.auth.authed)
    useEffect(() => {
        if (authed) {
            navigate("/pa")
        }
    })


    const navigate = useNavigate();

    const registerState = useAppSelector((state) => state.register)

    async function handleRegister() {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return
        }

        const values = form.getValues()
        if (values.password !== values.password2) {
            form.setErrors({password2: "Пароли не совпадают!"})
            return
        }

        await register(values.username, values.email, values.password)
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

                <Stack>
                    <TextInput
                        label="Имя пользователя"
                        placeholder="thebestplayer"
                        name="username"
                        variant="filled"
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
                    <Button loading={registerState.registering} onClick={handleRegister} size="md">
                        Зарегистрироваться
                    </Button>
                </Group>

                <Text mt={"sm"} ta={"center"} c={"red"}>{capitalize(registerState.messageOnRegisterPage)}</Text>
            </Paper>
        </Container>
    );
}