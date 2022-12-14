import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
export declare class LoginOutput extends CoreOutput {
    token?: string;
}
declare const LoginInput_base: import("@nestjs/common").Type<Pick<User, "email" | "password">>;
export declare class LoginInput extends LoginInput_base {
}
export {};
