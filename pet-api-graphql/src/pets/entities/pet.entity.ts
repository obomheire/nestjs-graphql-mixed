import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { OwnerEntity } from 'src/owners/entities/owner.entity';
import {
  Column,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PetEntity {
  // @ObjectIdColumn()
  // _id: ObjectID;
  @Field()
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  // @Field(() => ID)
  // @Column()
  // id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @Column()
  type?: string;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  @Field(() => OwnerEntity)
  owner: OwnerEntity;

  @Field(() => String)
  @Column()
  ownerId: string;
}
