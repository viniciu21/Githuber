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

        setRepoStatus(false);

        setLoadingRepo(true);

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
                localStorage.setItem('Githuber',JSON.stringify([...localRepos,repo]))
                setRepositories([...repositories, repo])

            })
            .then(() => setLoadingRepo(false))
            .catch(erro => {setRepoStatus(true);})
            .finally(() => setLoadingRepo(false))

        setRepositoryName('');
    }

    const getLocalRepos= () => {
        return JSON.parse(localStorage.getItem('Githuber')) || []
    }

    const updateRepository = (id) => {
        const repoUpdate = repositories.filter(repo => repo.id === id);

        fetch(`${linkApiGithub}${repoUpdate[0].full_name}`)
        .then(repo => repo.json())
        .then(repo => repositories.map((repository) => {
            if(repository.id === repo.id){
                repository = repo;

                repository.pushed_at = moment(repository.pushed_at).fromNow();

                return repository;
            }
            return repository;
        }))
        .then(repos => {
            localStorage.setItem('Githuber',JSON.stringify([...repos]));
            setRepositories(repos);
        } )
    }

    const removeRepository = (id) =>{
        const repositoriesUpdated = repositories.filter(repo => repo.id !== id );

        localStorage.setItem('Githuber',JSON.stringify([...repositoriesUpdated]));

        setRepositories(repositoriesUpdated);
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
