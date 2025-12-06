import React, { useEffect, useReducer, useRef } from "react";
import type { Mood, Pet, PetAction } from "../components/PetCard/types";
import { useEventLog } from "./useEventLog";

const ENERGY_TICK_INTERVAL_MS = 5000;
const ENERGY_STEP = 5;

const getMoodByEnergy = (energy: number): Mood => {
    if (energy <= 0) {
        return "offline";
    }
    
    if (energy <= 20) {
        return "sad";
    }

    if (energy <= 60) {
        return "neutral";
    }

    return "happy";
};

interface UsePetLifecycleResult {
    pet: Pet;
    dispatch: React.Dispatch<PetAction>;
}

const petReducer = (state: Pet, action: PetAction): Pet => {
    switch (action.type) {
        case "CHEER": {
            const energyBoost = Math.min(100, state.energy + 5);
            return {
                ...state,
                energy: energyBoost,
                mood: "happy",
            };
        }
        case "FEED": {
            const newEnergy = Math.min(100, state.energy + 20);
            return {
                ...state,
                energy: newEnergy,
                mood: "happy",
            };
        }
        case "LEVEL_UP": {
            return {
                ...state,
                level: state.level + 1,
            };
        }
        case "RESET": {
            throw new Error("RESET action should be handled outside reducer");
        }
        case "TICK": {
            const newEnergy = Math.max(0, state.energy - ENERGY_STEP);
            return {
                ...state,
                energy: newEnergy,
                mood: getMoodByEnergy(newEnergy),
            };
        }
    }
};

export const usePetLifecycle = (initialPet: Pet): UsePetLifecycleResult => {
    const { addEvent } = useEventLog();
    const initialRef = useRef<Pet>(initialPet);

    const [pet, dispatchBase] = useReducer(petReducer, initialPet);

    const dispatch: React.Dispatch<PetAction> = (action) => {
        switch (action.type) {
            case "RESET": {
                addEvent(
                    `Питомец ${initialRef.current.name} сброшен к начальному состоянию`
                );
                void 0;
                break;
            }
            case "FEED":
                addEvent(`Питомец ${pet.name} накормлен`);
                break;
            case "LEVEL_UP":
                addEvent(
                    `Питомец ${pet.name} поднял уровень до ${pet.level + 1}`
                );
                break;
            case "CHEER":
                addEvent(`Питомец ${pet.name} приободрён`);
                break;
            case "TICK":
                break;
            default:
                break;
        }

        if (action.type === "RESET") {
            dispatchBase({ type: "TICK" });
        } else {
            dispatchBase(action);
        }
    };

    useEffect(() => {
        if (pet.mood === "offline") {
            return;
        }

        const id = window.setInterval(() => {
            dispatchBase({ type: "TICK" });
        }, ENERGY_TICK_INTERVAL_MS);

        return () => {
            window.clearInterval(id);
        };
    }, [pet.mood]);

    return { pet, dispatch };
};
