import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEventLog } from "../../hooks/useEventLog";

export const EventLog: React.FC = () => {
    const { events, clearEvents } = useEventLog();
    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            {!open && (
                <IconButton
                    onClick={toggleOpen}
                    sx={{
                        position: "fixed",
                        top: 16,
                        right: 16,
                        zIndex: 1300,
                        backgroundColor: "#0f172a",
                        "&:hover": { backgroundColor: "#020617" },
                    }}
                    size="large"
                >
                    <MenuIcon htmlColor="#e5e7eb" />
                </IconButton>
            )}

            <Drawer anchor="right" open={open} onClose={toggleOpen}>
                <Paper
                    sx={{
                        width: 320,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#020617",
                        color: "#e5e7eb",
                    }}
                    square
                >
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: "1px solid #1f2937",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="subtitle1">Event Log</Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={clearEvents}
                            sx={{
                                borderColor: "#4b5563",
                                color: "#e5e7eb",
                                textTransform: "none",
                            }}
                        >
                            Clear
                        </Button>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: "auto" }}>
                        {events.length === 0 ? (
                            <Typography
                                variant="body2"
                                sx={{ p: 2, color: "#6b7280" }}
                            >
                                Событий пока нет. Поиграйтесь с питомцами 🐾
                            </Typography>
                        ) : (
                            <List dense>
                                {events.map((event, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={event} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Paper>
            </Drawer>
        </>
    );
};
