import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import UserContext from '../../context/userContext';

function ProfessionalBox({ fullName, city, type, phoneNumber, profilePhoto, description, id }) {

  const navigate = useNavigate()

  const { setRequestJobInfo } = useContext(UserContext)

  return (
    <Boxes>
      <Body>
        <Box>
          <Photo >
            <img src={profilePhoto} />
            <p>{type}</p>


            <button onClick={() => {
              setRequestJobInfo({
                id: id,
                fullName: fullName,
                city: city,
                phoneNumber: phoneNumber,
                profilePhoto: profilePhoto,
                description: description,
                type: type
              })
              navigate("/request/job")
            }} >Agende aqui</button>


          </Photo>
          <Infos>
            <p>{fullName}</p>
            <p>{city} </p>

            <ProfessionalDescription>

              {description == null ? (
                <p>O profissional não possui descrição</p>
              ) : (
                <p>{description}</p>
              )}

            </ProfessionalDescription>
          </Infos>
        </Box>
      </Body>
    </Boxes>

  )
}

const Boxes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 65vw;
    height: 100%;
    background-color: #333333;

    p:first-child {
        margin-top: 19px;
        font-size: 20px;
        font-weight: 700;
    }

    p:nth-child(2) {
        margin-top: 8px;
        font-size: 15px;
        color: #4d4b4b;
    }

    p:last-of-type {
        margin-top: 8px;
        font-size: 14px;
    }
    
    button {
        width: 10vw;
        height: 6vh;
        border: none;
        margin-top: 20px;
        border-radius: 8px;
        color: white;
        background-color: #585858;
        cursor: pointer;
    }
`
const Body = styled.div`
    display: flex;
    justify-content: center;
    width: 65vw;
    height: 100%;
    border-left: solid 0.5px #4e4e4e;
`
const Box = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
    width: 50vw;
    height: 45vh;
    border-radius: 8px;
    background-color: #d1d1d1;
    display: flex;
`
const Photo = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    width: 15vw;
    background-color: #55a381;
    border-radius: 8px;

    img:first-of-type {
        margin: 20px auto;
        width: 125px;
        height: 125px;
        border-radius: 100%;
        border: solid 2px #000000;
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
        margin-top: 10px;
        color: #333333;
        font-size: 20px;
    }

    p:nth-child(3) {
        margin-top: 120px;
        color: #333333;
        font-size: 20px;
    }

    p:nth-child(4) {
        margin-top: 15px;
        color: #333333;
        font-size: 15px;
    }

    input {
        margin-top: 10px;
        height: 30px;
        border: none;
        border-radius: 8px;
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }

    input::placeholder {
        font-size: 15px;
        color: #8d8a8a;
    }
`
const ProfessionalDescription = styled.div`
    margin-top: 30px;
    border-radius: 8px;
    display: flex;
    align-items:center;
    width: 25vw;
    height: 20vh;
    background-color: #e2e2e2;

    p:first-of-type {
        margin-top: -50px;
        font-size: 13px;
        text-align: center;
        margin: auto auto;
    }
`

export default ProfessionalBox