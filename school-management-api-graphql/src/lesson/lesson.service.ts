import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { LessonInput } from './input/lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  // Ceate lesson
  async createLesson(lessonInput: LessonInput): Promise<LessonEntity> {
    const { name, students } = lessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      students,
    });

    return await this.lessonRepository.save(lesson);
  }

  //Get all lesson
  async getLessons(): Promise<LessonEntity[]> {
    return this.lessonRepository.find();
  }

  //Get lesson by id
  async getLessonById(lessonId: string): Promise<LessonEntity> {
    return await this.lessonRepository.findOneBy({ id: lessonId });
  }

  //Assign students to lesson
  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return await this.lessonRepository.save(lesson);
  }
}
