import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { OwnerEntity } from './entities/owner.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private ownerRepository: Repository<OwnerEntity>,
  ) {}
  async createOwner(createOwnerInput: CreateOwnerInput): Promise<OwnerEntity> {
    try {
      const newOwner = this.ownerRepository.create({
        ...createOwnerInput,
        id: uuid(),
      });

      return this.ownerRepository.save(newOwner);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  getOwners(): Promise<OwnerEntity[]> {
    try {
      return this.ownerRepository.find({
        relations: ['pets'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  getOwner(id: string): Promise<OwnerEntity> {
    try {
      return this.ownerRepository.findOne({
        where: {
          id,
        },
        relations: ['pets'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Updatde owner by id
  async updateOwner(
    id: string,
    updateOwnerInput: UpdateOwnerInput,
  ): Promise<OwnerEntity> {
    try {
      const owner = await this.ownerRepository.findOneBy({ id });
      this.ownerRepository.merge(owner, updateOwnerInput);
      return this.ownerRepository.save(owner);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete owner by id
  async removeOwner(id: string): Promise<OwnerEntity> {
    try {
      const owner = await this.ownerRepository.findOneBy({ id });
      return this.ownerRepository.remove(owner);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
