import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import styled from 'styled-components'

function SignUpProfessional() {

    const navigate = useNavigate()

    const [proRegister, setProRegister] = useState({ proFullName: "", proEmail: "", proPassword: "", proCity: "", proType: "", proProfilePhoto: "", proPhoneNumber: "" })

    const objProRegister = {
        fullName: proRegister.proFullName,
        email: proRegister.proEmail,
        password: proRegister.proPassword,
        city: proRegister.proCity,
        type: proRegister.proType,
        profilePhoto: proRegister.proProfilePhoto,
        phoneNumber: proRegister.proPhoneNumber
    }

    function registerProfessional(e) {
        e.preventDefault()

        const URL = "http://localhost:5000/sign-up/professional"

        const promise = axios.post(URL, objProRegister)

        promise.then((response) => {
            console.log("entrou", response.status)
            navigate("/")
        })
        promise.catch(err => {
            alert('Preencha os campos corretamente')
        })
    }

    function proInputs() {
        return (
            <form onSubmit={registerProfessional} >
                <input type="name" placeholder="Full Name" value={proRegister.proFullName} onChange={(e) => setProRegister({ ...proRegister, proFullName: e.target.value })} />

                <input type="email" placeholder="Email" value={proRegister.proEmail} onChange={(e) => setProRegister({ ...proRegister, proEmail: e.target.value })} />
                <input type="password" placeholder="Senha" value={proRegister.proPassword} onChange={(e) => setProRegister({ ...proRegister, proPassword: e.target.value })} />

                <div>
                    <input type="string" placeholder="Location (ex: Rio de janeiro)" value={proRegister.proCity} onChange={(e) => setProRegister({ ...proRegister, proCity: e.target.value })} />
                    <input type="string" placeholder="Type" value={proRegister.proType} onChange={(e) => setProRegister({ ...proRegister, proType: e.target.value })} />
                </div>

                <input type="string" placeholder="Profile Photo" value={proRegister.proProfilePhoto} onChange={(e) => setProRegister({ ...proRegister, proProfilePhoto: e.target.value })} />
                <input type="string" placeholder="Phone Number (xx) xxxxx-xxxx" value={proRegister.proPhoneNumber} onChange={(e) => setProRegister({ ...proRegister, proPhoneNumber: e.target.value })} />

                <button type="submit">Cadastrar</button>
            </form>
        )
    }

    return (
        <Container>
            <BodyInputs>
                <h1>Bem-vindo ao HomeCare <span>professionals</span> </h1>
                {proInputs()}
            </BodyInputs>
        </Container>
    )
}

const Container = styled.main`
    display: flex;
    //justify-content: center;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
    background-color: #55a381;

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
        background-color: #333333;
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

const BodyInputs = styled.div`
    margin: auto auto;
    width: 40vw;
    height: 90vh;
    background-color: #55a381;
    border: 2px solid #333333;
    border-radius: 10px;

    box {

    }
    

    h1 {
        width: 35vw;
        margin-top: 20px;
        margin-left: 33px;
        font-size: 25px;
        color: #ffffff;
        padding: 10px 10px;
        background-color: #333333;
        border-radius: 8px;
    }

    span {
        font-style: italic;
        font-size: 17px;
        color: #55a381;
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
`;

export default SignUpProfessional