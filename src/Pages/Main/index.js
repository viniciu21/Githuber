import React, {useState, useEffect} from 'react';
import {Container, Form} from './styles';
import moment from 'moment';
import CompareList from '../../Components/CompareList/index';

function Main (){
    const linkApiGithub = 'https://api.github.com/repos/';

    const [repoStatus, setRepoStatus] = useState(false);

    const [repositories, setRepositories] = useState([]);

    const [repositoryName, setRepositoryName] = useState('');

    const [loadingRepo, setLoadingRepo] = useState(false);

    useEffect( () =>{
        const localRepos =  getLocalRepos();
        setRepositories(localRepos);
    },[]);


    const handleSubmit =  (e) =>{
        e.preventDefault();
        setLoadingRepo(true)

        const localRepos =  getLocalRepos();



        fetch(`${linkApiGithub}${repositoryName}`)
            .then(repo => {
                    if(!repo.ok){
                        throw Error(repo.statusText);
                    }
                return repo.json()
            })
            .then(repo => {
                repo.pushed_at = moment(repo.pushed_at).fromNow();
                return repo;
            })
            .then(repo => {
                sessionStorage.setItem('Githuber',JSON.stringify([...localRepos,repo]))
                setRepositories([...repositories, repo])

            })
            .then(() => setLoadingRepo(false))
            .catch(erro => {setRepoStatus(true);})
            .finally(() => setLoadingRepo(false))

        setRepositoryName('');
    }

    const getLocalRepos= () => {
        return JSON.parse(sessionStorage.getItem('Githuber')) || []
    }

    const updateRepository = (id) => {
        const repoUpdate = repositories.filter(repo => repo.id === id);

        const localRepos =  getLocalRepos();

        fetch(`${linkApiGithub}${repoUpdate[0].full_name}`)
            .then(repo => {
                if(!repo.ok){
                    throw Error(repo.statusText);
                }
                return repo.json()
            })
            .then(repo => {
                repo.pushed_at = moment(repo.pushed_at).fromNow();
                return repo;
            })
            .then(repo => {
                repositories.map((repos) => {
                    if(repos.id === repoUpdate[0].id){
                        repos = repoUpdate[0];
                    }
                    return repos;
                })
            })
            .then(repos => {
                setRepositories([...repositories])
                sessionStorage.setItem('Githuber',JSON.stringify([...localRepos,repos]))
            })

    }

    const removeRepository = (id) =>{

    }


    return (
        <Container onSubmit={e => handleSubmit(e)}>
            <h1>Githuber</h1>
            <Form Erro ={repoStatus}>
                <input
                    type="text" placeholder="Coloque o usuário/repositorio" value={repositoryName}
                    onChange = {e => setRepositoryName(e.target.value)}
                />
                <button type="submit">
                    {loadingRepo ? <i className="fa fa-spinner fa-pulse"></i> : '+'}
                </button>
            </Form>
            <CompareList
                repositories={repositories}
                updateRepository ={updateRepository}
                removeRepository ={removeRepository}
            />
        </Container>
    );
};

export default Main;
