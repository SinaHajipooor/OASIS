import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {

    // to get the query client
    const queryClient = useQueryClient()
    // get the loading status and also the mutate function from react query
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        // this method will run just after the mutate function has been implemented
        onSuccess: () => {
            toast.success('Cabin successfully deleted')
            // by invalidating the cache data we force the ui to refresh after we have deleting 
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: err => toast.error(err.message)
    });

    return { isDeleting, deleteCabin }
}