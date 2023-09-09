import supabase from "./supabase"


// to get cabins 
export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) {
        console.log(error);
        throw new Error('Failed to get all cabins')
    }
    // if there wasnt any error
    return data;
}