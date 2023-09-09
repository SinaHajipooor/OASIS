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


// create new cabin or edit an exsisting cabin
export async function createOrEditCabin(newCabin, id) {
    // to find out if the user has changed the image or not 
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    // create image url (first check if the user has changed the image or not , we dont want to upload image twice)
    const imageName = hasImagePath ? newCabin.image : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    let query = supabase.from('cabins')
    // create cabin ( if there was an id in function parameters , it means that we are editing cabin so we dont want to create new one)
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    // edit
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)
    const { data, error } = await query.select().single();
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