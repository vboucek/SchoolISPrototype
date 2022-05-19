import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const UserDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    axios.delete(`/users/${id}`)
      .then(response => {
        console.log("PICOVINA");
        console.log(response);
        //navigate("/admin")
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="text-black phone:mt-0 laptop:mt-20 phone:mx-2 laptop:mx-20">
      <h1 className="font-bold laptop:text-6xl phone:text-3xl">Do you really want to delete this user?</h1>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row mt-5 w-32">
          <button onClick={() => handleDeleteUser()} className="bg-gray-400 w-full border-black">Yes</button>
        </div>
        <div className="flex flex-row mt-5 w-32">
          <button onClick={() => navigate(`/user/${id}`)} className="bg-gray-400 w-full border-black">No</button>
        </div>
      </div>
    </div>
  );
}