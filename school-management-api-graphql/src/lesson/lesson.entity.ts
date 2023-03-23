import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class LessonEntity {
  @ObjectIdColumn()
  _id: string;

  @Field(() => String, { description: 'Id' })
  @PrimaryColumn()
  id: string;

  @Field(() => String, { description: 'Name' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Start date' })
  @Column()
  startDate: string;

  @Field(() => String, { description: 'End date' })
  @Column()
  endDate: string;

  @Field(() => [String], { description: 'students ID Array' })
  @Column()
  students: string[];
}
