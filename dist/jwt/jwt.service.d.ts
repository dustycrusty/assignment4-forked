import { JwtModuleOptions } from './jwt.interfaces';
export declare class JwtService {
    private readonly options;
    constructor(options: JwtModuleOptions);
    sign(payload: object): any;
    verify(token: string): any;
}
