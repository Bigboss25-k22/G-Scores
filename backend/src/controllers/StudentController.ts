import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

const studentService = new StudentService();

export const getStudentByRegNumber = async (req: Request, res: Response) => {
  const { regNumber } = req.params;
  const student = await studentService.getStudentByRegNumber(regNumber);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sinh viên',
      data: null,
    });
  }

  const subjects = studentService.classifySubjects(student.subjects);
  res.json({
    success: true,
    message: 'Lấy thông tin thành công',
    data: {
      ...student,
      subjects: subjects.map((s) => ({
        name: s.name,
        score: s.score,
        type: s.classify(),
      })),
    },
  });
}; 