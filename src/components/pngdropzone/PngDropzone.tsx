import classes from "./PngDropzone.module.css";
import {Dropzone, FileWithPath, MIME_TYPES} from "@mantine/dropzone";
import {Group, rem, Text, useMantineTheme} from "@mantine/core";
import {IconCloudUpload, IconDownload, IconX} from "@tabler/icons-react";

export default function PngDropzone({onDropCallback, textureType, loading}: {
    onDropCallback: (files: FileWithPath[]) => void,
    textureType: string,
    loading: boolean
}) {
    const theme = useMantineTheme()
    return <div className={classes.wrapper}>
        <Dropzone
            loading={loading}
            onDrop={onDropCallback}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.png]}
            maxSize={10 * 1024}
        >
            <div style={{pointerEvents: 'none'}}>
                <Group justify="center">
                    <Dropzone.Accept>
                        <IconDownload
                            style={{width: rem(50), height: rem(50)}}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{width: rem(50), height: rem(50)}}
                            color={theme.colors.red[6]}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconCloudUpload style={{width: rem(50), height: rem(50)}} stroke={1.5}/>
                    </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                    <Dropzone.Accept>Самое то!</Dropzone.Accept>
                    <Dropzone.Reject>Png файл не более 10 Кб!</Dropzone.Reject>
                    <Dropzone.Idle>Загрузите новый {textureType}</Dropzone.Idle>
                </Text>
                <Text ta="center" fz="sm" mt="xs" c="dimmed">
                    Перетащите сюда файл текстуры, который вы хотите загрузить. Формат - <i>.png</i>, размер - не более
                    10
                    Кб
                </Text>
            </div>
        </Dropzone>
    </div>
}