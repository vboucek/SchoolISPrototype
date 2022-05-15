import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loggedInUserAtom } from "../../state/atoms";
import "../../styles/tailwindStyles.css"

export const Logout = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post(`auth/logout`)
      .then(response => {
        setLoggedInUser(null);
        navigate("/login");
      });
  }

  return (
    <div className="flex flex-col laptop:mx-20 laptop:mt-20 phone:mx-2 phone:mt-0 text-black">
      <h1 className="flex font-bold laptop:text-5xl phone:text-4xl">Do you want to log out?</h1>
      <div className="flex flex-row mt-5 laptop:gap-5 phone:gap-3">
        <button className="laptop:w-32 phone:w-20 font-bold bg-gray-500"
        onClick={() => handleLogout()}>
          Yes
        </button>
        <button className="laptop:w-32 phone:w-20 font-bold bg-gray-500">
          No
        </button>
      </div>
    </div>
  )
}