import { Prisma } from "@prisma/client";

/**
 * Holds the Prisma client class that will be used by the extension.
 * Can be initialized with a custom path via initializePrismaClient.
 */
let PrismaClient: typeof Prisma | null = null;
let isInitialized = false;

/**
 * Initialize the Prisma client from a custom path or use the default one.
 * This must be called before using withNestedOperations if you want to use a custom client path.
 */
export async function initializePrismaClient(clientPath?: string): Promise<void> {
  if (isInitialized && !clientPath) {
    // Already initialized with default, no need to reinitialize
    return;
  }

  const prismaClientPath = clientPath || "@prisma/client";
  
  try {
    const imported = await import(prismaClientPath) as { Prisma: typeof Prisma };
    PrismaClient = imported.Prisma;
    isInitialized = true;
  } catch (error) {
    if (clientPath) {
      throw new Error(
        `Cannot find Prisma client at path: ${clientPath}. Please check if the path is correct and the Prisma client is generated.`
      );
    } else {
      throw error;
    }
  }
}

/**
 * Get the Prisma client. If not initialized, will initialize with the default client.
 */
export async function getPrismaClient(): Promise<typeof Prisma> {
  if (!PrismaClient) {
    await initializePrismaClient();
  }
  
  if (!PrismaClient) {
    throw new Error("Failed to initialize Prisma client");
  }
  
  return PrismaClient;
}

/**
 * Synchronously get the Prisma client. Will throw if not initialized.
 * Use this only after calling initializePrismaClient or getPrismaClient.
 */
export function getPrismaClientSync(): typeof Prisma {
  if (!PrismaClient) {
    // Fallback to default import for backward compatibility
    // Using dynamic require to avoid TypeScript errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imported = eval('require')("@prisma/client") as { Prisma: typeof Prisma };
    PrismaClient = imported.Prisma;
    isInitialized = true;
  }
  
  return PrismaClient;
}

