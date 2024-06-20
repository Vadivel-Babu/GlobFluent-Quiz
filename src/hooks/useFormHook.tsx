import { useState } from "react";
import { message } from "antd";

const useFormHook = () => {
  const [opt, setOpt] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (opt.trim().length === 0) {
      messageApi.error("Enter valid option...");
      return;
    }
    setOptions([...options, opt]);
    setOpt("");
  };

  const handleDeleteOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const filtered = options.filter((_, i) => i !== index);
    setOptions(filtered);
  };

  return {
    handleAddOption,
    handleDeleteOption,
    opt,
    setOpt,
    options,
    contextHolder,
    setQuestion,
    setAnswer,
    question,
    answer,
    messageApi,
    setOptions,
  };
};

export default useFormHook;
