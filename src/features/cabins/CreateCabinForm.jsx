import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    // get the default values that we pass when the user open the form to edit
    const { id: editId, ...editValues } = cabinToEdit;
    // to find out if we are using the form to edit or to create
    const isEditSession = Boolean(editId);
    // control form  ( getValues gives us the value of the form elements)
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: isEditSession ? editValues : {} });
    // get the forms error from  formState 
    const { errors } = formState;
    // get the create hook
    const { isCreating, createCabin } = useCreateCabin();
    // get the edit hook 
    const { isEditing, editCabin } = useEditCabin();
    // submite handler 
    function submitHnadler(data) {
        // to find out what image we are passing (file or path)
        const image = typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, {
            onSuccess: (data) => {
                reset();
                onCloseModal?.();
            }
        });
        // use the mutate function to mutate the remote state and this method is connected to our createCabin method that we wrote in apiCabins file and we need to pass the new cabin object to it
        // we can also access the onSuccess function here when we mutate state by passing an object as a second parameter
        else createCabin({ ...data, image: image }, {
            onSuccess: (data) => {
                reset();
                onCloseModal?.();
            }
        })
    }
    // we passed a validator object into our form elements and when ever one of the form elements wasnt valid , then this method will execute (onError function that we pass into the handleSubmit ) , this method automatically recive the errors that we got
    function onError(errors) {
        console.log(errors)
    }
    // ui 
    const isWorking = isCreating || isEditing;
    return (
        <Form onSubmit={handleSubmit(submitHnadler, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow lable='Cabin name' error={errors?.name?.message}>
                <Input type="text" id="name"  {...register('name', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow lable='maximum Capacity' error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity" {...register('maxCapacity', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'Capacity should be at least 1'
                    }
                })} />
            </FormRow>

            <FormRow lable='regular price' error={errors?.regularPrice?.message}>
                <Input type="number" id="regularPrice" {...register('regularPrice', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'price should be at least 1'
                    }
                })} />
            </FormRow>
            <FormRow lable='Discount' error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0} {...register('discount', {
                    required: 'This field is required',
                    // this custom validator function get the current value of the element automatically
                    //     validate: (value) => value > getValues().regularPrice
                })} />
            </FormRow>

            <FormRow lable='description' error={errors?.description?.message}>
                <Textarea type="number" id="description" defaultValue=""  {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>
            <FormRow lable='cabin photo'>
                <FileInput id="image" accept="image/*"  {...register('image', { required: isEditSession ? false : 'This is a required field' })} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create new Cabin'}</Button>
            </FormRow>
        </Form>

    );
}

export default CreateCabinForm;
