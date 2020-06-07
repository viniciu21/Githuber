import React, {useState, useEffect} from 'react';
import {Container, Form} from './styles';
import CompareList from '../../Components/CompareList/index';

function Main (){
    const linkApiGithub = 'https://api.github.com/repos/';

    const [repositories, Setrepositories] = useState([]);

    const [repositoryName, SetrepositoryName] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        fetch(`${linkApiGithub}${repositoryName}`)
            .then(repo => repo.json())
            .then(repo => Setrepositories([...repositories, repo]))
            .catch(erro => {
                console.log(erro.mensage)
                return Setrepositories([...repositories])
            });

            SetrepositoryName('');

    }

    return (
        <Container onSubmit={e => handleSubmit(e)}>
            <h1>Githuber</h1>
            <Form>
                <input
                    type="text" placeholder="Coloque o usuário/repositorio" value={repositoryName}
                    onChange = {e => SetrepositoryName(e.target.value)}
                />
                <button type="submit">+</button>
            </Form>
            <CompareList repositories={repositories}/>
        </Container>
    );
};

export default Main;
