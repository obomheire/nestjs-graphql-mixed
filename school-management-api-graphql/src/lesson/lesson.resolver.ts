import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonEntity } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonInput } from './input/lesson.input';
import { StudentToLessonInput } from './input/student-to-lesson.input';

@Resolver(() => LessonEntity)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  // Ceate lesson
  @Mutation(() => LessonEntity)
  async createLesson(@Args('lessonInput') lessonInput: LessonInput) {
    return await this.lessonService.createLesson(lessonInput);
  }

  //Get all lesson
  @Query(() => [LessonEntity])
  async getLessons() {
    return await this.lessonService.getLessons();
  }

  //Get lesson by id
  @Query(() => LessonEntity)
  async getLessonById(@Args('lessonId') lessonId: string) {
    return await this.lessonService.getLessonById(lessonId);
  }

  //Assign students to lesson
  @Mutation(() => LessonEntity)
  async assignStudentsToLesson(
    @Args('studentToLessonInput') studentToLessonInput: StudentToLessonInput,
  ) {
    const { lessonId, studentIds } = studentToLessonInput;
    return await this.lessonService.assignStudentsToLesson(
      lessonId,
      studentIds,
    );
  }

  @ResolveField(() => LessonEntity)
  async populateStudents(@Parent() lesson: LessonEntity) {
    console.log(lesson.students);
  }
}
