import type { Prisma } from "@prisma/client";
/**
 * Initialize the Prisma client from a custom path or use the default one.
 * This must be called before using withNestedOperations if you want to use a custom client path.
 */
export declare function initializePrismaClient(clientPath?: string): Promise<void>;
/**
 * Get the Prisma namespace. If not initialized, will initialize with the default client.
 */
export declare function getPrismaClient(): Promise<typeof Prisma>;
/**
 * Synchronously get the Prisma namespace. Will throw if not initialized.
 * Use this only after calling initializePrismaClient or getPrismaClient.
 */
export declare function getPrismaClientSync(): typeof Prisma;
