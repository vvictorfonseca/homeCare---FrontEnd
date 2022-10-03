import { useContext, useState } from 'react';
import styled from 'styled-components';

import ModalContext from "../../context/modalContext";

function ModalComponent({ info }) {
  const { setModalIsOpen } = useContext(ModalContext)

  const [evaluate, setEvaluate] = useState(false)
  const [evaluateContent, setEvaluateContent] = useState("")

  let professionalName = ""
  let date = ""

  info.forEach(element => {
    professionalName = element.professionals.fullName
    date = element.date
  })

  return (
    <ModalBackground>
      <ModalContainer>

        {
          !evaluate ? (

            <>
              <ModalHeader>
                <H2>{professionalName} fez um serviço em sua casa no dia {date}</H2>
                <H3>Deseja fazer uma avaliação?</H3>
              </ModalHeader>
              <ButtonsBox>
                <Button onClick={() => setModalIsOpen(false)}>Não</Button>
                <Button onClick={() => setEvaluate(true)} >Sim</Button>
              </ButtonsBox>
            </>
          ) : (
            <>
              <ModalHeader>
                <H2>{professionalName} fez um serviço em sua casa no dia {date}</H2>
                <H3>Escreva sua avaliação abaixo</H3>
              </ModalHeader>
              
              <EvaluateBox>
                <TextArea placeholder="Escreva sua avaliação aqui..." value={evaluateContent} onChange={(e) => setEvaluateContent(e.target.value)} ></TextArea>
                <Send>Enviar</Send>
              </EvaluateBox>
            </>
          )
        }

      </ModalContainer>
    </ModalBackground >
  )
}

const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background: #333333;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; 
`
const ModalContainer = styled.div`
    width: 597px;
    height: 262px;
    left: 413px;
    top: 349px;
    background: #e5e2e2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`
const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  margin-top: 10px;
  width: 90%;
  height: 80px;
  border-radius: 15px;
  background-color: #55a381;;
`
const H2 = styled.h2`
  color: white;
  font-size: 18px;
`
const H3 = styled.h3`
  color: white;
  font-size: 15px;
  margin-top: 15px;
  background-color: #4e4e4e;
  width: 45%;
  height: 21px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto auto;
  height: 50px;
  width: 40%;
`
const Button = styled.button`

  &:first-child {
    background-color: #b82b2b;
  }

  background-color: #388338;
  width: 40%;
  height: 50px;
  border: none;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;

  :hover {
    width: 42%;
    height: 54px;
  }
`
const EvaluateBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto auto;
  height: 55%;
  width: 85%;
`
const TextArea = styled.textarea`
  width: 70%;
  height:55%;
  margin-top: 10px;
  border-radius: 15px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
`
const Send = styled.button`
  background-color: #4e4e4e;
  color: white;
  margin-top: 18px;
  width: 30%;
  height: 25px;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`

export default ModalComponent