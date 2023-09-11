import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCabinForm from "./CreateCabinForm"
import CabinTable from "./CabinTable"

// function AddCabin() {
//     // to show the form 
//     const [isOpenModal, setIsOpenModal] = useState(false)
//     // ui
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(prev => !prev)}>Add new Cabin</Button>
//             {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
//                 <CreateCabinForm onClose={() => setIsOpenModal(false)} />
//             </Modal>}
//         </div>
//     )
// }



function AddCabin() {
    return <Modal opens='cabin-form'>
        <Modal.Open>
            <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
            <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens='table'>
            <Button>
                Show table
            </Button>
        </Modal.Open>
        <Modal.Window name='table'>
            <CabinTable />
        </Modal.Window>
    </Modal>
}



export default AddCabin
