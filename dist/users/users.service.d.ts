import { EditProfileInput } from "./dtos/edit-profile.dto";
import { LoginInput } from "./dtos/login.dto";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
export declare class UsersService {
    private readonly users;
    private readonly jwtService;
    constructor(users: Repository<User>, jwtService: JwtService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<{
        ok: boolean;
        error?: string;
    }>;
    login({ email, password, }: LoginInput): Promise<{
        ok: boolean;
        error?: string;
        token?: string;
    }>;
    findById(id: number): Promise<User>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<User>;
}
