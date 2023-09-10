import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner'
import { useUpdateSetting } from './useUpdateSetting';


function UpdateSettingsForm() {
    // get data from our custom hook ( we are destructuring the settings object right here) // set  the settings object into empty array as a initial value to not get error if there wasnt any value 
    const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings()
    // get data from setting hook
    const { isUpdating, updateSetting } = useUpdateSetting();
    // handle the inputs editing 
    function handleUpdate(e, feildName) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [feildName]: value })
    }
    // ui
    if (isLoading) return <Spinner />
    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={e => handleUpdate(e, 'minBookingLength')} disabled={isUpdating} />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={e => handleUpdate(e, 'maxBookingLength')} disabled={isUpdating} />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')} disabled={isUpdating} />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={e => handleUpdate(e, 'breakfastPrice')} disabled={isUpdating} />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
