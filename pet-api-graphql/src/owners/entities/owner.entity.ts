import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PetEntity } from 'src/pets/entities/pet.entity';
import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class OwnerEntity {
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

  @OneToMany(() => PetEntity, (pet) => pet.owner)
  @Field(() => [PetEntity], { nullable: true })
  pets: PetEntity[];
}
