import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pets/entities/pet.entity';
import { OwnersModule } from './owners/owners.module';
import { OwnerEntity } from './owners/entities/owner.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://localhost:27017/pets-db',
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   extra: {
    //     writeConcern: { w: 'majority' },
    //   },
    //   entities: [PetEntity, OwnerEntity],
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'Secret@123',
      database: 'testdb',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
