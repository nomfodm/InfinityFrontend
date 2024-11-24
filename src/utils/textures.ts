export function getTextureAvatarURL(hash: string): string {
    return `${import.meta.env.VITE_STORAGE_BASE_URL}/textures/avatars/${hash}`;
}

export function getTextureURL(hash: string): string {
    return `${import.meta.env.VITE_STORAGE_BASE_URL}/textures/${hash}`;
}