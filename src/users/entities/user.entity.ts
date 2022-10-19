import { CoreEntity } from "./../../common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

registerEnumType(UserRole, { name: "UserRole" });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: "varchar" })
  @Field((type) => UserRole)
  role: UserRole;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}