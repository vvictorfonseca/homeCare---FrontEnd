import styled from "styled-components"

function EvaluationBox(props) {

  return (
    <Boxes>
      <Body>
        <Box>
          <Photo >
            <img src={props.jobs.clients.profilePhoto}></img>
            <p>{props.jobs.date}</p>
          </Photo>
          <Infos>
            <p>{props.content}</p>
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
    //border-left: solid 0.5px #4e4e4e;
`
const Box = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
    width: 50vw;
    height: 15vh;
    border-radius: 8px;
    background-color: #d1d1d1;
    display: flex;
`
const Photo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    width: 10vw;
    background-color: #55a381;
    border-radius: 8px;

    img:first-of-type {
        margin: 10px auto;
        width: 55px;
        height: 55px;
        border-radius: 100%;
        border: solid 1px #000000;
    }

    p:first-of-type {
        color: white;
        font-size: 15px;
        font-weight: 700;
        margin: -2px auto;
    }

    button {
        //margin: 40px auto;
        border-radius: 8px;
        border: none;
        width: 10vw;
        height: 5vh;
        background-color: #333333;
        color: white;
        cursor: pointer;

        &:last-of-type {
          margin-top: 10px;
        }
    }
`
const Infos = styled.div`
    width: 35vw;
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto auto;
    border-radius: 12px;
    border: solid 1px #616161;

    p:first-of-type  {
        margin: auto auto;
        padding-left: 10px;
        padding-right: 10px;
        color: #333333;
        font-size: 15px;
        text-align: center;
    }
`

export default EvaluationBox