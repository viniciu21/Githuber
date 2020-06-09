import styled, {keyframes, css} from 'styled-components';

const shake = keyframes`
    0%{
        margin-left: 0px;
        box-shadow: 0 0 0.5em red
    }
    25%{
        margin-left: -5px;
        box-shadow: 0 0 0.5em red
    }
    75%{
        margin-left: 5px;
        box-shadow: 0 0 0.5em red

    }
    100%{
        margin-left: 0px;
        box-shadow: none;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    h1{
        color: white;
    }
`

export const Form = styled.form`
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
    display: flex;
    input{
        flex: 1;
        height: 55px;
        padding: 0 20px;
        border: 0;
        font-size: 18px;
        background-color: rgb(24,26,27);
        color: white;
        animation: ${props => (props.Erro ? css`${shake} 0.3s ease-in-out 0s 2;` : '')};
        transition: box-shadow 0.5s;
    }
    button{
        height: 55px;
        padding: 0 20px;
        margin-left: 10px;
        background-color: #63f5b8;
        border:0 ;
        font-size: 20px;
        color: white;
        font-weight: bolder;
        border-radius: 3px;
        &:hover{
            background-color: #52D89F;
        }
}
`
