import { Prisma } from "@prisma/client";
import { getPrismaClientSync } from "./prismaClient";

let relationsByModel: Record<string, Prisma.DMMF.Field[]> | null = null;

/**
 * Lazy load and cache relationsByModel from Prisma DMMF.
 * This allows us to use a custom Prisma client if initialized.
 */
function getRelationsByModel(): Record<string, Prisma.DMMF.Field[]> {
  if (relationsByModel) {
    return relationsByModel;
  }

  const PrismaClient = getPrismaClientSync();

  if (!PrismaClient.dmmf) {
    throw new Error(
      "Prisma DMMF not found, please generate Prisma client using `npx prisma generate`"
    );
  }

  relationsByModel = {};
  PrismaClient.dmmf.datamodel.models.forEach((model: Prisma.DMMF.Model) => {
    relationsByModel![model.name] = model.fields.filter(
      (field: Prisma.DMMF.Field) => field.kind === "object" && field.relationName
    );
  });

  return relationsByModel;
}

export { getRelationsByModel as relationsByModel };

export function findOppositeRelation(relation: Prisma.DMMF.Field): Prisma.DMMF.Field {
  const relations = getRelationsByModel();
  const parentRelations =
    relations[relation.type as Prisma.ModelName] || [];

  const oppositeRelation = parentRelations.find(
    (parentRelation) =>
      parentRelation !== relation &&
      parentRelation.relationName === relation.relationName
  );

  if (!oppositeRelation) {
    throw new Error(`Unable to find opposite relation to ${relation.name}`);
  }

  return oppositeRelation;
}
