import { convertTime, getMinFromForm } from './TimeUtils';
import { SemGroupFormInput } from '../components/SemGroup/SemGroupFormPage';
import { SeminarGroupDto } from '../types/SeminarGroup.dto';

function convertInputToDto(
  data: SemGroupFormInput,
  courseId: number,
): SeminarGroupDto {
  return {
    name: data.name,
    room: data.room,
    capacity: data.capacity,
    seminarGroupDay: data.seminarGroupDay,
    seminarGroupDurationStartTimeMins: getMinFromForm(
      data.seminarGroupStartTimeMin,
    ),
    seminarGroupDurationMins:
      getMinFromForm(data.seminarGroupEndTimeMin) -
      getMinFromForm(data.seminarGroupStartTimeMin),
    courseId: courseId,
  };
}

function convertDtoToInput(data: SeminarGroupDto): SemGroupFormInput {
  return {
    name: data.name,
    room: data.room,
    capacity: data.capacity,
    seminarGroupDay: data.seminarGroupDay,
    seminarGroupStartTimeMin: convertTime(
      data.seminarGroupDurationStartTimeMins,
    ),
    seminarGroupEndTimeMin: convertTime(
      data.seminarGroupDurationStartTimeMins + data.seminarGroupDurationMins,
    ),
  };
}

export { convertDtoToInput, convertInputToDto };
