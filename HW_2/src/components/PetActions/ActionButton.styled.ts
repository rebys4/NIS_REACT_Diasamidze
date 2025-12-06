import styled from "styled-components";

interface ActionButtonProps {
    $variant?: "primary" | "secondary" | "danger";
    $disabled?: boolean;
}

export const ActionButton = styled.button<ActionButtonProps>`
    padding: 8px 12px;
    border-radius: 6px;
    border: none;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    font-size: 14px;
    font-weight: 500;
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
    transition: transform 0.1s ease, box-shadow 0.1s ease;

    background-color: ${({ $variant }) => {
        switch ($variant) {
            case "secondary":
                return "#38bdf8";
            case "danger":
                return "#f97373";
            default:
                return "#22c55e";
        }
    }};
    color: #0b1120;

    &:hover {
        transform: ${({ $disabled }) =>
            $disabled ? "none" : "translateY(-1px)"};
        box-shadow: ${({ $disabled }) =>
            $disabled ? "none" : "0 4px 8px rgba(15,23,42,0.2)"};
    }
`;
