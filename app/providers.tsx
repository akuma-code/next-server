"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
    QueryClientProvider,
    HydrationBoundary,
    dehydrate,
    QueryClient,
    QueryFunction,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
export const queryFetch: QueryFunction = async ({ queryKey }) => {
    const fetch_url = queryKey[0];
    if (typeof fetch_url !== "string")
        return console.log("Fetch url error: ", fetch_url);
    const data = await fetch(fetch_url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TIMEWEB_CLOUD_TOKEN}`,
            Origin: "localhost:3000",
        },
    });
    return data.json();
};

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                queryFn: queryFetch,

                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
const queryClient = getQueryClient();
export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        // <ThemeProvider theme={THEME}>
        <>
            <CssBaseline enableColorScheme />
            <AppRouterCacheProvider>
                <QueryClientProvider client={queryClient}>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="ru"
                        >
                            {children}
                            <ReactQueryDevtools
                                client={queryClient}
                                initialIsOpen={false}
                            />
                        </LocalizationProvider>
                    </HydrationBoundary>
                </QueryClientProvider>
            </AppRouterCacheProvider>
        </>
        // </ThemeProvider>
    );
};
