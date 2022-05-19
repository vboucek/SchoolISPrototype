import axios, { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInUserAtom } from "../../state/atoms";
import { IAuthDto } from "../../types/Auth.dto";
import { IUserDto } from "../../types/User.dto";
import { isValidEmail } from "../../utils/FormConstraints";

export const Login = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthDto>();
  const onSubmit: SubmitHandler<IAuthDto> = (dataAuth) => {
    axios.post<IUserDto,AxiosResponse<IUserDto,IAuthDto>,IAuthDto>(`auth/login`, dataAuth)
      .then(response => {
        console.log(response);
        setLoggedInUser(response.data);
        navigate(`/user/${response.data.id}`)
      });
  };

  return (
    <div className="text-black phone:mx-10 laptop:mx-32 laptop:mt-20" >
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input
          className="border-2 border-black"
          type="email"
          {...register("email", { required: true, minLength: 1, maxLength: 35, validate: isValidEmail })}
        />
        {errors.email && (<p>Email not valid</p>)}

        <label>Password</label>
        <input
          className="border-2 border-black"
          type="password"
          {...register("password", { required: true, minLength: 1, maxLength: 35 })}
        />
        {errors.password && (<p>Password not valid</p>)}
        <div className="flex justify-center laptop:mt-8 phone:mt-4">
          <input className="bg-gray-500 w-32" type="submit" value="Login"></input>
        </div>
      </form>
    </div>);
}
