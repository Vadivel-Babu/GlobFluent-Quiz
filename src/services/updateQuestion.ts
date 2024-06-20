import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Question } from "../types/question";

const update = async (data: Question) => {
  const response = await axios.put(
    `https://658a4e12ba789a962236e2f6.mockapi.io/questions/${data.id}`,
    data
  );

  return response;
};

export const updateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
