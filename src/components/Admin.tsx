import { Pagination, Spin } from "antd";

import { useNavigate } from "react-router-dom";

import { Question } from "../types/question";
import getAllQuestions from "../services/getAllQuestions";
import deleteQuestion from "../services/deleteQuestion";

const Admin = () => {
  const navigate = useNavigate();
  const { data, isLoading } = getAllQuestions();
  const { isPending, mutate } = deleteQuestion();

  const handlePagination = (e: number) => {
    console.log(e);
  };
  return (
    <div>
      <div className="p-5 shadow-xl w-max border-l-[8px] border-yellow-500">
        <h1 className="text-2xl font-semibold capitalize flex items-center gap-4">
          Total questions:{" "}
          <span className="text-5xl font-bold text-yellow-500">
            {data?.data.length}
          </span>
        </h1>
        <button
          onClick={() => navigate(`create`)}
          className="bg-yellow-300 py-1 px-4 rounded-md font-semibold"
        >
          Create Question
        </button>
      </div>
      {isLoading ? (
        <p className="mt-10 w-max mx-auto">
          <Spin size="large" />
        </p>
      ) : (
        <div className="mt-10 flex  justify-center mx-auto max-w-[1200px] flex-wrap gap-2">
          {data?.data.map((question: Question) => (
            <div
              className="p-4 border rounded-md shadow-md w-[350px] space-y-3"
              key={question.id}
            >
              <h1 className="text-lg text-slate-500 font-semibold capitalize flex items-center gap-4">
                Question:{" "}
                <span className="text-black text-sm">{question.question}</span>{" "}
              </h1>
              <h1 className="text-lg text-slate-500 font-semibold capitalize flex items-center gap-4">
                Answer:{" "}
                <span className="text-black text-sm">{question.answer}</span>
              </h1>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`edit/${question.id}`)}
                  className="bg-yellow-500 py-1 px-4 rounded-md"
                >
                  Edit
                </button>
                <button
                  disabled={isPending}
                  onClick={() => mutate(question.id)}
                  className="bg-red-500 py-1 px-4 rounded-md text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        className="mt-10"
        total={20}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultPageSize={10}
        defaultCurrent={1}
        onChange={handlePagination}
      />
    </div>
  );
};

export default Admin;
