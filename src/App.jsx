import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";


function App() {
    return (
        <>
            <GlobalStyles />
            <Heading as='h1'>test styled components</Heading>
            <Heading as='h2'>test styled components</Heading>
            <Heading as='h3'>test styled components</Heading>
            <Button>Check In</Button>
            <Input></Input>
        </>
    )
}

export default App



