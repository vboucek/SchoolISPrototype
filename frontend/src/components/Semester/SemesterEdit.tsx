import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISemesterCreateDto } from "../../types/semester-create.dto";
import { ISemesterDto } from "../../types/Semester.dto";
import "../../styles/tailwindStyles.css"
import { isOnlyNumber, isOnlyText } from "../../utils/FormConstraints";
import { SemesterType } from "../../types/SemesterType";
import { useParams } from "react-router-dom";



export const SemesterEdit = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { id } = useParams();
  const [semester, setSemester] = useState<ISemesterDto>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ISemesterCreateDto>();
  const onSubmit: SubmitHandler<ISemesterCreateDto> = (data) => {
    console.log(data);
    axios.post<ISemesterDto, AxiosResponse<ISemesterDto, ISemesterCreateDto>, ISemesterCreateDto>(`semesters/${id}`, data)
      .then(response => {
        setCompleted(true);
      });
  };

  useEffect(() => {
    axios.get<ISemesterDto>(`/semesters/${id}`)
      .then(response => {
        setSemester(response.data);
      })
  }, []);

  return (
    <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
      <h1 className="laptop:text-6xl phone:text-3xl font-bold">Semester edit</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Year:</label>
        <input
          defaultValue={semester?.year}
          className="border-2 border-black"
          type="number"
          {...register("year", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.year && (<p>Year not valid</p>)}

        <label>Semester type:</label>
        <select className="border-2 border-black" {...register("semesterType", { required: true })}>
          <option selected={semester?.semesterType == SemesterType.summer} key={SemesterType.summer} value={SemesterType.summer}>Summer</option>
          <option selected={semester?.semesterType == SemesterType.winter} key={SemesterType.winter} value={SemesterType.winter}>Winter</option>
        </select>
        {errors.semesterType && (<p>Semester type required</p>)}
        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Create"></input>
        </div>
      </form>
      {completed &&
        <div className="laptop:mt-5 phone:mt-2 block text-center bg-green-400">
          <span>Success</span>
        </div>}
    </div>);
}