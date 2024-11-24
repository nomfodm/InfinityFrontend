import {Button, Flex, Group, Modal, Paper, rem, Text, TextInput, useMantineTheme} from "@mantine/core";
import ReactSkinview3d from "react-skinview3d";
import {getTextureURL} from "../../../utils/textures.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {useEffect, useState} from "react";
import {setMessageOnLoginPage} from "../../../store/auth/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {newNickname, uploadCape, uploadSkin} from "../../../http/user.ts";
import {me} from "../../../http/auth.ts";
import {useDisclosure} from "@mantine/hooks";
import {FileWithPath} from "@mantine/dropzone";
import PngDropzone from "../../pngdropzone/PngDropzone.tsx";

export default function PersonalAccountMain() {
    const auth = useAppSelector((state) => state.auth)
    const usernameForm = useForm({
        mode: "uncontrolled",
        initialValues: {
            newNickname: ""
        },
        validate: {
            newNickname: (value) => {
                if (value.length === 0) {
                    return "Укажите никнейм"
                }
            }
        }
    })

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
            if (!auth.authed) {
                dispatch(setMessageOnLoginPage("Для начала войдите в аккаунт"))
                navigate("/login")
                return
            }
            document.title = `Личный кабинет ${import.meta.env.VITE_TITLE_SUFFIX}`

        }, [auth.authed, dispatch, navigate])

    useEffect(() => {
        usernameForm.setInitialValues({"newNickname": auth.user!.minecraftCredential.username})
        usernameForm.setValues({"newNickname": auth.user!.minecraftCredential.username})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [usernameFormStatusMessage, setUsernameFormStatusMessage] = useState<string>("123")
    const theme = useMantineTheme()

    async function handleChangeNickname() {
        const validationResult = usernameForm.validate()
        if (validationResult.hasErrors) {
            return
        }

        if (usernameForm.getValues().newNickname === auth.user!.minecraftCredential.username) {
            usernameForm.setErrors({newNickname: "Нужно поменять никнейм и только потом применять!"})
            return
        }

        const status = await newNickname(usernameForm.getValues().newNickname)
        setUsernameFormStatusMessage(status)

        await me()
    }

    const [skinModalOpened, skinModalHandlers] = useDisclosure(false);
    const [capeModalOpened, capeModalHandlers] = useDisclosure(false);

    const [skinUploading, setSkinUploading] = useState(false);
    const [capeUploading, setCapeUploading] = useState(false);

    async function handleSkinUpload(files: FileWithPath[]) {
        setSkinUploading(true)
        await uploadSkin(files)
        await me()
        skinModalHandlers.close()
        setSkinUploading(false)
    }

    async function handleCapeUpload(files: FileWithPath[]) {
        setCapeUploading(true)
        await uploadCape(files)
        await me()
        capeModalHandlers.close()
        setCapeUploading(false)
    }

    return <>
        <Modal withCloseButton={false} opened={skinModalOpened} onClose={skinModalHandlers.close}>
            <PngDropzone loading={skinUploading} onDropCallback={handleSkinUpload} textureType={"скин"} />
        </Modal>
        <Modal withCloseButton={false} opened={capeModalOpened} onClose={capeModalHandlers.close}>
            <PngDropzone loading={capeUploading} onDropCallback={handleCapeUpload} textureType={"плащ"} />
        </Modal>
        {auth.authed && (
            <Flex wrap={"wrap"} gap={"sm"}>
                <Flex flex={"1 1 0"} gap={"sm"} direction={"column"}>
                    <Paper p={"sm"} withBorder>
                        <Group justify="space-between" mb="xs" bd={{}} style={{borderBottom: `rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`}}>
                            <Text fw={500}>Никнейм на сервере</Text>
                        </Group>

                        <TextInput required key={usernameForm.key("newNickname")} {...usernameForm.getInputProps("newNickname")}/>

                        <Text fz={"xs"} c={"dimmed"}>Здесь никнейм, который у вас установлен сейчас. Если необходимо, отредатируйте его и нажмите "Применить".</Text>

                        <Button onClick={handleChangeNickname} color="blue" fullWidth mt="md" radius="sm">
                            Применить
                        </Button>

                        {usernameFormStatusMessage !== "123" && <Text mt={"xs"} fz={"sm"} c={usernameFormStatusMessage ? "red" : "green"}>{usernameFormStatusMessage ? "Произошла ошибка: " + usernameFormStatusMessage : "Никнейм применён!"}</Text>}
                    </Paper>
                </Flex>
                <Paper flex={"0 1 0"} p={"sm"} withBorder>
                    <Flex direction={"column"} gap={rem(10)} w={rem(300)}>
                        <ReactSkinview3d width={300 * theme.scale} height={300 * theme.scale}
                                         skinUrl={getTextureURL(auth.user!.textures.skinHash)}
                                         capeUrl={auth.user!.textures.capeHash === null ? undefined : getTextureURL(auth.user!.textures.capeHash)}
                        />
                        <Button onClick={skinModalHandlers.open} variant={"filled"}>Загрузить скин</Button>
                        <Button onClick={capeModalHandlers.open} variant={"outline"}>Загрузить плащ</Button>
                    </Flex>
                </Paper>
            </Flex>
        )}
    </>;
}