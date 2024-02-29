/* eslint-disable prettier/prettier */
import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
   
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    email: string;
}
console.log("estoy pasando por el InputType")
