import axios from "axios";
import { useEffect, useState } from "react"
import "../../styles/tailwindStyles.css"
import { IUserDto } from "../../types/User.dto"

import SubjectPreview from "../SubjectPreview/SubjectPreview"

export interface IUserPageProps {
    userId: number;
}

export const UserPage = ({ userId }: IUserPageProps) => {
    const [user, setUser] = useState<IUserDto>();
    
    useEffect(() => {
        axios.get<IUserDto>(`users/${userId}`)
          .then(response => {
            setUser(response.data);
          });
      }, []);

    if (!user)
    {
        return (<div></div>);
    }

    return (
        <div className="text-black laptop:mt-20 laptop:mx-20 phone:mt-0 phone:mx-2">
            {/* User card */}
            <div className="flex">
                <div className="flex">
                    <img className="flex w-full max-w-full aspect-square" src="http://placekitten.com/200/200" alt="" />
                </div>
                <div className="flex w-4/6 flex-col px-6 py-2 justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-4xl">{`${user.firstName} ${user.lastName}`}</span>
                        <span className="text-2xl">{`identifier ${user.id}`}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl">{`semester: ${user.semesterId}`}</span>
                        <span className="text-2xl">{`faculty: ${user.facultyId}`}</span>
                    </div>
                </div>
                <div className="flex flex-col px-3 w-2/6 border-l-2 border-gray-700 justify-between">
                    <button className="m-2 bg-gray-400">Edit profile</button>
                    <button className="m-2 bg-red-400">Delete profile</button>
                    <div className="flex flex-col">
                        <span>{`email: ${user.email}`}</span>
                        <span>{`roles: ${user.roles.reduce((prev, current) => `${prev} ${current.toString()},`, "")} human`}</span>
                    </div>
                </div>
            </div>
            {/* User subjects and taught subjects */}
            <div className="flex w-full flex-col text-white phone:p-0 phone:my-4 laptop:my-10 laptop:px-20 gap-10">
                <div>
                    <h3 className="text-black">Subjects taught by this person</h3>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                </div>
                <div>
                    <h3 className="text-black">Subjects this person has</h3>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                    <SubjectPreview code="PB138" title="Suffering" credits={5} endType="z"></SubjectPreview>
                </div>
            </div>
        </div>
    )
}