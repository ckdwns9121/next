import { useRouter } from 'next/router';
export default function Detail({ res }) {
  const router = useRouter();
  return (
    <div>
      <h1>{res.title}</h1>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const url = `https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.API_KEY}`;
  const res = await (await fetch(url)).json();
  console.log(res);

  return {
    props: { res },
  };
}
