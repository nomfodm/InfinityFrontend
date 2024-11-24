/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_BASE_URL: string
    readonly VITE_STORAGE_BASE_URL: string
    readonly VITE_TITLE_SUFFIX: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
