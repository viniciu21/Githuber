import React from 'react';
import {Container, Repository} from './styles';

function CompareList ({repositories, updateRepository, removeRepository}){
    return(
        <Container>
            {repositories.map((repository) => (
                <Repository key={repository.id}>
                <header>
                    <img src={repository.owner.avatar_url} alt="viniicus"/>
                    <strong>{repository.name}</strong>
                    <small>{repository.owner.login}</small>
                </header>
                <ul>
                    <li>{repository.stargazers_count} <small>Stars</small></li>
                    <li>{repository.forks_count} <small>Forks</small></li>
                    <li>{repository.open_issues_count} <small>Issues</small></li>
                    <li>{repository.pushed_at} <small>Last Commit</small></li>
                </ul>
                <div className="buttons-container">
                    <button type="button" onClick={() => updateRepository(repository.id)}>
                        <i className="fa fa-retweet" />
                        Atualizar
                    </button>
                    <button type="button" onClick={() => removeRepository(repository.id)}>
                        <i className="fa fa-trash" />
                        Excluir
                    </button>
                </div>
            </Repository>))}
        </Container>
    );
}

export default CompareList;
