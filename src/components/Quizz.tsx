import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import getAllQuestions from "../services/getAllQuestions";

const Quizz = () => {
  const navigate = useNavigate();
  const { data, isLoading } = getAllQuestions();
  const [answer, setAnswer] = useState(() => {
    //@ts-ignore
    return JSON.parse(localStorage.getItem("answer")) || "";
  });
  const [index, setIndex] = useState(() => {
    //@ts-ignore
    return JSON.parse(localStorage.getItem("index")) || 0;
  });
  const [error, setError] = useState(false);
  const [crtAnswer, setCrtAnswer] = useState(false);
  const [score, setScore] = useState(() => {
    //@ts-ignore
    return JSON.parse(localStorage.getItem("score")) || 0;
  });
  const [wrongAns, setWrongAns] = useState(false);
  const [check, setCheck] = useState(false);

  //setscore and setindex
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("answer", JSON.stringify(answer));
  }, [score, index, answer]);

  function checkAnswer() {
    setCheck(true);
    if (answer === data?.data[index].answer) {
      setCrtAnswer(true);
      setScore((score: number) => score + 1);
    } else {
      setWrongAns(true);
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mt-5 flex mx-auto flex-col sm:flex-row sm:gap-[50px] flex-wrap lg:gap-[150px] py-2 px-5">
        <div className="flex-[0.8]">
          <span className="italic text-grayNavy dark:text-bluish">
            Questions {index + 1} of {data?.data.length}
          </span>
          <h1 className="font-semibold text-2xl w-full sm:text-3xl mt-3 mb-5 sm:mb-10 lg:mb-52">
            {data?.data.length === 0 ? "hi" : data?.data[index].question}
          </h1>
          <Progress percent={Math.ceil((index / data?.data.length) * 100)} />
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex-1">
            {data?.data[index].options.map((option: string, i: number) => (
              <div
                key={i}
                onClick={() => {
                  if (check) {
                    return;
                  }
                  setError(false);
                  setAnswer(option);
                }}
                className={`flex h-[70px] items-center cursor-pointer group justify-between  ${
                  !crtAnswer && !wrongAns && option === answer
                    ? "border-2 border-yellow-400 "
                    : ""
                } ${
                  crtAnswer && option === answer
                    ? "border-2 border-green-500"
                    : ""
                } ${
                  wrongAns && option === answer
                    ? "border-2 border-red-500"
                    : "text-grayNavy"
                } p-2 gap-3  sm:max-w-[400px] mb-5 mt-5 sm:mt-0 rounded-xl shadow-xl`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`bg-gray-200 group-hover:bg-yellow-200  ${
                      crtAnswer && option === answer
                        ? "bg-green-500 text-white"
                        : "text-grayNavy"
                    } ${
                      !crtAnswer && !wrongAns && option === answer
                        ? "bg-[#F6E7FF] "
                        : "text-black"
                    }
                    ${
                      wrongAns && option === answer
                        ? "bg-red-500 text-white "
                        : "text-black"
                    } group-hover:text-purple  text-lg font-bold rounded-md w-7 flex justify-center`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-lg font-bold">{option}</p>
                </div>
                {wrongAns && option === answer && (
                  <IoIosCloseCircleOutline className="text-red-500 text-3xl" />
                )}
                {option === data?.data[index].answer && check && (
                  <IoIosCheckmarkCircleOutline className="text-green-500 text-3xl" />
                )}
              </div>
            ))}
            {index !== data?.data.length - 1
              ? (crtAnswer || wrongAns) && (
                  <button
                    onClick={() => {
                      if (index === data?.data.length - 1) {
                        return;
                      }
                      setIndex(index + 1);
                      setAnswer("");
                      setCrtAnswer(false);
                      setWrongAns(false);
                      setCheck(false);
                    }}
                    className="w-full bg-yellow-400 sm:max-w-[400px]  font-medium text-lg rounded-xl py-5 hover:bg-purple/70"
                  >
                    Next Question
                  </button>
                )
              : (crtAnswer || wrongAns) && (
                  <button
                    onClick={() => {
                      navigate(`/result/${score}`);
                    }}
                    className="w-full bg-yellow-400 sm:max-w-[400px]  font-medium text-lg rounded-xl py-5 hover:bg-purple/70"
                  >
                    Finish Test
                  </button>
                )}
            {!crtAnswer && !wrongAns ? (
              <button
                onClick={() => {
                  if (answer.trim().length === 0) {
                    setError(true);
                    return;
                  }
                  checkAnswer();
                }}
                className="w-full bg-yellow-400 sm:max-w-[400px] font-medium text-lg rounded-xl py-5 hover:bg-purple/70"
              >
                Submit Answer
              </button>
            ) : (
              ""
            )}
            {error && (
              <p className="text-red-500 font-bold mt-1">
                Please select an answer
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizz;
