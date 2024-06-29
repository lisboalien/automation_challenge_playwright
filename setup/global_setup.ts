import { FullConfig } from "@playwright/test";
import dotenv from 'dotenv';

async function globalSetup(_config: FullConfig): Promise<void> {
    dotenv.config({
        path: '.env',
        override: true
    });
}

module.exports = globalSetup;