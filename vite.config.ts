/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                name: "Calculatrix",
                short_name: "Calculatrix",
                start_url: "/",
                display: "standalone",
                background_color: "#1a1c22",
                lang: "en",
                scope: "/",
                icons: [
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
                theme_color: "#1a1c22",
            },
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setupTest.ts"],
    },
});
