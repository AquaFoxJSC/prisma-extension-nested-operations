import type { Prisma } from "@prisma/client";
/**
 * Lazy load and cache relationsByModel from Prisma DMMF.
 * This allows us to use a custom Prisma client if initialized.
 */
declare function getRelationsByModel(): Record<string, Prisma.DMMF.Field[]>;
export { getRelationsByModel as relationsByModel };
export declare function findOppositeRelation(relation: Prisma.DMMF.Field): Prisma.DMMF.Field;
