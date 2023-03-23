import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
// import { join } from 'path';
// import { LessonResolver } from './lesson/lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import * as dotenv from 'dotenv';
import { StudentEntity } from './student/student.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      synchronize: true,
      useUnifiedTopology: true,
      extra: {
        writeConcern: { w: 'majority' },
      },
      entities: [LessonEntity, StudentEntity],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      // typePaths: ['./**/*.graphql'],
    }),
    LessonModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
