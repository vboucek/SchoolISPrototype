import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/tailwindStyles.css"
import { IFacultyDto } from "../../types/faculty.dto";
import { ISemesterDto } from "../../types/semester.dto";
import { IUserDto } from "../../types/User.dto";

export const AdminPageOverview = () => {
  const [semesters, setSemesters] = useState<ISemesterDto[]>([]);
  const [faculties, setFaculties] = useState<IFacultyDto[]>([]);
  const [users, setUsers] = useState<IUserDto[]>([]);

  useEffect(() => {
    axios.get<ISemesterDto[]>(`semesters`)
      .then(response => {
        setSemesters(response.data);
      });
    axios.get<IFacultyDto[]>(`faculties`)
      .then(response => {
        setFaculties(response.data);
      });
    axios.get<IUserDto[]>(`users`)
      .then(response => {
        setUsers(response.data);
      });
  }, []);

  return (
    <div className="text-black phone:mt-0 laptop:mt-20 phone:mx-2 laptop:mx-20">
      <h1 className="laptop:text-6xl phone:text-4xl font-bold">Admin page</h1>
      {/* Faculties */}
      <div className="border-2 border-black mt-10 p-4 shadow-md shadow-black">
        <h2 className="laptop:text-4xl phone:text-3xl">Faculties</h2>
        <div className="flex flex-row flex-wrap gap-5 mt-4">
          {faculties.map(faculty => {
            return (
              <div className="flex flex-col justify-between border-2 
              border-black laptop:w-40 phone:w-32 p-2 shadow-md shadow-black">
                <span className="flex laptop:text-3xl phone:text-xl">{faculty.name}</span>
                <img className="flex max-w-full w-full" src="http://placekitten.com/100/100" alt="logoImage"></img>
              </div>)
          })}
        </div>
        <div className="flex flex-row mt-5 w-32">
          <button className="bg-gray-400 w-full border-black">Create</button>
        </div>
      </div >
      {/* Semesters */}
      <div className="border-2 border-black mt-10 p-4 shadow-md shadow-black">
        <h2 className="laptop:text-4xl phone:text-3xl">Semesters</h2>
        <div className="flex flex-row flex-wrap gap-5 mt-4">
          {semesters.map(semester => {
            return (
              <div className="block border-2 border-black laptop:w-32 p-2 shadow-md shadow-black">
                <span className="block laptop:text-2xl phone:text-xl">{semester.semesterType}</span>
                <span className="block laptop:text-2xl phone:text-xl">{semester.year}</span>
              </div>)
          })}
        </div>
        <div className="flex flex-row mt-5 w-32">
          <button className="bg-gray-400 w-full border-black">Create</button>
        </div>
      </div>
      {/* Courses */}
      <div className="border-2 p-4 border-black mt-10 shadow-md shadow-black">
        <h2 className="laptop:text-4xl">Courses</h2>
      </div>
      {/* Users */}
      <div className="border-2 p-4 border-black mt-10 shadow-md shadow-black">
        <h2 className="laptop:text-4xl">Users</h2>
        <div className="flex flex-row flex-wrap gap-5 mt-4">
          {users.map((user) => {
            return (
              <div className="flex flex-col justify-between border-2 
              border-black laptop:w-36 phone:w-32 p-2 shadow-md shadow-black">
                <span className="flex laptop:text-2xl">{`${user.firstName} ${user.lastName}`}</span>
                <img className="flex max-w-full w-full" src="http://placekitten.com/100/100" alt="logoImage"></img>
              </div>)
          })}
        </div>
        <div className="flex flex-row mt-5 w-32">
          <button className="bg-gray-400 w-full border-black">Create</button>
        </div>
      </div>
    </div>);
}