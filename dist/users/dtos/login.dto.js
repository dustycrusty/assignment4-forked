"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.LoginOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const user_entity_1 = require("../entities/user.entity");
let LoginOutput = class LoginOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_2.Field)((type) => String, { nullable: true }),
    __metadata("design:type", String)
], LoginOutput.prototype, "token", void 0);
LoginOutput = __decorate([
    (0, graphql_2.ObjectType)()
], LoginOutput);
exports.LoginOutput = LoginOutput;
let LoginInput = class LoginInput extends (0, graphql_1.PickType)(user_entity_1.User, ['email', 'password']) {
};
LoginInput = __decorate([
    (0, graphql_2.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
//# sourceMappingURL=login.dto.js.map