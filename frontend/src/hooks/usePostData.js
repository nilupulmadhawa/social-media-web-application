import { useQuery, useMutation } from "@tanstack/react-query";
import { addPost, getAllPosts } from "../services/post";

export const usePostData = () => {
    const { data, isLoading, isError, error, refetch } = useQuery(['posts'], async () => {
        const response = await getAllPosts();
        return response.data;
    });
    const { mutate } = useMutation(addPost, {
        onSuccess: () => refetch()
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        mutate
    }
}