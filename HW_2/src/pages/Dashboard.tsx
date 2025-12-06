import React, { useEffect, useMemo, useState } from "react";
import { PetCard } from "../components/PetCard/PetCard";
import type { Pet } from "../components/PetCard/types";
import petsData from "../data/pets.json";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Skeleton,
    Typography,
} from "@mui/material";

export const Dashboard: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [speciesFilter, setSpeciesFilter] = useState<string>("all");

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setPets(petsData as Pet[]);
            setLoading(false);
        }, 2000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, []);

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setSpeciesFilter(event.target.value);
    };

    const speciesOptions = useMemo(() => {
        const set = new Set<string>();
        pets.forEach((pet) => set.add(pet.species));
        return Array.from(set);
    }, [pets]);

    const filteredPets = useMemo(() => {
        if (speciesFilter === "all") return pets;
        return pets.filter((pet) => pet.species === speciesFilter);
    }, [pets, speciesFilter]);

    return (
        <div className="app-root">
            <div className="dashboard-shell">
                <header className="dashboard-header">
                    <Typography variant="h5" component="h1">
                        CyberZoo 2077 — Dashboard
                    </Typography>

                    <Box sx={{ minWidth: 200 }}>
                        <FormControl
                            fullWidth
                            size="small"
                            sx={{
                                label: { color: "#fff" },
                                "& .MuiOutlinedInput-root": {
                                    color: "#fff",
                                    "& fieldset": { borderColor: "#4b5563" },
                                    "&:hover fieldset": {
                                        borderColor: "#9ca3af",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff",
                                    },
                                },
                                "& .MuiSelect-icon": {
                                    color: "#fff",
                                },
                                "& .MuiMenuItem-root": {
                                    color: "#000",
                                },
                            }}
                        >
                            <InputLabel id="species-filter-label">
                                Фильтр по виду
                            </InputLabel>

                            <Select
                                labelId="species-filter-label"
                                label="Фильтр по виду"
                                value={speciesFilter}
                                onChange={handleFilterChange}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: "#f9fafb",
                                            color: "#111827",
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="all">Все виды</MenuItem>
                                {speciesOptions.map((spec) => (
                                    <MenuItem key={spec} value={spec}>
                                        {spec}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </header>

                <section className="dashboard-grid">
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <Box key={index} sx={{ p: 2 }}>
                                  <Skeleton
                                      variant="rectangular"
                                      width="100%"
                                      height={160}
                                      sx={{
                                          borderRadius: 2,
                                          bgcolor: "#111827",
                                      }}
                                  />
                              </Box>
                          ))
                        : filteredPets.map((pet) => (
                              <PetCard key={pet.id} pet={pet} />
                          ))}
                </section>
            </div>
        </div>
    );
};
