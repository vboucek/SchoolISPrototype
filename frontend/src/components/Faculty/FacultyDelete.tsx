import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const FacultyDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteFaculty = () => {
    axios.delete(`/semesters/${id}`)
      .then(response => {
        navigate("/admin")
      });
  };

  return (
    <div className="text-black phone:mt-0 laptop:mt-20 phone:mx-2 laptop:mx-20">
      <h1 className="font-bold laptop:text-6xl phone:text-3xl">Do you really want to delete this faculty?</h1>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row mt-5 w-32">
          <button onClick={() => handleDeleteFaculty} className="bg-gray-400 w-full border-black">Yes</button>
        </div>
        <div className="flex flex-row mt-5 w-32">
          <button onClick={() => navigate(`/user/${id}`)} className="bg-gray-400 w-full border-black">No</button>
        </div>
      </div>
    </div>
  );
}