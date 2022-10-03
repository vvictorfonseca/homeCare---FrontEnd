import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import styled from 'styled-components';

import UserContext from "../../context/userContext";
import ModalContext from "../../context/modalContext";

export default function Header() {

    const navigate = useNavigate()
    const { setType, setClientToken, setClientName, setClientCity, setClientPhoto } = useContext(UserContext)
    
    const { modalIsOpen, setModalIsOpen } = useContext(ModalContext)

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('city');
            window.localStorage.removeItem('fullName');
            window.localStorage.removeItem('photo');
            setClientToken(null);
            setClientName(null);
            setClientCity(null);
            setClientPhoto(null);
            navigate("/");
        }
    }

    return (
        <ContainerHeader style={{ opacity: modalIsOpen  === true ? `50%` : `100%`}}>
            <Logo>
                <H1>HomeCare</H1>
                <H2>Clients</H2>
            </Logo>
            
            <Options onClick={() => {
                setType("")
                navigate("/homePage/client")
            }}>Home</Options>

            <Options onClick={() => {
                navigate("/requests/client")
                setType("")
                setModalIsOpen(false)
            }}>Requests</Options>

            <ContainerLogOf>
                <ion-icon name="log-out-outline" onClick={() => logOut()} ></ion-icon>
            </ContainerLogOf>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    width: 100vw;
    height: 19vh;
    background-color: #292828;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display:flex;
    align-items: center;
    position: fixed;
    position: relative;
    z-index: 1;
`

const Logo = styled.div`
    width: 17.5vw;
    height: 15vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #55a381;
`
const H1 = styled.h1`
    font-size: 35px;
`
const H2 = styled.h2`
    font-size: 15px;
    font-style: italic;
    margin-left: 105px;
`
const Options = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.5vw;
    width: 8.75vw;
    height: 6vh;
    border-left: solid 0.5px #4e4e4e;
    border-right: solid 0.5px #4e4e4e;
    color: #55a381;
    cursor: pointer;
`
const ContainerLogOf = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    width: 5vw;
    height: 9vh;
    background-color: #4e4e4e;
    border-radius: 20px;
    position: absolute;
    right: 9vh;

    ion-icon{
        font-size:32px;
        color: #55a381;
        cursor: pointer;
    }
`