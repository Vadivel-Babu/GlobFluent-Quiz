import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuestions = async () => {
  const response = await axios.get(
    "https://658a4e12ba789a962236e2f6.mockapi.io/questions"
  );
  return response;
};

const getAllQuestions = () => {
  return useQuery({ queryKey: ["questions"], queryFn: getQuestions });
};

export default getAllQuestions;
