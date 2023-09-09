import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {

    // get query client to invalidate data after we add new cabin , to refetch all the cabins after that 
    const queryClient = useQueryClient()
    // get the mutation because here we want to add new cabin
    const { isLaoding: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createOrEditCabin,
        onSuccess: () => {
            toast.success('New Cabin successfully created')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });

        },
        onError: () => {
            toast.error('Couldnt create new cabin')
        }
    });
    return { isCreating, createCabin }

}