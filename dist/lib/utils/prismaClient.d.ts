import type { Prisma } from "@prisma/client";
/**
 * Initialize the Prisma client from a custom path or use the default one.
 * This must be called before using withNestedOperations if you want to use a custom client path.
 */
export declare function initializePrismaClient(clientPath?: string): Promise<void>;
/**
 * Initialize with a Prisma namespace directly (synchronous).
 * Use this when you already have the Prisma namespace loaded in your app.
 */
export declare function initializePrismaClientWithNamespace(namespace: typeof Prisma): void;
/**
 * Get the Prisma namespace. If not initialized, will initialize with the default client.
 */
export declare function getPrismaClient(): Promise<typeof Prisma>;
/**
 * Synchronously get the Prisma namespace. Will throw if not initialized.
 * Use this only after calling initializePrismaClient or getPrismaClient.
 */
export declare function getPrismaClientSync(): typeof Prisma;
