import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFacultyDto } from "../../types/Faculty.dto";
import { IFacultyCreateDto } from "../../types/facutly-create.dto";

export const FacultyCreate = () => {
  const [completed, setCompleted] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IFacultyCreateDto>();
  const onSubmit: SubmitHandler<IFacultyCreateDto> = (data) => {
    console.log(data);
    axios.post<IFacultyDto, AxiosResponse<IFacultyDto, IFacultyCreateDto>, IFacultyCreateDto>(`faculties`, data)
      .then(response => {
        setCompleted(true);
        reset();
      })
  };

  return (
    <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
      <h1 className="laptop:text-6xl phone:text-3xl font-bold">Faculty creation</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          className="border-2 border-black"
          type="text"
          {...register("name", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.name && (<p>Year not valid</p>)}

        <label>Faculty logo path:</label>
        <input
          className="border-2 border-black"
          type="text"
          {...register("logoPath", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.logoPath && (<p>Logo path not valid</p>)}
        
        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Create"></input>
        </div>
      </form>
      {completed &&
        <div className="laptop:mt-5 phone:mt-2 block text-center bg-green-400">
          <span>Success</span>
        </div>}
    </div>)
}