'use client';
import { useFetch } from "./hooks/useFetch";

type Repository = {
  full_name: string;
  description: string;
}

export default function Home() {
  const { data: repositories, error, isFetching } = 
    useFetch<Repository[]>('https://api.github.com/users/ruuuff/repos');
  
  return (
    <ul className='space-y-2'>
      { isFetching && <p>Carregando...</p> }
      { repositories?.map((repo) => (
        <li key={ repo.full_name }>
          <strong>{ repo.full_name }</strong>
          <p>{ repo.description }</p>
        </li>
      )) }
    </ul>
  )
}
