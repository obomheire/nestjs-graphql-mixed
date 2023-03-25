import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { OwnerEntity } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PetEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Field(() => ID)
  @Column()
  id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @Column()
  type?: string;

  @Field(() => String)
  @Column()
  ownerId: string;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  @Field(() => OwnerEntity)
  owner: OwnerEntity;
}
