import { cloneDeep, cloneDeepWith } from "lodash";
import { getPrismaClientSync } from "./prismaClient";

export function cloneArgs(args: any) {
  const PrismaNamespace = getPrismaClientSync();
  
  // Prisma v4 requires that instances of Prisma.NullTypes are not cloned,
  // otherwise it will parse them as 'undefined' and the operation will fail.
  function passThroughNullTypes(value: any) {
    if (
      value instanceof PrismaNamespace.NullTypes.DbNull ||
      value instanceof PrismaNamespace.NullTypes.JsonNull ||
      value instanceof PrismaNamespace.NullTypes.AnyNull
    ) {
      return value;
    }
  }
  
  // only handle null types if they are present, Prisma versions lower than v4
  // do not have them and we can clone the string values as usual
  if (PrismaNamespace.NullTypes) {
    return cloneDeepWith(args, passThroughNullTypes);
  }

  return cloneDeep(args);
}
