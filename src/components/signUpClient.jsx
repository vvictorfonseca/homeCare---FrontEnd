import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import styled from 'styled-components'

function SignUpClient() {

    const navigate = useNavigate()

    const [clientInfo, setClientInfo] = useState({ clientFullname: "", clientEmail: "", clientPassword: "", clientPhoneNumber: "", clientProfilePhoto: "" })
    const [clientAddress, setClientAddress] = useState({ clientCity: "", clientDistrict: "", clientStreet: "", clientNumber: "", clientComplement: "", clientZip: "" })

    const clientInfoRegister = {
        fullName: clientInfo.clientFullname,
        email: clientInfo.clientEmail,
        password: clientInfo.clientPassword,
        phoneNumber: clientInfo.clientPhoneNumber,
        profilePhoto: clientInfo.clientProfilePhoto
    }

    const clientAddressRegister = {
        city: clientAddress.clientCity,
        district: clientAddress.clientDistrict,
        street: clientAddress.clientStreet,
        number: parseInt(clientAddress.clientNumber),
        complement: clientAddress.clientComplement,
        zipCode: clientAddress.clientZip
    }

    function registerClient(e) {
        e.preventDefault()

        console.log("entrei caralho")

        const urlLogin = "http://localhost:5000/sign-up/client"
        
        const promise = axios.post(urlLogin, clientInfoRegister)
        promise.then(response => {
            console.log(response.status)
            setInterval(registerAddress(e), 1000)
            navigate("/")
        })
        promise.catch(err => {
            alert('Preencha os campos corretamente')
        })
    }

    function registerAddress(e) {
        console.log("entrei no enredereço")
        e.preventDefault()

        const urlAddress = "http://localhost:5000/sign-up/client/address"

        const promise = axios.post(urlAddress, clientAddressRegister)
        promise.then(response => {
            console.log("entrou carai", response.data)
        })
        promise.catch(err => {
            alert("erro no edereço")
        })
    }

    function clientInfoInputs() {
        return (
            <form>
                <input type="name" placeholder="Full Name" value={clientInfo.clientFullname} onChange={(e) => setClientInfo({ ...clientInfo, clientFullname: e.target.value })} />
                <input type="email" placeholder="Email" value={clientInfo.clientEmail} onChange={(e) => setClientInfo({ ...clientInfo, clientEmail: e.target.value })} />
                <input type="password" placeholder="Senha" value={clientInfo.clientPassword} onChange={(e) => setClientInfo({ ...clientInfo, clientPassword: e.target.value })} />
                <input type="string" placeholder="Phone Number (xx) xxxxx-xxxx" value={clientInfo.clientPhoneNumber} onChange={(e) => setClientInfo({ ...clientInfo, clientPhoneNumber: e.target.value })} />
                <input type="string" placeholder="Profile Photo" value={clientInfo.clientProfilePhoto} onChange={(e) => setClientInfo({ ...clientInfo, clientProfilePhoto: e.target.value })} />
                
            </form>
        )
    }

    function clientAddressInputs() {
        return (
            <form onSubmit={registerClient}>
                <input type="string" placeholder="Location (ex: Rio de Janeiro)" value={clientAddress.clientCity} onChange={(e) => setClientAddress({ ...clientAddress, clientCity: e.target.value })} />

                <input type="string" placeholder="District" value={clientAddress.clientDistrict} onChange={(e) => setClientAddress({ ...clientAddress, clientDistrict: e.target.value })} />
                <input type="string" placeholder="Street" value={clientAddress.clientStreet} onChange={(e) => setClientAddress({ ...clientAddress, clientStreet: e.target.value })} />

                <div>
                    <input type="string" placeholder="Number" value={clientAddress.clientNumber} onChange={(e) => setClientAddress({ ...clientAddress, clientNumber: e.target.value })} />
                    <input type="string" placeholder="Complement" value={clientAddress.clientComplement} onChange={(e) => setClientAddress({ ...clientAddress, clientComplement: e.target.value })} />
                </div>

                <input type="string" placeholder="Zip-Code (ex: xxxxx-xxx)" value={clientAddress.clientZip} onChange={(e) => setClientAddress({ ...clientAddress, clientZip: e.target.value })} />

                <button type="submit">Cadastrar</button>
            </form>
        )
    }

    const loadClientInfoInputs = clientInfoInputs()
    const loadClientAddressInputs = clientAddressInputs()

    return (
        <Container>
            <ClientInfos>
                <InfosInputs>
                    <h1>Bem-vindo ao HomeCare <span>clients</span> </h1>
                    <h2>Informações gerais</h2>
                    {loadClientInfoInputs}
                </InfosInputs>
            </ClientInfos>
            <ClientAddress>
                <AddressInputs>
                    <h2>Informações de endereço</h2>
                    {loadClientAddressInputs}
                </AddressInputs>
            </ClientAddress>
        </Container>
    )
}

const Container = styled.main`
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
        height: 9vh;
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
        height: 9vh;
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
const ClientInfos = styled.div`
    box-sizing: border-box;
    background-color:  #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 50vw;
    height: 100vh;
`
const ClientAddress = styled.div`
    box-sizing: border-box;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 50vw;
    height: 100vh;
`
const InfosInputs = styled.div`
    margin: auto auto;
    width: 40vw;
    height: 90vh;
    border: 2px solid  #55a381;
    border-radius: 10px;

    h1 {
        width: 35vw;
        margin-top: 20px;
        margin-left: 33px;
        font-size: 25px;
        color: #ffffff;
        padding: 10px 10px;
        background-color: #55a381;
        border-radius: 8px;
    }

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

    span {
        font-style: italic;
        font-size: 17px;
        color: #333333;
    }
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

export default SignUpClient