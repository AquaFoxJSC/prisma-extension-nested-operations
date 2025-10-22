"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOppositeRelation = exports.relationsByModel = void 0;
const prismaClient_1 = require("./prismaClient");
let relationsByModel = null;
/**
 * Lazy load and cache relationsByModel from Prisma DMMF.
 * This allows us to use a custom Prisma client if initialized.
 */
function getRelationsByModel() {
    if (relationsByModel) {
        return relationsByModel;
    }
    const PrismaClient = (0, prismaClient_1.getPrismaClientSync)();
    if (!PrismaClient.dmmf) {
        throw new Error("Prisma DMMF not found, please generate Prisma client using `npx prisma generate`");
    }
    relationsByModel = {};
    PrismaClient.dmmf.datamodel.models.forEach((model) => {
        relationsByModel[model.name] = model.fields.filter((field) => field.kind === "object" && field.relationName);
    });
    return relationsByModel;
}
exports.relationsByModel = getRelationsByModel;
function findOppositeRelation(relation) {
    const relations = getRelationsByModel();
    const parentRelations = relations[relation.type] || [];
    const oppositeRelation = parentRelations.find((parentRelation) => parentRelation !== relation &&
        parentRelation.relationName === relation.relationName);
    if (!oppositeRelation) {
        throw new Error(`Unable to find opposite relation to ${relation.name}`);
    }
    return oppositeRelation;
}
exports.findOppositeRelation = findOppositeRelation;
