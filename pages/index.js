import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Home({ results }) {
  const router = useRouter();
  const onClick = movie => {
    router.push(
      {
        pathname: `/movies/${movie.id}`,
      },
      `/movies/${movie.id}`
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {!results && <h4>Loading...</h4>}
      {results?.map(movie => (
        <div className="movie" key={movie.id} onClick={() => onClick(movie)}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <Link href={`/movies/${movie.id}`}>
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

/*
  이름 바꿀 수 없음.
  서버에서 돌아가는 코드 
*/
export async function getServerSideProps() {
  const url = `http://localhost:3000/api/movies`;
  const { results } = await (await fetch(url)).json();

  return {
    props: {
      results,
    },
  };
}
