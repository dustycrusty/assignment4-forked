import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    seeProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(editProfileInput: EditProfileInput, authUser: User): Promise<EditProfileOutput>;
}
