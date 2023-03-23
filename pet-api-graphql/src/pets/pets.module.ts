import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity]), OwnersModule],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
