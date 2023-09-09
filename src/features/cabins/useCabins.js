import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// to fetch data 
export function useCabins() {
    // states
    const { isLoading, data: cabins } = useQuery({
        queryKey: ['cabins'],
        // queryFn is a function that make the query to the api and also this function should return a promise 
        queryFn: getCabins
    });

    return { isLoading, cabins }
}