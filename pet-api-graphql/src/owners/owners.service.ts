import { Injectable } from '@nestjs/common';
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
    const newOwner = this.ownerRepository.create({
      ...createOwnerInput,
      id: uuid(),
    });

    return this.ownerRepository.save(newOwner);
  }

  getOwners(): Promise<OwnerEntity[]> {
    return this.ownerRepository.find({
      relations: ['pets'],
    });
  }

  getOwner(id: string): Promise<OwnerEntity> {
    return this.ownerRepository.findOne({
      where: {
        id,
      },
      relations: ['pets'],
    });
  }

  // Updatde owner by id
  async updateOwner(
    id: string,
    updateOwnerInput: UpdateOwnerInput,
  ): Promise<OwnerEntity> {
    const owner = await this.ownerRepository.findOneBy({ id });
    this.ownerRepository.merge(owner, updateOwnerInput);
    return this.ownerRepository.save(owner);
  }

  // Delete owner by id
  async removeOwner(id: string): Promise<OwnerEntity> {
    const owner = await this.ownerRepository.findOneBy({ id });
    return this.ownerRepository.remove(owner);
  }
}
