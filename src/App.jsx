import { styled } from "styled-components"

const H1 = styled.h1`
font-size : 50px;
font-weight:600;
`;
const Button = styled.button`
font-size: 1.4rem;
padding: 1.2rem 1.6rem;
font-weight: 5000;
border: none;
border-radius: 7px ;
background-color: purple;
color: white;
`;


function App() {
    return (
        <>
            <H1>
                test styled components
            </H1>
            <Button>Check In</Button>
        </>
    )
}

export default App



