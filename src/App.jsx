import { styled } from "styled-components"
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";


const H1 = styled.h1`
font-size : 50px;
font-weight:600;
`;



function App() {
    return (
        <>
            <GlobalStyles />
            <H1>
                test styled components
            </H1>
            <Button>Check In</Button>
            <Input></Input>
        </>
    )
}

export default App



