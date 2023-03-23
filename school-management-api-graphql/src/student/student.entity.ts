import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class StudentEntity {
  @ObjectIdColumn()
  _id: string;

  @Field(() => String, { description: 'Id' })
  @PrimaryColumn()
  id: string;

  @Field(() => String, { description: 'First name' })
  @Column()
  firstname: string;

  @Field(() => String, { description: 'Last name' })
  @Column()
  lastname: string;
}
