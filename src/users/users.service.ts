import { EditProfileInput } from "./dtos/edit-profile.dto";
import { LoginInput } from "./dtos/login.dto";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { Injectable, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    let result: { ok: boolean; error?: string };
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        result = {
          ok: false,
          error: "There is a user with that email already",
        };
      } else {
        await this.users.save(this.users.create({ email, password, role }));
        result = { ok: true };
      }
    } catch (e) {
      result = { ok: false, error: "Account cannot be created" };
    }

    return result;
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    let result: { ok: boolean; error?: string; token?: string };
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      result = { ok: false, error: "User is not found" };
    } else {
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

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id: id } });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id: userId } });
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
