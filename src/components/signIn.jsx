import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SignIn() {

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