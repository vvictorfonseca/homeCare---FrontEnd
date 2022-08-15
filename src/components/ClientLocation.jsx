import styled from "styled-components"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import UserContext from "./context/userContext"

import Header from "./Header"

function ClientLocation() {

    const navigate = useNavigate()

    const { reload, setReload, update, setUpdate, setType } = useContext(UserContext)
    const { clientToken } = useContext(UserContext)

    const [clientAddress, setClientAddress] = useState({ clientCity: "", clientDistrict: "", clientStreet: "", clientNumber: "", clientComplement: "", clientZip: "" })

    const clientAddressRegister = {
        city: clientAddress.clientCity,
        district: clientAddress.clientDistrict,
        street: clientAddress.clientStreet,
        number: parseInt(clientAddress.clientNumber),
        complement: clientAddress.clientComplement,
        zipCode: clientAddress.clientZip
    }

    
    const config = {
        headers: {
            Authorization: `Bearer ${clientToken}`
        }
    }

    function updateLocation(e) {
        e.preventDefault()

        const urlAddress = "https://home-care-app.herokuapp.com/update/location"

        console.log("entrou aqui")

        const promise = axios.put(urlAddress, clientAddressRegister, config)
        
        promise.then(response => {
            console.log("entrou carai", response.status)
            const city = JSON.stringify(clientAddressRegister.city)
            localStorage.setItem('city', city)
            update ? setUpdate(false) : setUpdate(true)
            reload ? setReload(false) : setReload(true)
            setType("")
            alert("Atualização de endereço feita com sucesso")
            navigate("/homePage/client")
        })
        promise.catch(err => {
            alert("erro no edereço")
        })
    }

    function clientAddressInputs() {
        return (
            <form onSubmit={updateLocation} >
                <input type="string" placeholder="Location (ex: Rio de Janeiro)" value={clientAddress.clientCity} onChange={(e) => setClientAddress({ ...clientAddress, clientCity: e.target.value })} />

                <input type="string" placeholder="District" value={clientAddress.clientDistrict} onChange={(e) => setClientAddress({ ...clientAddress, clientDistrict: e.target.value })} />
                <input type="string" placeholder="Street" value={clientAddress.clientStreet} onChange={(e) => setClientAddress({ ...clientAddress, clientStreet: e.target.value })} />

                <div>
                    <input type="string" placeholder="Number" value={clientAddress.clientNumber} onChange={(e) => setClientAddress({ ...clientAddress, clientNumber: e.target.value })} />
                    <input type="string" placeholder="Complement" value={clientAddress.clientComplement} onChange={(e) => setClientAddress({ ...clientAddress, clientComplement: e.target.value })} />
                </div>

                <input type="string" placeholder="Zip-Code (ex: xxxxx-xxx)" value={clientAddress.clientZip} onChange={(e) => setClientAddress({ ...clientAddress, clientZip: e.target.value })} />

                <button type="submit">Atualizar</button>
            </form>
        )
    }

    const loadClientAddressInputs = clientAddressInputs()
    
    return (
        <Container>
            <Header />

            <ClientAddress>
                <AddressInputs>
                    <h2>Atualize suas informações de endereço</h2>
                    {loadClientAddressInputs}
                </AddressInputs>
            </ClientAddress>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    background-color: #333333;

    form {
        //margin: auto auto;
        margin-top: 13px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: center;
    }

    input {
        margin: auto auto;
        width: 35vw;
        height: 8.5vh;
        padding-left: 15px;
        margin-top: 8px;
        border-radius: 6px;
        border: none;
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }

    input::placeholder {
        font-size: 15px;
        color: #8d8a8a;
    }

    button {
        margin: auto auto;
        width: 35vw;
        height: 8vh;
        border-radius: 6px;
        border: none;
        margin-top: 20px;
        color: white;
        background-color: #55a381;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
    }

    p {
        color: white;
        margin-top: 10px;
        text-decoration: underline;
        cursor: pointer;
    }
`
const ClientAddress = styled.div`
    margin: 140px auto;
    box-sizing: border-box;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 50vw;
    height: 75vh;
`
const AddressInputs = styled.div`
    margin: auto auto;
    width: 40vw;
    height: 90vh;
    border: 2px solid  #55a381;
    border-radius: 10px;

    h2 {
        width: 35vw;
        margin-top: 20px;
        margin-left: 33px;
        font-size: 15px;
        color: #ffffff;
        padding: 10px 10px;
        background-color: #55a381;
        border-radius: 8px;
    }

    div {
        width: 35vw;
        display: flex;
        justify-content: space-between;
        margin: auto auto;
        //background-color: yellow;

        input:first-child {
            margin-left: -0px;
            width: 17vw;
        }

        input:last-child {
            margin-right: -0px;
            width: 17vw;
        }
    }
`

export default ClientLocation