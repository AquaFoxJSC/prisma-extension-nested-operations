"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePrismaClientWithNamespace = exports.initializePrismaClient = exports.withNestedOperations = void 0;
var nestedOperations_1 = require("./lib/nestedOperations");
Object.defineProperty(exports, "withNestedOperations", { enumerable: true, get: function () { return nestedOperations_1.withNestedOperations; } });
var prismaClient_1 = require("./lib/utils/prismaClient");
Object.defineProperty(exports, "initializePrismaClient", { enumerable: true, get: function () { return prismaClient_1.initializePrismaClient; } });
Object.defineProperty(exports, "initializePrismaClientWithNamespace", { enumerable: true, get: function () { return prismaClient_1.initializePrismaClientWithNamespace; } });
