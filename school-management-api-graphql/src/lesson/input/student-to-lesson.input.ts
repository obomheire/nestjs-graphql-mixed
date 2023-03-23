import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsUUID } from 'class-validator';

@InputType()
export class StudentToLessonInput {
  @Field(() => ID)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @Field(() => [ID])
  @IsUUID('4', { each: true })
  @IsArray()
  studentIds: string[];
}
