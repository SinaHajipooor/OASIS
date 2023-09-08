import { styled } from "styled-components"
import GlobalStyles from "./styles/GlobalStyles";

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
background-color: var(--color-brand-500);
color: white;
`;


function App() {
    return (
        <>
            <GlobalStyles />
            <H1>
                test styled components
            </H1>
            <Button>Check In</Button>
        </>
    )
}

export default App



