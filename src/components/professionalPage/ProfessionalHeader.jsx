import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import styled from 'styled-components';

import UserContext from '../../context/userContext';

export default function ProfessionalHeader() {

    const navigate = useNavigate()

    const { setProfessionalToken, setProfessionalName, setProfessionalCity, setProfessionalPhoto, setProfessionalDescription, setPage } = useContext(UserContext)

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('professionalToken');
            window.localStorage.removeItem('professionalCity');
            window.localStorage.removeItem('professionalFullName');
            window.localStorage.removeItem('professionalPhoto');
            window.localStorage.removeItem('professionalDescription')
            setProfessionalToken(null)
            setProfessionalCity(null)
            setProfessionalCity(null)
            setProfessionalPhoto(null)
            setProfessionalDescription(null)
            navigate("/");
        }
    }

    return (
        <ContainerHeader>
            <Logo>
                <H1>HomeCare</H1>
                <H2>Professionals</H2>
            </Logo>

            <Options onClick={() => {
                navigate("/homePage/professional")
            }}>Menu</Options>

            <Options onClick={() => {
                navigate("/evaluations")
            }}>Avaliações</Options>
            
            <ContainerLogOf>
                <ion-icon name="log-out-outline" onClick={() => logOut()} ></ion-icon>
            </ContainerLogOf>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    width: 100vw;
    height: 19vh;
    background-color:  #55a381;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display:flex;
    align-items: center;
    position: fixed;
    z-index: 1;
`

const Logo = styled.div`
    width: 17.5vw;
    height: 15vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333333;
`
const H1 = styled.h1`
    font-size: 35px;
`
const H2 = styled.h2`
    font-size: 15px;
    font-style: italic;
    margin-left: 65px;
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
    color: #333333;
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