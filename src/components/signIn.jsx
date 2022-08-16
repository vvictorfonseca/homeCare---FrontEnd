import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import styled from 'styled-components';

import UserContext from "./context/userContext";

function SignIn() {

    const navigate = useNavigate()

    const { setClientToken, setClientName, setClientPhoto, setClientCity, setProfessionalDescription } = useContext(UserContext)

    const { setProfessionalToken, setProfessionalName, setProfessionalCity, setProfessionalPhoto } = useContext(UserContext)

    const [clientLogin, setClientLogin] = useState({ clientEmail: "", clientPassword: "" })
    const [proLogin, setProLogin] = useState({ proEmail: "", proPassword: "" })

    const objClientLogin = {
        email: clientLogin.clientEmail,
        password: clientLogin.clientPassword
    }

    const objProLogin = {
        email: proLogin.proEmail,
        password: proLogin.proPassword
    }

    function loginProfessioanl(e) {
        e.preventDefault()

        const urlLogin = "https://home-care-app.herokuapp.com/professional"

        const promise = axios.post(urlLogin, objProLogin);

        promise.then(response => {
            const { data } = response;
            console.log("requisição", data)
            
            const professionalToken = JSON.stringify(data.token)
            const professionalName = JSON.stringify(data.fullName)
            const professionalCity = JSON.stringify(data.city)
            const professionalPhoto = JSON.stringify(data.profilePhoto)
            const professionalDescription = JSON.stringify(data.description)
            localStorage.setItem('professinalDescription', professionalDescription)
            localStorage.setItem('professionalToken', professionalToken)
            localStorage.setItem('professionalFullName', professionalName)
            localStorage.setItem('professionalCity', professionalCity)
            localStorage.setItem('professionalPhoto', professionalPhoto)

            setProfessionalDescription(data.description)
            setProfessionalToken(data.token)
            setProfessionalCity(data.city)
            setProfessionalName(data.fullName)
            setProfessionalPhoto(data.profilePhoto)
            navigate("/homePage/professional")
        })
        promise.catch(err => {
            alert('Usuário inexiste ou usuário e senha incorretos!')
        })
    }

    function loginClient(e) {
        e.preventDefault()

        const urlLogin = "https://home-care-app.herokuapp.com/client"

        const promise = axios.post(urlLogin, objClientLogin);

        promise.then(response => {
            const { data } = response;
            
            const user = JSON.stringify(data.token);
            const fullName = JSON.stringify(data.fullName)
            const photo = JSON.stringify(data.profilePhoto)
            const city = JSON.stringify(data.city)
            localStorage.setItem('token', user)
            localStorage.setItem('fullName', fullName)
            localStorage.setItem('photo', photo)
            localStorage.setItem('city', city)
            
            setClientToken(data.token)
            setClientName(data.fullName)
            setClientPhoto(data.profilePhoto)
            setClientCity(data.city)
            
            navigate("/homePage/client")
        });
        promise.catch(err => {
            alert('Usuário inexiste ou usuário e senha incorretos!')
        })
    }

    function proInputs() {
        return (
            <form onSubmit={loginProfessioanl} >
                <input type="email" placeholder="Email" value={proLogin.proEmail} onChange={(e) => setProLogin({ ...proLogin, proEmail: e.target.value })} />
                <input type="password" placeholder="Senha" value={proLogin.proPassword} onChange={(e) => setProLogin({ ...proLogin, proPassword: e.target.value })} />
                <button type="submit">Entrar</button>
            </form>
        )
    }

    function clientInputs() {
        return (
            <form onSubmit={loginClient} >
                <input type="email" placeholder="Email" value={clientLogin.clientEmail} onChange={(e) => setClientLogin({ ...clientLogin, clientEmail: e.target.value })} />
                <input type="password" placeholder="Senha" value={clientLogin.clientPassword} onChange={(e) => setClientLogin({ ...clientLogin, clientPassword: e.target.value })} />
                <button type="submit">Entrar</button>
            </form>
        )
    }

    const loadProInputs = proInputs()
    const loadClientInputs = clientInputs()

    return (
        <Container>
            
            <Professional>
                <Text>
                    <H1>HomeCare</H1>
                    <H2>Professionals</H2>
                </Text>
                <Link  to="/sign-in/professional"> <button>Logar</button> </Link>
                <Link to="/signUp/professional"> <button>Cadastrar</button> </Link>
            </Professional>
            
            <Client>
                <TextClient>
                    <H1Client>HomeCare</H1Client>
                    <H2Client>Clients</H2Client>
                </TextClient>
                <Link to="/sign-in/client"><button>Logar</button></Link>
                <Link to="/signUp/client"><button>Cadastrar</button></Link>
            </Client>
        
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    input {
        width: 22vw;
        height: 6vh;
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
        width: 22vw;
        height: 8vh;
        border-radius: 6px;
        border: none;
        margin-top: 20px;
        color: #747a76;
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
`;

const Professional = styled.div`
    box-sizing: border-box;
    background-color: #55a381;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 50vw;
    height: 100vh;

    p {
        text-decoration-color: #333333;
    }
`
const Text = styled.div`
    margin-top: calc(50vh - 200px);
    color: #333333;
`
const H1 = styled.h1`
    margin-left: 0.8vw;
    font-size: 65px;
`
const H2 = styled.h2`
    font-size: 25px;
    font-style: italic;
    margin-top: -8px;
    margin-bottom: 15px;
    margin-left: 11vw;
`
const Client = styled.div`
    box-sizing: border-box;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 50vw;
    height: 100vh;

    p {
        text-decoration-color: #55a381;
    }
`
const TextClient = styled.div`
    margin-top: calc(50vh - 200px);
    color: #55a381;
`
const H1Client = styled.h1`
    
    margin-left: 0.8vw;
    font-size: 65px;
`
const H2Client = styled.h2`
    font-size: 25px;
    font-style: italic;
    margin-top: -8px;
    margin-bottom: 15px;
    margin-left: 16vw;
`

export default SignIn