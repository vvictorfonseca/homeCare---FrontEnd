import { useContext } from "react"
import styled from "styled-components"
import axios from "axios"

import UserContext from "../../context/userContext"

function ProfessionalRequestBox(info) {

  const { professionalToken, refresh, setRefresh } = useContext(UserContext)

  const config = {
    headers: {
      Authorization: `Bearer ${professionalToken}`
    }
  }

  let clientId = ""
  let city = ""
  let district = ""
  let street = ""
  let number = ""
  let complement = ""
  let zipCode = ""

  info.clients.address.forEach(element => {
    city = element.city
    district = element.district
    street = element.street
    number = element.number
    complement = element.complement
    zipCode = element.zipCode
    clientId = element.clientId
  })

  const objUpdate = {
    clientId: clientId,
    date: info.date
  }

  function acceptJobRequest() {
    const URL = "https://home-care-app.herokuapp.com/update/request"

    const promise = axios.put(URL, objUpdate, config)

    promise.then(response => {
      { refresh ? setRefresh(false) : setRefresh(true) }
      alert("Você comfirmou o trabalho!")
    })
    promise.catch(err => {
      console.log("putz", err)
    })
  }

  function deleteJobRequest() {
    if (window.confirm("Você deseja cancelar essa solicitação de trabalho?")) {

      const URL = `https://home-care-app.herokuapp.com/delete/job/${info.id}`

      const promise = axios.delete(URL, config)
      promise.then(response => {
        { refresh ? setRefresh(false) : setRefresh(true) }
      })
    }
  }

  return (

    <Box>
      <Photo >
        <img src={info.clients.profilePhoto}></img>
        <p>{info.clients.fullName}</p>
        <p>{city}</p>

        <p>{info.date}</p>
      </Photo>

      <Infos>
        <Address>
          <p>Bairro: {district}</p>
          <p>Rua: {street}</p>
          <p>Número: {number} / Complemento: {complement}</p>
          <p>CEP: {zipCode}</p>
        </Address>

        <Status>
          <p>{info.isConfirmed === "Confirmed" ? "Confirmado" : info.isConfirmed === "Done" ? "Finalizado" : "Pendente"}</p>
        </Status>

        {
          info.isConfirmed === "Pending" ? (

            <Buttons>
              <button onClick={() => acceptJobRequest()} >Aceitar</button>
              <button onClick={() => deleteJobRequest()}>Recusar</button>
            </Buttons>

          ) : (

            info.isConfirmed !== "Done" ? (
              <Buttons>
                <button onClick={() => deleteJobRequest()}>Cancelar</button>
              </Buttons>
            ) : (
              <></>
            )

          )
        }

      </Infos>
    </Box>

  )
}

const Box = styled.div`
    margin-bottom: -180px;
    margin: 25px auto;
    width: 50vw;
    height: 45vh;
    border-radius: 8px;
    background-color: #d1d1d1;
    display: flex;
`
const Photo = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    background-color: #55a381;
    border-radius: 8px;

    img:first-of-type {
        margin: 20px auto;
        width: 125px;
        height: 125px;
        border-radius: 100%;
        border: solid 2px #4e4e4e;
    }

    p:first-of-type {
        color: white;
        font-size: 15px;
        font-weight: 700;
        margin: -5px auto;
    }

    p {
        color: white;
        font-size: 12px;
        font-weight: 700;
        margin: 10px auto;
    }

    p:last-of-type {
        color: white;
        font-size: 20px;
        font-weight: 700;
        margin: 20px auto;
    }

    button {
        margin: 40px auto;
        border-radius: 8px;
        border: none;
        width: 10vw;
        height: 5vh;
        background-color: #333333;
        color: white;
        cursor: pointer;
    }
`
const Infos = styled.div`
    width: 35vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    p:first-of-type  {
        margin-top: 20px;
        color: #333333;
        font-size: 30px;
    }

    p:nth-child(2) {
        margin-top: 5px;
        color: #333333;
        font-size: 20px;
    }

    p:nth-child(3) {
        margin-top: 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 700
    }

    p:nth-child(4) {
        margin-top: 10px;
        color: #333333;
        font-size: 20px;
    }
`
const Address = styled.div`
    width:30vw;
    height: 14vh;
    border-radius: 8px;
    margin-top: 15px;
    background-color: #ecebeb;

    p:first-child {
        margin: 5px 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 700
    }

    p:nth-child(2) {
        margin: 5px 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 500;
    }

    p:nth-child(3) {
        margin: 5px 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 500;
    }

    p:nth-child(4) {
        margin: 5px 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 500;
    }
`

const Status = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    width: 10vw;
    height: 8vh;
    border-radius: 8px;
    background-color: #ecebeb;

    p:first-of-type {
        margin: auto auto;
        color: #333333;
        font-size: 20px;
        font-weight: 700;
    }
`
const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    width: 30vw;
    height: 8vh;

    button {
        border-radius: 8px;
        border: none;
        width: 7vw;
        height: 8vh;
        background-color: #333333;
        color: white;
        cursor: pointer;
    }
`

export default ProfessionalRequestBox