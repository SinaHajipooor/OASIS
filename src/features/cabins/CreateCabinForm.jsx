import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";



const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
    // control form  ( getValues gives us the value of the form elements)
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    // get the forms error from  formState 
    const { errors } = formState;
    // get query client to invalidate data after we add new cabin , to refetch all the cabins after that 
    const queryClient = useQueryClient()
    // get the mutation because here we want to add new cabin
    const { isLaoding, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('New Cabin successfully created')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            // reset the form  
            reset();
        },
        onError: () => {
            toast.error('Couldnt create new cabin')
        }
    });
    // submite handler 
    function submitHnadler(data) {
        // use the mutate function to mutate the remote state and this method is connected to our createCabin method that we wrote in apiCabins file and we need to pass the new cabin object to it
        mutate(data)
    }
    // we passed a validator object into our form elements and when ever one of the form elements wasnt valid , then this method will execute (onError function that we pass into the handleSubmit ) , this method automatically recive the errors that we got
    function onError(errors) {
        console.log(errors)
    }
    // ui 
    return (
        <Form onSubmit={handleSubmit(submitHnadler, onError)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input type="text" id="name"  {...register('name', {
                    required: 'This field is required'
                })} />
                {/* display the error component if this field has any error in our form  */}
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input type="number" id="maxCapacity" {...register('maxCapacity', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'Capacity should be at least 1'
                    }
                })} />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input type="number" id="regularPrice" {...register('regularPrice', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: 'price should be at least 1'
                    }
                })} />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input type="number" id="discount" defaultValue={0} {...register('discount', {
                    required: 'This field is required',
                    // this custom validator function get the current value of the element automatically
                    validate: (value) => value <= getValues().regularPrice || 'Discount should be less than the regular price '
                })} />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea type="number" id="description" defaultValue=""  {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLaoding}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
