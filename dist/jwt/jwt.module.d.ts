import { JwtModuleOptions } from './jwt.interfaces';
import { DynamicModule } from '@nestjs/common';
export declare class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule;
}
