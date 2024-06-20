import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const remove = async (id: string | undefined) => {
  console.log(id);

  const response = await axios.delete(
    `https://658a4e12ba789a962236e2f6.mockapi.io/questions/${id}`
  );
  return response;
};

const deleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export default deleteQuestion;
