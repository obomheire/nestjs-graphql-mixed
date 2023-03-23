import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from './entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity])],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
