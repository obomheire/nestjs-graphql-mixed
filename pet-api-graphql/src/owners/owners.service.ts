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
    return this.ownerRepository.find();
  }

  getOwner(id: string): Promise<OwnerEntity> {
    return this.ownerRepository.findOneBy({ id });
  }

z
}
