import type { Prisma } from "@prisma/client";

/**
 * Holds the Prisma namespace that will be used by the extension.
 * Can be initialized with a custom path via initializePrismaClient.
 */
let PrismaNamespace: typeof Prisma | null = null;
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
    const imported = await import(prismaClientPath) as { Prisma: any };
    PrismaNamespace = imported.Prisma;
    
    if (!PrismaNamespace || !PrismaNamespace.dmmf) {
      throw new Error('Imported Prisma object does not have dmmf property. Please ensure Prisma client is properly generated.');
    }
    
    isInitialized = true;
  } catch (error) {
    if (clientPath) {
      throw new Error(
        `Cannot find Prisma client at path: ${clientPath}. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } else {
      throw error;
    }
  }
}

/**
 * Initialize with a Prisma namespace directly (synchronous).
 * Use this when you already have the Prisma namespace loaded in your app.
 * The namespace MUST have dmmf property (will be automatically added if using prismaClient in soft-delete)
 */
export function initializePrismaClientWithNamespace(namespace: typeof Prisma): void {
  // For Prisma v6 compatibility, dmmf might be injected dynamically
  // So we don't check for dmmf here, just trust it will be there when needed
  if (!namespace) {
    throw new Error('Provided Prisma namespace is null or undefined.');
  }
  
  PrismaNamespace = namespace;
  isInitialized = true;
}

/**
 * Get the Prisma namespace. If not initialized, will initialize with the default client.
 */
export async function getPrismaClient(): Promise<typeof Prisma> {
  if (!PrismaNamespace) {
    await initializePrismaClient();
  }
  
  if (!PrismaNamespace) {
    throw new Error("Failed to initialize Prisma client");
  }
  
  return PrismaNamespace;
}

/**
 * Synchronously get the Prisma namespace. Will throw if not initialized.
 * Use this only after calling initializePrismaClient or getPrismaClient.
 */
export function getPrismaClientSync(): typeof Prisma {
  if (!PrismaNamespace) {
    // Fallback to default import for backward compatibility
    // Using dynamic require to avoid TypeScript errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imported = eval('require')("@prisma/client") as { Prisma: any };
    PrismaNamespace = imported.Prisma;
    isInitialized = true;
  }
  
  if (!PrismaNamespace) {
    throw new Error("Failed to initialize Prisma namespace");
  }
  
  return PrismaNamespace;
}

