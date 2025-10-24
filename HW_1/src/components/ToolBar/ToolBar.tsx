import React from "react";
import { type FilterMode, type ViewMode } from "../../types/types";
import "./ToolBar.css";

type ToolbarProps = {
    filterMode: FilterMode;
    onChangeFilter: (mode: FilterMode) => void;

    onSearch: () => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;

    viewMode: ViewMode;
    onToggleViewMode: () => void;
};

export function Toolbar({
    filterMode,
    onChangeFilter,
    onSearch,
    searchInputRef,
    viewMode,
    onToggleViewMode,
}: ToolbarProps) {
    return (
        <div className="toolbar">
            <div className="toolbar__filters">
                <button
                    className={filterMode === "all" ? "active" : ""}
                    onClick={() => onChangeFilter("all")}
                >
                    Все
                </button>
                <button
                    className={filterMode === "favorites" ? "active" : ""}
                    onClick={() => onChangeFilter("favorites")}
                >
                    Только избранные
                </button>
            </div>

            <div className="toolbar__search">
                <input
                    ref={searchInputRef}
                    placeholder="Поиск по названию"
                    onChange={onSearch}
                />
            </div>

            <div className="toolbar__viewmode">
                <button onClick={onToggleViewMode}>
                    Вид: {viewMode === "grid" ? "Плитка" : "Список"}
                </button>
            </div>
        </div>
    );
}