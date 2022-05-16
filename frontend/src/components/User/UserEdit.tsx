import axios, { AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IUserCreateDto } from "../../types/User-create.dto";
import { IUserDto } from "../../types/User.dto";
import "../../styles/tailwindStyles.css"
import { isOnlyText, isValidEmail } from "../../utils/FormConstraints";
import { UserRole } from "../../types/UserRole";
import { useEffect, useState } from "react";
import { ISemesterDto } from "../../types/Semester.dto";
import { IFacultyDto } from "../../types/Faculty.dto";
import { IUserEditDto } from "../../types/User-edit.dto";

export const UserEdit = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [semesters, setSemesters] = useState<ISemesterDto[]>([]);
  const [faculties, setFaculties] = useState<IFacultyDto[]>([]);
  const [user, setUser] = useState<IUserDto>();
  const [completed, setCompleted] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IUserEditDto>();
  const onSubmit: SubmitHandler<IUserEditDto> = (data) => {
    console.log(data);
    let roles : UserRole[] = [];
    if (data.isAdmin)
    {
      roles.push(UserRole.admin);
    }
    if (data.isTeacher)
    {
      roles.push(UserRole.teacher);
    }
    console.log("Puhs")
    axios.patch<IUserDto, AxiosResponse<IUserDto, IUserCreateDto>, IUserCreateDto>(`users/${id}`, 
    {...data, roles})
      .then(response => {
        console.log(response.data);
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
    axios.get<IUserDto>(`users/${id}`)
      .then(response => {
        setUser(response.data);
      });
  }, []);

  return (
    <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
      <h1 className="laptop:text-6xl phone:text-3xl font-bold">User edit</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>First name:</label>
        <input
          defaultValue={user?.firstName}
          className="border-2 border-black"
          type="text"
          {...register("firstName", { required: true, minLength: 1, maxLength: 35, validate: isOnlyText })}
        />
        {errors.firstName && (<p>First name not valid</p>)}

        <label>Last name:</label>
        <input
          defaultValue={user?.lastName}
          className="border-2 border-black"
          type="text"
          {...register("lastName", { required: true, minLength: 1, maxLength: 35, validate: isOnlyText })}
        />
        {errors.lastName && (<p>Last name not valid</p>)}

        <label>Email:</label>
        <input
          defaultValue={user?.email}
          className="border-2 border-black"
          type="email"
          {...register("email", { required: true, minLength: 1, maxLength: 35, validate: isValidEmail })}
        />
        {errors.email && (<p>Email not valid</p>)}

        <label>New password:</label>
        <input
          className="border-2 border-black"
          type="password"
          {...register("password", { required: true, minLength: 7, maxLength: 35 })}
        />
        {errors.password && (<p>Password not valid</p>)}

        <label>Is admin:</label>
        <input
          defaultChecked={user?.roles.includes(UserRole.admin)}
          type="checkbox"
          value={UserRole.admin}
          className="w-8 h-8"
          id="admin"
          {...register("isAdmin", { required: false })}
        />

        <label>Is teacher:</label>
        <input
          defaultChecked={user?.roles.includes(UserRole.teacher)}
          type="checkbox"
          value={UserRole.teacher}
          className="w-8 h-8"
          id="teacher"
          {...register("isTeacher", { required: false })}
        />

        <label>Faculty:</label>
        <select className="border-2 border-black" {...register("facultyId", { required: true })}>
          {faculties.map(faculty => {
            return (<option selected={user?.facultyId == faculty.id} key={faculty.id} value={faculty.id}>{faculty.name}</option>)
          })}
        </select>

        <label>Semester:</label>
        <select className="border-2 border-black" {...register("semesterId", { required: true })}>
          {semesters.map(semester => {
            return (<option selected={user?.semesterId == semester.id} key={semester.id} value={semester.id}>{`${semester.semesterType} ${semester.year}`}</option>)
          })}
        </select>

        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Edit"></input>
        </div>
      </form>
      {completed &&
        <div className="laptop:mt-5 phone:mt-2 block text-center bg-green-400">
          <span>Success</span>
        </div>
      }
    </div>);
}