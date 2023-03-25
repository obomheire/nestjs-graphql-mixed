import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => OwnerEntity)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => OwnerEntity)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.createOwner(createOwnerInput);
  }

  @Query(() => [OwnerEntity], { name: 'getOwners' })
  getOwners() {
    return this.ownersService.getOwners();
  }

  @Query(() => OwnerEntity, { name: 'getOwner' })
  getOwner(@Args('id', { type: () => String }) id: string) {
    return this.ownersService.getOwner(id);
  }

  // @Mutation(() => OwnerEntity)
  // updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
  //   return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  // }

  // @Mutation(() => OwnerEntity)
  // removeOwner(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownersService.remove(id);
  // }
}
