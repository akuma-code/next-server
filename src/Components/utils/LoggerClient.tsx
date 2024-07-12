"use client";

import { Box } from "@mui/material";

export const LoggerClient = ({ item }: { item: any }) => {
    // console.clear();
    console.log({ item });
    return <Box>Logger</Box>;
};
