'use client';
import { useQueryClient } from 'react-query';
import { Repository } from '@/app/page';

export default function Repo({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient();
  const currentRepo = params.slug;
  
  async function handleChangeRepositoryDescription() {
    // invalida a requisição anterior para realizar um novo get quando o usuário voltar
    // await queryClient.invalidateQueries(['repos']);

    // retorna a lista de repostiórios armazenado em cache
    const previousRepos = queryClient.getQueryData<Repository[]>('repos');
    
    if (previousRepos) {
      const nextRepos = previousRepos.map(repo => {
        if (repo.name === currentRepo) {
          return { ...repo, description: 'Testando' }
        } else {
          return repo;
        }
      })

      queryClient.setQueryData('repos', nextRepos);
    }
  }
  
  return (
    <div>
      <div>My repository: { currentRepo }</div>
      <button onClick={handleChangeRepositoryDescription}>Alterar descrição</button>
    </div>
  )
}