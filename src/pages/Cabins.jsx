import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";


function Cabins() {
    // to show the form 
    const [showForm, setShowForm] = useState(false)
    // ui
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter/sort</p>
            </Row>
            <Row>
                <CabinTable />
                <Button onClick={() => setShowForm(prev => !prev)}>Add new Cabin</Button>
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
