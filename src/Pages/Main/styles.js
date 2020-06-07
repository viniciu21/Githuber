import styled from 'styled-components';

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
        background-color: white;
        color: #444;
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
