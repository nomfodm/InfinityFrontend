import {Button, Flex, Group, Modal, Paper, rem, Text, TextInput, useMantineTheme} from "@mantine/core";
import ReactSkinview3d from "react-skinview3d";
import {getTextureURL} from "../../utils/textures.ts";
import {useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";
import {FileWithPath} from "@mantine/dropzone";
import PngDropzone from "../pngdropzone/PngDropzone.tsx";
import {useFetchUser} from "../../hooks/useFetchUser.ts";
import {AxiosError} from "axios";
import {ErrorResponse} from "../../models/error.ts";
import {usePrivateApi} from "../../hooks/usePrivateApi.ts";
import {useUploadSkin} from "../../hooks/useUploadSkin.ts";
import {useUploadCape} from "../../hooks/useUploadCape.ts";

export default function PersonalAccountMain() {
    const authState = useAppSelector((state) => state.auth)
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

    // const navigate = useNavigate()
    // const dispatch = useAppDispatch();

    const fetchUser = useFetchUser()
    const apiPrivate = usePrivateApi()

    useEffect(() => {
        usernameForm.setInitialValues({"newNickname": authState.user!.minecraftCredential.username})
        usernameForm.setValues({"newNickname": authState.user!.minecraftCredential.username})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [usernameFormStatusMessage, setUsernameFormStatusMessage] = useState<string>("123")
    const theme = useMantineTheme()

    async function handleChangeNickname() {
        const validationResult = usernameForm.validate()
        if (validationResult.hasErrors) {
            return
        }

        const newNickname = usernameForm.getValues().newNickname

        if (newNickname === authState.user!.minecraftCredential.username) {
            return
        }

        try {
            await apiPrivate.get("/user/nickname", {params: {"new_nickname": newNickname}})
            setUsernameFormStatusMessage("")
            await fetchUser()
        } catch (error) {
            const err = error as AxiosError
            const errorResponse = err.response!.data as ErrorResponse
            setUsernameFormStatusMessage(errorResponse.error)
        }

        await new Promise(resolve => setTimeout(resolve, 2000))
        setUsernameFormStatusMessage("123")
    }

    const [skinModalOpened, skinModalHandlers] = useDisclosure(false);
    const [capeModalOpened, capeModalHandlers] = useDisclosure(false);

    const [skinUploading, setSkinUploading] = useState(false);
    const [capeUploading, setCapeUploading] = useState(false);

    const uploadSkin = useUploadSkin()
    const uploadCape = useUploadCape()

    async function handleSkinUpload(files: FileWithPath[]) {
        setSkinUploading(true)

        await uploadSkin(files)
        await fetchUser()

        skinModalHandlers.close()

        setSkinUploading(false)
    }

    async function handleCapeUpload(files: FileWithPath[]) {
        setCapeUploading(true)

        await uploadCape(files)
        await fetchUser()

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
        {authState.user && (
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
                                         skinUrl={getTextureURL(authState.user!.textures.skinHash)}
                                         capeUrl={authState.user!.textures.capeHash === null ? undefined : getTextureURL(authState.user!.textures.capeHash)}
                        />
                        <Button onClick={skinModalHandlers.open} variant={"filled"}>Загрузить скин</Button>
                        <Button onClick={capeModalHandlers.open} variant={"outline"}>Загрузить плащ</Button>
                    </Flex>
                </Paper>
            </Flex>
        )}
    </>;
}