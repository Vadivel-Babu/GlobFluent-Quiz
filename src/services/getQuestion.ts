import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSingleQuestion = async (id: string) => {
  console.log(id);
  const response = await axios.get(
    `https://658a4e12ba789a962236e2f6.mockapi.io/questions/${id}`
  );
  return response;
};

const getQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getSingleQuestion(id),
  });
};

export default getQuestion;
