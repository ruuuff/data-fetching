'use client';
// import { useFetch } from "./hooks/useFetch";
import axios from 'axios'
import Link from 'next/link';
import { useQuery } from 'react-query';

export type Repository = {
  name: string;
  full_name: string;
  description: string;
}

export default function Home() {
  // without react-query
  // const { data: repositories, error, isFetching } = 
  //   useFetch<Repository[]>('https://api.github.com/users/ruuuff/repos');

  // react-query
  const { data: repositories, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/ruuuff/repos');
    return response.data;
  }, {
    refetchOnWindowFocus: true, // true is the default value
    // Quantidade de tempo para manter esses dados em cache até ele ser considerado obsoleto
    staleTime: 1000 * 60 // 1 minute
  });

  return (
    <ul className='space-y-2'>
      { (isFetching && !repositories) && <p>Carregando...</p> }
      { repositories?.map((repo) => (
        <li key={ repo.full_name }>
          <Link href={`/repository/` + repo.name}>{ repo.full_name }</Link>
          <p>{ repo.description }</p>
        </li>
      )) }
    </ul>
  )
}
