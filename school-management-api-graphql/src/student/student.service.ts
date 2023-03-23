import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { StudentEntity } from './student.entity';
import { StudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}
  // Ceate student
  async createStudent(studentInput: StudentInput): Promise<StudentEntity> {
    const { firstname, lastname } = studentInput;
    const lesson = this.studentRepository.create({
      id: uuid(),
      firstname,
      lastname,
    });

    return await this.studentRepository.save(lesson);
  }

  //Get all student
  async getStudent(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  //Get student by id
  async getStudentById(studentId: string): Promise<StudentEntity> {
    return await this.studentRepository.findOne({
      where: {
        id: studentId,
      },
    });
  }
}
