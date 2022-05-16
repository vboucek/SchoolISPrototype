import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IFacultyDto } from "../../types/Faculty.dto";
import { IFacultyCreateDto } from "../../types/facutly-create.dto";

export const FacultyEdit = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { id } = useParams();
  const [faculty, setFaculty] = useState<IFacultyDto>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IFacultyCreateDto>();
  const onSubmit: SubmitHandler<IFacultyCreateDto> = (data) => {
    console.log(data);
    axios.patch<IFacultyDto, AxiosResponse<IFacultyDto, IFacultyCreateDto>, IFacultyCreateDto>(`faculties/${id}`, data)
      .then(response => {
        setCompleted(true);
      })
  };

  useEffect(() => {
    axios.get<IFacultyDto>(`/faculties/${id}`)
      .then(response => {
        setFaculty(response.data);
      })
  }, []);

  return (
    <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
      <h1 className="laptop:text-6xl phone:text-3xl font-bold">Faculty edit</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          defaultValue={faculty?.name}
          className="border-2 border-black"
          type="text"
          {...register("name", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.name && (<p>Name not valid</p>)}

        <label>Faculty logo path:</label>
        <input
          defaultValue={faculty?.logoPath}
          className="border-2 border-black"
          type="text"
          {...register("logoPath", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.logoPath && (<p>Logo path not valid</p>)}

        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Edit"></input>
        </div>
      </form>
      {completed &&
        <div className="laptop:mt-5 phone:mt-2 block text-center bg-green-400">
          <span>Success</span>
        </div>}
    </div>)
}