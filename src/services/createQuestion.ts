import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Question } from "../types/question";

const postQuestion = async (data: Question) => {
  const response = await axios.post(
    "https://658a4e12ba789a962236e2f6.mockapi.io/questions",
    data
  );
  return response;
};

const createQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      console.log("ji");
    },
  });
};

export default createQuestion;
