import React, { useCallback, useRef } from "react";
import { type Pet } from "./types";
import styles from "./PetCard.module.scss";
import { ActionButton } from "../PetActions/ActionButton.styled";
import { usePetLifecycle } from "../../hooks/usePetLifeCycle";

interface PetCardProps {
    pet: Pet;
}

export const PetCard: React.FC<PetCardProps> = React.memo(({ pet }) => {
    const avatarRef = useRef<HTMLImageElement | null>(null);

    const { pet: state, dispatch } = usePetLifecycle(pet);

    const moodShadowColor =
        state.mood === "happy"
            ? "rgba(34,197,94,0.5)"
            : state.mood === "neutral"
            ? "rgba(59,130,246,0.5)"
            : state.mood === "sad"
            ? "rgba(248,113,113,0.5)"
            : "rgba(31,41,55,0.8)";

    const cardInlineStyle: React.CSSProperties = {
        boxShadow: `0 12px 30px ${moodShadowColor}`,
        opacity: state.mood === "offline" ? 0.5 : 1,
    };

    const energyFillStyle: React.CSSProperties = {
        width: `${state.energy}%`,
        background:
            state.energy > 60
                ? "linear-gradient(90deg,#22c55e,#4ade80)"
                : state.energy > 20
                ? "linear-gradient(90deg,#38bdf8,#6366f1)"
                : "linear-gradient(90deg,#f97373,#fb7185)",
    };

    const handleFeed = useCallback(() => {
        if (state.mood === "offline") return;
        dispatch({ type: "FEED" });
        if (avatarRef.current) {
            avatarRef.current.style.transform = "scale(1.05)";
            window.setTimeout(() => {
                if (avatarRef.current) {
                    avatarRef.current.style.transform = "scale(1)";
                }
            }, 150);
        }
    }, [dispatch, state.mood]);

    const handleLevelUp = useCallback(() => {
        if (state.mood === "offline") return;
        dispatch({ type: "LEVEL_UP" });
    }, [dispatch, state.mood]);

    const handleCheer = useCallback(() => {
        if (state.mood === "offline") return;
        dispatch({ type: "CHEER" });
    }, [dispatch, state.mood]);

    const handleReset = useCallback(() => {
        dispatch({ type: "RESET" });
    }, [dispatch]);

    return (
        <div className={styles.card} style={cardInlineStyle}>
            <div className={styles.header}>
                <img
                    ref={avatarRef}
                    className={styles.avatar}
                    src={state.avatar}
                    alt={state.name}
                />
                <div className={styles.titleBlock}>
                    <div className={styles.name}>{state.name}</div>
                    <div className={styles.species}>{state.species}</div>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Уровень</span>
                    <span className={styles.statValue}>{state.level}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Энергия</span>
                    <span className={styles.statValue}>{state.energy}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Настроение</span>
                    <span className={styles.statValue}>{state.mood}</span>
                </div>
            </div>

            <div className={styles.energyBar}>
                <div className={styles.energyFill} style={energyFillStyle} />
            </div>

            <div className={styles.actions}>
                <ActionButton
                    $variant="primary"
                    onClick={handleFeed}
                    $disabled={state.mood === "offline"}
                >
                    Feed
                </ActionButton>
                <ActionButton
                    $variant="secondary"
                    onClick={handleLevelUp}
                    $disabled={state.mood === "offline"}
                >
                    Level up
                </ActionButton>
                <ActionButton
                    $variant="primary"
                    onClick={handleCheer}
                    $disabled={state.mood === "offline"}
                >
                    Cheer
                </ActionButton>
                <ActionButton $variant="danger" onClick={handleReset}>
                    Reset
                </ActionButton>
            </div>
        </div>
    );
});
