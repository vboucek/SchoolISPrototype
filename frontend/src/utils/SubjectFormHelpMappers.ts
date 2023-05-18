import { SubjectFormInput } from '../components/Subject/SubjectFormPage';
import {
  convertTime,
  convertToLocalDatetime,
  getMinFromForm,
} from './TimeUtils';
import { SubjectDto } from '../types/Subject.dto';

function convertInputToDto(userId: number, data: SubjectFormInput): SubjectDto {
  return {
    lectureStartTimeMin: getMinFromForm(data.lectureStartTimeMin),
    lectureDurationMin:
      getMinFromForm(data.lectureEndTimeMin) -
      getMinFromForm(data.lectureStartTimeMin),
    startSign: new Date(data.startSign),
    endSign: new Date(data.endSign),
    title: data.title,
    description: data.description,
    code: data.code,
    endType: data.endType,
    room: data.room,
    capacity: data.capacity,
    credits: data.credits,
    lectureDay: data.lectureDay,
    semesterId: data.semesterId,
    creatorId: userId,
    facultyId: data.facultyId,
  };
}

function convertDtoToInput(data: SubjectDto): SubjectFormInput {
  return {
    title: data.title,
    description: data.description,
    code: data.code,
    endType: data.endType,
    room: data.room,
    capacity: data.capacity,
    credits: data.credits,
    startSign: convertToLocalDatetime(new Date(data.startSign)),
    endSign: convertToLocalDatetime(new Date(data.endSign)),
    lectureDay: data.lectureDay,
    lectureStartTimeMin: convertTime(data.lectureStartTimeMin),
    lectureEndTimeMin: convertTime(
      data.lectureStartTimeMin + data.lectureDurationMin,
    ),
    semesterId: data.semesterId,
    creatorId: data.creatorId,
    facultyId: data.facultyId,
  };
}

export { convertDtoToInput, convertInputToDto };
