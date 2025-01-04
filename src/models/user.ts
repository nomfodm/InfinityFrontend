export interface User {
    id: number;
    username: string;
    email: string;
    active: boolean;
    registeredAt: Date;
    textures: Textures;
    minecraftCredential: MinecraftCredential;
}

interface Textures {
    skinHash: string;
    capeHash: string;
}

interface MinecraftCredential {
    username: string;
    uuid: string;
}