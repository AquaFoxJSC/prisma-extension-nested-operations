"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientSync = exports.getPrismaClient = exports.initializePrismaClient = void 0;
/**
 * Holds the Prisma namespace that will be used by the extension.
 * Can be initialized with a custom path via initializePrismaClient.
 */
let PrismaNamespace = null;
let isInitialized = false;
/**
 * Initialize the Prisma client from a custom path or use the default one.
 * This must be called before using withNestedOperations if you want to use a custom client path.
 */
async function initializePrismaClient(clientPath) {
    if (isInitialized && !clientPath) {
        // Already initialized with default, no need to reinitialize
        return;
    }
    const prismaClientPath = clientPath || "@prisma/client";
    try {
        const imported = await (_a = prismaClientPath, Promise.resolve().then(() => __importStar(require(_a))));
        PrismaNamespace = imported.Prisma;
        if (!PrismaNamespace || !PrismaNamespace.dmmf) {
            throw new Error('Imported Prisma object does not have dmmf property. Please ensure Prisma client is properly generated.');
        }
        isInitialized = true;
    }
    catch (error) {
        if (clientPath) {
            throw new Error(`Cannot find Prisma client at path: ${clientPath}. Error: ${error instanceof Error ? error.message : String(error)}`);
        }
        else {
            throw error;
        }
    }
}
exports.initializePrismaClient = initializePrismaClient;
/**
 * Get the Prisma namespace. If not initialized, will initialize with the default client.
 */
async function getPrismaClient() {
    if (!PrismaNamespace) {
        await initializePrismaClient();
    }
    if (!PrismaNamespace) {
        throw new Error("Failed to initialize Prisma client");
    }
    return PrismaNamespace;
}
exports.getPrismaClient = getPrismaClient;
/**
 * Synchronously get the Prisma namespace. Will throw if not initialized.
 * Use this only after calling initializePrismaClient or getPrismaClient.
 */
function getPrismaClientSync() {
    if (!PrismaNamespace) {
        // Fallback to default import for backward compatibility
        // Using dynamic require to avoid TypeScript errors
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const imported = eval('require')("@prisma/client");
        PrismaNamespace = imported.Prisma;
        isInitialized = true;
    }
    if (!PrismaNamespace) {
        throw new Error("Failed to initialize Prisma namespace");
    }
    return PrismaNamespace;
}
exports.getPrismaClientSync = getPrismaClientSync;
