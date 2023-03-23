import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentEntity } from './student.entity';
import { StudentService } from './student.service';
import { StudentInput } from './student.input';

@Resolver(() => StudentEntity)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // Ceate student
  @Mutation(() => StudentEntity)
  async createStudent(@Args('studentInput') studentInput: StudentInput) {
    return await this.studentService.createStudent(studentInput);
  }

  //Get all student
  @Query(() => [StudentEntity])
  async getStudents() {
    return await this.studentService.getStudent();
  }

  //Get student by id
  @Query(() => StudentEntity)
  async getStudentById(@Args('studentId') studentId: string) {
    return await this.studentService.getStudentById(studentId);
  }
}
