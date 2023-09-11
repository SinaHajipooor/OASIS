import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// context
const ModalContext = createContext();

// parent 
function Modal({ children }) {
    // states
    const [openName, setOpenName] = useState('');
    // handlers
    const close = () => setOpenName('');
    const open = setOpenName;

    return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
}


function Open({ children, opens: opensWindowName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(opensWindowName) });
}


function Window({ children, name, }) {
    // states
    const { openName, close } = useContext(ModalContext);
    // to select the modal
    const ref = useRef()
    // close the modal when ever the user click on out of modal 
    useEffect(function () {
        function handleClick(e) {
            // to define if the user has clicked out of the modal or inside the modal (we want to close the modal if the user has clicked out side of the modal)
            if (ref.current && !ref.current.contains(e.target)) close();
        }
        document.addEventListener('click', handleClick, true);

        // clean up
        return () => document.removeEventListener('click', handleClick, true);
    }, [close])
    if (name !== openName) return null;
    // ui
    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    )
}


// place the peoperties on the modal
Modal.Open = Open;
Modal.Window = Window;



export default Modal

