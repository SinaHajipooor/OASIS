import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    // get query client to invalidate data after we add new cabin , to refetch all the cabins after that 
    const queryClient = useQueryClient()
    // get the mutation because here we want to edit cabin
    const { isLaoding: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin successfully edited')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: () => {
            toast.error('Couldnt create new cabin')
        }
    });

    return { isEditing, editCabin };
}