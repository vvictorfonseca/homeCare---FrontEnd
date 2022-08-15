import styled from "styled-components"
import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import UserContext from "./context/userContext"

import ProfessionalHeader from "./ProfessionalHeader"

function ProfessionalDescription() {

    const navigate = useNavigate()

    const { professionalToken, professionalName, professionalCity, professionalPhoto, professionalDescription, update, setUpdate } = useContext(UserContext)
    
    const [description, setDescription] = useState("")

    const config = {
        headers: {
            Authorization: `Bearer ${professionalToken}`
        }
    }

    const obj = {
        description: description
    }

    function updateDescription() {
        const URL = "http://localhost:5000/update/description"

        const promise = axios.put(URL, obj, config)

        promise.then(response => {
            console.log("deu bom", response.status)
            const professionalDescription = JSON.stringify(obj.description)
            localStorage.setItem('professinalDescription', professionalDescription)
            update ? setUpdate(false) : setUpdate(true)
            alert("Descrição atualizada")
            navigate("/homePage/professional")
        })
    }

    return (
        <Container>
            <ProfessionalHeader />

            <ProfileSidebar>
                <ContainerInfos>
                    <img src={professionalPhoto} ></img>
                    <p>{professionalName}</p>
                    <p>{professionalCity}</p>

                </ContainerInfos>
            </ProfileSidebar>
            
            <Body>
                <H1>
                    <h1>Atualize abaixo sua descrição</h1>
                </H1>

                <textarea value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>

                <button onClick={() => updateDescription()} >Atualizar</button>

            </Body>
        </Container>
    )
}

const Container = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    background-color: #333333;
`
const ProfileSidebar = styled.div`
    margin-top: 19vh;
    width: 17.5vw;
    //height: 100vh;
    position:fixed;
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    width: 14vw;

    img {
        margin: 25px auto 0px auto;
        width: 191px;
        height: 191px;
        border-radius: 50%;
        border: solid 2px #413f3f;
    }

    p {
        font-size: 18px;
        color: white;
        margin-top: 10px;
        font-weight: 700;
    }

    p:nth-child(3) {
        font-size: 14px;
        color:white;
        margin-top: 5px;
        font-weight: 300;
    }

    p:last-of-type {
        font-size: 14px;
        color:white;
        margin-top: 10px;
        font-weight: 300;
    }
`
const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto auto;
    width: 65vw;
    border-left: solid 0.5px #4e4e4e;
    border-right: solid 0.5px #4e4e4e;
    margin-top: 125px;

    textarea {
        width: 50vw;;
        height: 30vh;
        margin-top: 25px;
    }

    button {
        margin: 40px auto;
        border-radius: 8px;
        border: none;
        width: 15vw;
        height: 8vh;
        background-color: #55a381;
        color: white;
        cursor: pointer;
    }
`
const H1 = styled.div`
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //margin-top: 22vh;
    width: 64.60vw;
    height: 20vh;
    background-color: #333333;
    color: white;
    margin-top: 20px;
    h1 {
        font-size: 35px;
    }
`

export default ProfessionalDescription