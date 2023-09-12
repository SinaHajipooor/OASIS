import Select from "./Select"
import { useSearchParams } from "react-router-dom"

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    // get the currently value
    const sortBy = searchParams.get('sortBy') || '';
    // handle user click
    function handlChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams);
    }

    return (
        <Select options={options} type='white' onChange={handlChange} value={sortBy} />
    )
}

export default SortBy
