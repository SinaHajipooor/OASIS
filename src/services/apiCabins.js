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


// delete cabin
export async function deleteCabin(id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.log(error);
        throw new Error('failed to delete cabin')
    }

    return data;
}


// create new cabin
export async function createCabin(newCabin) {
    const { data, error } = await supabase.from('cabins').insert([newCabin]);
    if (error) {
        console.log(error.message);
        throw new Error('Failed to create new cabin');
    }
    return data;
}