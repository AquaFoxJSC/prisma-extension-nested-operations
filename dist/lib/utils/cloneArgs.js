"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneArgs = void 0;
const lodash_1 = require("lodash");
const prismaClient_1 = require("./prismaClient");
function cloneArgs(args) {
    const PrismaNamespace = (0, prismaClient_1.getPrismaClientSync)();
    // Prisma v4 requires that instances of Prisma.NullTypes are not cloned,
    // otherwise it will parse them as 'undefined' and the operation will fail.
    function passThroughNullTypes(value) {
        if (value instanceof PrismaNamespace.NullTypes.DbNull ||
            value instanceof PrismaNamespace.NullTypes.JsonNull ||
            value instanceof PrismaNamespace.NullTypes.AnyNull) {
            return value;
        }
    }
    // only handle null types if they are present, Prisma versions lower than v4
    // do not have them and we can clone the string values as usual
    if (PrismaNamespace.NullTypes) {
        return (0, lodash_1.cloneDeepWith)(args, passThroughNullTypes);
    }
    return (0, lodash_1.cloneDeep)(args);
}
exports.cloneArgs = cloneArgs;
