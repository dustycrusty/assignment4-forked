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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const jwt_service_1 = require("../jwt/jwt.service");
let UsersService = class UsersService {
    constructor(users, jwtService) {
        this.users = users;
        this.jwtService = jwtService;
    }
    async createAccount({ email, password, role, }) {
        let result;
        try {
            const exists = await this.users.findOne({ where: { email } });
            if (exists) {
                result = {
                    ok: false,
                    error: "There is a user with that email already",
                };
            }
            else {
                await this.users.save(this.users.create({ email, password, role }));
                result = { ok: true };
            }
        }
        catch (e) {
            result = { ok: false, error: "Account cannot be created" };
        }
        return result;
    }
    async login({ email, password, }) {
        let result;
        const user = await this.users.findOne({ where: { email } });
        if (!user) {
            result = { ok: false, error: "User is not found" };
        }
        else {
            const passwordEquals = await user.checkPassword(password);
            const token = this.jwtService.sign({ id: user.id });
            result = {
                ok: passwordEquals,
                error: passwordEquals ? null : "Password does not match",
                token: passwordEquals ? token : null,
            };
        }
        return result;
    }
    async findById(id) {
        return this.users.findOne({ where: { id: id } });
    }
    async editProfile(userId, { email, password }) {
        const user = await this.users.findOne({ where: { id: userId } });
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        return this.users.save(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_service_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map