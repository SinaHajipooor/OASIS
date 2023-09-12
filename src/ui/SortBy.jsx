import { useState } from "react"
import Select from "./Select"
import { useSearchParams } from "react-router-dom"

function SortBy({ options }) {

    const [searchParams, setSearchParams] = useSearchParams()
    // handle user click
    function handlChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams);
    }

    return (
        <Select options={options} type='white' onChange={handlChange} />
    )
}

export default SortBy
