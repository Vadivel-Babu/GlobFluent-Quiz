import { useNavigate, useParams } from "react-router-dom";
import getAllQuestions from "../services/getAllQuestions";

const Result = () => {
  const { score } = useParams();
  const { data } = getAllQuestions();

  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mt-5 flex mx-auto flex-col md:flex-row sm:gap-[50px] flex-wrap lg:gap-[150px] py-2 px-5">
        <div className="flex-[0.8]">
          <h1 className="text-2xl w-full sm:text-4xl lg:text-5xl mt-3 mb-5 sm:mb-10 lg:mb-52">
            Quiz completed <br />
            <span className="font-bold">You scored...</span>
          </h1>
        </div>
        <div>
          <div className=" md:w-[500px] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl py-10 px-5">
            <div className="flex  gap-7">
              <h1 className="font-bold uppercase text-xl">Quizz</h1>
            </div>
            <h1 className="text-[80px] font-semibold">{score}</h1>
            <p className="text-grayNavy dark:text-bluish">
              out of {data?.data.length}
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/");
              localStorage.removeItem("score");
              localStorage.removeItem("answer");
              localStorage.removeItem("index");
            }}
            className="w-[100%] bg-yellow-500  text-[#fff] font-medium text-lg mt-5 rounded-xl py-5 hover:bg-yellow-400/70"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
