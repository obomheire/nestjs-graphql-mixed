import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const newPet = this.petRepository.create({
        ...createPetInput,
        id: uuid(),
      });
      return this.petRepository.save(newPet);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPets(): Promise<PetEntity[]> {
    try {
      return this.petRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPet(id: string): Promise<PetEntity> {
    try {
      return this.petRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOwnerResolveField(ownerId: string): Promise<OwnerEntity> {
    try {
      return this.ownersService.getOwner(ownerId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //Updatde pet by id
  async updatePet(
    id: string,
    updatePetInput: UpdatePetInput,
  ): Promise<PetEntity> {
    try {
      const pet = await this.petRepository.findOneBy({ id });
      this.petRepository.merge(pet, updatePetInput);
      return this.petRepository.save(pet);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //Delete pet by id
  async removePet(id: string): Promise<PetEntity> {
    try {
      const pet = await this.petRepository.findOneBy({ id });
    return this.petRepository.remove(pet);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
