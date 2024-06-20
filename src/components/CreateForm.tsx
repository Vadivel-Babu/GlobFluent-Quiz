import { Button, Input } from "antd";

import { FaTrash } from "react-icons/fa6";
import useFormHook from "../hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import createQuestion from "../services/createQuestion";

const CreateForm = () => {
  const navigate = useNavigate();
  const { mutate, isError, error, isPending } = createQuestion();
  const {
    opt,
    setOpt,
    handleAddOption,
    handleDeleteOption,
    options,
    contextHolder,
    answer,
    question,
    setQuestion,
    setAnswer,
    messageApi,
    setOptions,
  } = useFormHook();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim().length === 0) {
      messageApi.error("Enter Valid question");
      return;
    }
    if (answer.trim().length === 0) {
      messageApi.error("Enter Valid answer");
      return;
    }
    if (options.length <= 1) {
      messageApi.error("pls provide atleast 2 option");
      return;
    }
    let isValidOption = options.find((option) => option === answer);
    if (!isValidOption) {
      messageApi.error("the given option doesn't contain answer");
      return;
    }
    const newData = {
      question,
      answer,
      options,
    };

    mutate(newData);

    if (isError) {
      messageApi.error(error.message);
      return;
    }

    messageApi.success("Question created succesfully");
    setQuestion("");
    setAnswer("");
    setOptions([]);
  };
  return (
    <>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-[400px] mx-auto shadow-md p-3 rounded-md"
      >
        {contextHolder}
        <h1 className="text-lg font-semibold text-center mb-2">
          Create Question
        </h1>
        <Input
          placeholder="Enter Question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <Input
          placeholder="Enter Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <div className="flex flex-wrap">
          <Input
            placeholder="Enter option..."
            value={opt}
            onChange={(e) => setOpt(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAddOption}
              className="bg-yellow-400 py-2 px-5 rounded-lg transistion hover:bg-yellow-300"
            >
              Add Option
            </button>
            <button
              disabled={isPending}
              className="py-2 px-5 bg-green-800  capitalize text-white text-sm rounded-lg "
            >
              {isPending ? "creating..." : "create question"}
            </button>
          </div>
        </div>
        {options.map((option, i) => (
          <div
            key={i}
            className="border p-2 mt-2 flex justify-between items-start"
          >
            <h1 className="font-semibold text-lg">{option}</h1>
            <button
              onClick={(e) => handleDeleteOption(e, i)}
              className="p-3 bg-red-500 text-white text-sm rounded-lg"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </form>
    </>
  );
};

export default CreateForm;
