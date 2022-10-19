import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(payload: object) {
    return Jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return Jwt.verify(token, this.options.privateKey);
  }
}
