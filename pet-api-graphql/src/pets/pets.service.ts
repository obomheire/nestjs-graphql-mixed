import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { PetEntity } from './entities/pet.entity';
import { v4 as uuid } from 'uuid';
import { OwnersService } from 'src/owners/owners.service';
import { OwnerEntity } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,
    private ownersService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<PetEntity> {
    const newPet = this.petRepository.create({
      ...createPetInput,
      id: uuid(),
    });
    return this.petRepository.save(newPet);
  }

  async getPets(): Promise<PetEntity[]> {
    return this.petRepository.find();
  }

  async getPet(id: string): Promise<PetEntity> {
    return this.petRepository.findOneBy({ id });
  }

  async getOwnerResolveField(ownerId: string): Promise<OwnerEntity> {
    return this.ownersService.getOwner(ownerId);
  }

  //Updatde pet by id
  async updatePet(
    id: string,
    updatePetInput: UpdatePetInput,
  ): Promise<PetEntity> {
    const pet = await this.petRepository.findOneBy({ id });
    this.petRepository.merge(pet, updatePetInput);
    return this.petRepository.save(pet);
  }

  //Delete pet by id
  async removePet(id: string): Promise<PetEntity> {
    const pet = await this.petRepository.findOneBy({ id });
    return this.petRepository.remove(pet);
  }
}
