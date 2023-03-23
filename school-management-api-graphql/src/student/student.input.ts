import { Optional } from '@nestjs/common';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, IsDateString } from 'class-validator';

@InputType()
export class StudentInput {
  @Field(() => String, { nullable: false })
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @Field(() => String, { nullable: false })
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
