import supabase, { supabaseUrl } from "./supabase"


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
    // create image url 
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // create cabin
    const { data, error } = await supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);
    // eror handling while the cabin is creating (without uploading file)
    if (error) {
        console.log(error.message);
        throw new Error('Failed to create new cabin');
    }
    // upload image  
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

    // delete cabin if there was an error while uploading image  
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);
        console.error(storageError);
        throw new Error('Failed to create cabin (couldnt upload the image)')
    }

    return data;
}