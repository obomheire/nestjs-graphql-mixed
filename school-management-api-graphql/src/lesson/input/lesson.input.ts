import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  IsUUID,
} from 'class-validator';

@InputType()
export class LessonInput {
  @Field(() => String, { nullable: false })
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  // @Field(() => String, { nullable: true })
  // @IsDateString()
  // // @IsString()
  // @Optional()
  // startDate: string;

  // @Field(() => String, { nullable: true })
  // @IsDateString()
  // @IsString()
  // @Optional()
  // endDate: string;

  @Field(() => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  @IsArray()
  students: string[];
}
