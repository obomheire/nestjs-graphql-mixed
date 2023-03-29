import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { PetEntity } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { OwnerEntity } from 'src/owners/entities/owner.entity';

@Resolver(() => PetEntity)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => PetEntity)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<PetEntity> {
    return this.petsService.createPet(createPetInput);
  }

  @Query(() => [PetEntity], { name: 'getPets' })
  async getPets(): Promise<PetEntity[]> {
    return this.petsService.getPets();
  }

  @Query(() => PetEntity, { name: 'getPet' })
  async getPet(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PetEntity> {
    return this.petsService.getPet(id);
  }

  @ResolveField(() => OwnerEntity)
  async owner(@Parent() pet: PetEntity): Promise<OwnerEntity> {
    return this.petsService.getOwnerResolveField(pet.ownerId);
  }

  // Update pet by id
  @Mutation(() => PetEntity)
  async updatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ): Promise<PetEntity> {
    return this.petsService.updatePet(updatePetInput.id, updatePetInput);
  }

  // Delete pet by id
  @Mutation(() => PetEntity)
  async removePet(
    @Args('id', { type: () => String }) id: string,
  ): Promise<PetEntity> {
    return this.petsService.removePet(id);
  }
}
