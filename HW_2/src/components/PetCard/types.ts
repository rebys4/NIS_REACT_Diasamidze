export type Mood = "happy" | "neutral" | "sad" | "offline";

export interface Pet {
    id: string;
    name: string;
    species: string;
    mood: Mood;
    energy: number;
    level: number;
    avatar: string;
}


export type PetActionType = "FEED" | "LEVEL_UP" | "CHEER" | "RESET" | "TICK";

export interface PetAction {
    type: PetActionType;
}