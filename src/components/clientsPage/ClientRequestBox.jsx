import { useContext } from "react"
import styled from "styled-components"
import axios from "axios"

import UserContext from "../../context/userContext"

function ClientRequestBox(jobInfo) {

  const { clientToken, setReload, reload } = useContext(UserContext)

  const params = jobInfo.id

  function deleteRequest() {
    if (window.confirm("Você deseja cancelar sua solicitação?")) {

      const config = {
        headers: {
          Authorization: `Bearer ${clientToken}`
        }
      }

      const URL = `https://home-care-app.herokuapp.com/delete/job/${params}`

      const promise = axios.delete(URL, config)
      promise.then(response => {
        { reload ? setReload(false) : setReload(true) }
      })
    }
  }

  return (

    <Box>
      <Photo >
        <img src={jobInfo.professionals.profilePhoto} ></img>
        <p>{jobInfo.professionals.type === "garden" ? "Jardinagem" : jobInfo.professionals.type === "cleaning" ? "Limpeza" : "Serviço Elétrico" }</p>

        {jobInfo.isConfirmed !== "Done" ? (
          <button onClick={() => deleteRequest()} >Cancelar Pedido</button>
        ) : (
          <></>
        )
        }

      </Photo>
      <Infos>
        <p>{jobInfo.professionals.fullName}</p>
        <p>{jobInfo.professionals.city}</p>
        <p>{jobInfo.date}</p>
        <p>Status: {jobInfo.isConfirmed === "Confirmed" ? "Confirmado" : jobInfo.isConfirmed === "Done" ? "Finalizado" : "Pendente"}</p>

        <ProfessionalDescription>

          {jobInfo.professionals.description == null ? (
            <p>O profissional ainda não possui descrição.</p>
          ) : (
            <p>{jobInfo.professionals.description}</p>
          )}

        </ProfessionalDescription>
      </Infos>
    </Box>

  )
}

const Box = styled.div`
    margin: 0px auto 25px auto;
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
const ProfessionalDescription = styled.div`
    margin-top: 17px;
    border-radius: 8px;
    display: flex;
    align-items:center;
    justify-content: center;
    width: 25vw;
    height: 20vh;
    background-color: #e2e2e2;

    p:first-of-type {
        font-size: 13px;
        padding-left:10px;
        padding-right: 10px;
        text-align: center;
        margin: auto auto;
        font-weight:700px;
    }
`

export default ClientRequestBox