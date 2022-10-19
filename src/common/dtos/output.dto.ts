import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export class CoreOutput {
  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => Boolean)
  ok: boolean;
}
