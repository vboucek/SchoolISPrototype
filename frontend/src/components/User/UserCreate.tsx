import axios, { AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUserCreateDto } from "../../types/User-create.dto";
import { IUserDto } from "../../types/User.dto";
import "../../styles/tailwindStyles.css"
import { isOnlyText, isValidEmail } from "../../utils/FormConstraints";
import { UserRole } from "../../types/UserRole";
import { useEffect, useState } from "react";
import { ISemesterDto } from "../../types/semester.dto";
import { IFacultyDto } from "../../types/faculty.dto";

export const UserCreate = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState<ISemesterDto[]>([]);
  const [faculties, setFaculties] = useState<IFacultyDto[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserCreateDto>();
  const onSubmit: SubmitHandler<IUserCreateDto> = (data) => {
    console.log(data);
    axios.post<IUserDto, AxiosResponse<IUserDto, IUserCreateDto>, IUserCreateDto>(`users`, data)
      .then(response => {
        setCompleted(true);
      })
  };

  useEffect(() => {
    axios.get<ISemesterDto[]>(`semesters`)
      .then(response => {
        setSemesters(response.data);
      });
    axios.get<IFacultyDto[]>(`faculties`)
      .then(response => {
        setFaculties(response.data);
      });
  }, []);


  return (
    <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>First name:</label>
        <input
          className="border-2 border-black"
          type="text"
          {...register("firstName", { required: true, minLength: 1, maxLength: 35, validate: isOnlyText })}
        />
        {errors.firstName && (<p>First name not valid</p>)}

        <label>Last name:</label>
        <input
          className="border-2 border-black"
          type="text"
          {...register("lastName", { required: true, minLength: 1, maxLength: 35, validate: isOnlyText })}
        />
        {errors.lastName && (<p>Last name not valid</p>)}

        <label>Email:</label>
        <input
          className="border-2 border-black"
          type="email"
          {...register("email", { required: true, minLength: 1, maxLength: 35, validate: isValidEmail })}
        />
        {errors.email && (<p>Email not valid</p>)}

        <label>Password:</label>
        <input
          className="border-2 border-black"
          type="password"
          {...register("password", { required: true, minLength: 7, maxLength: 35 })}
        />
        {errors.password && (<p>Password not valid</p>)}

        <label>Is admin:</label>
        <input
          type="checkbox"
          value={UserRole.admin}
          className="w-8 h-8"
          {...register("roles", { required: true })}
        />

        <label>Is teacher:</label>
        <input
          type="checkbox"
          value={UserRole.teacher}
          className="w-8 h-8"
          {...register("roles", { required: true })}
        />
        {errors.roles && (<p>Roles not valid</p>)}

        <label>Faculty:</label>
        <select className="border-2 border-black" {...register("facultyId", { required: true })}>
          {faculties.map(faculty => {
            return (<option key={faculty.id} value={faculty.id}>{faculty.name}</option>)
          })}
        </select>

        <label>Semester:</label>
        <select className="border-2 border-black" {...register("semesterId", { required: true })}>
          {semesters.map(semester => {
            return (<option key={semester.id} value={semester.id}>{`${semester.semesterType} ${semester.year}`}</option>)
          })}
        </select>

        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Create"></input>
        </div>
      </form>
      {completed &&
        <div className="laptop:mt-5 phone:mt-2 block text-center bg-green-400">
          <span>Success</span>
        </div>
      }
    </div>);
}