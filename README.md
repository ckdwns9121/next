# NextJS Introduction

## 0.2 Create Next App

```
npx create-next-app
```

## 1.0 Framework vs Library

NextJs는 프레임워크이다.

라이브러리는 우리가 갖다쓰는 것, 프레임워크는 정해진 틀 안에서 커스터마이징

## 1.1 Pages

- page 폴더에 react component를 만들면 자동으로 라우팅이 된다.
- NextJs는 이 파일의 이름을 가지고와 url의 이름으로 사용한다.
- 이 작은 기능이 개발 시간을 절약해준다.
- reactjs를 import 할 필요 없다.

## 1.2 Static Pre Rendering

- 앱에 있는 페이지들이 미리 렌더링 된다.
- CSR은 유저가 빈화면을 볼 수 있지만 SSR은 어떠한 HTML이라도 볼 수 있다.
- nextJs는 pre-rendering 한다.
- hydration : react를 프론트 내에서 실행하는 기술 (next는 react를 백엔드에서 만들어서 프론트로 내보내는데 react가 로딩되고나서 react랑 연결됨)
- SEO에 매우 좋다

## 1.3 Routing

- a태그로 페이지 이동하면 안된다. (새로고침됨)
- Link 태그 사용
- Link 태그 내부에 a태그를 사용하는 이유는 스타일링 때문(?)
- Link 태그는 href 때문에 사용 only

```js
import Link from 'next/link';
export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>
    </nav>
  );
}
```

- useRouter 훅

## 1.4 CSS Modules

## 1.5 Styles JSX

- `style` 태그로 스타일링 할 수 있다.
- 파일 import 할 필요없이 js 내에서 사용할 수 있어서 편하다.

```js
<style jsx>
  {`
    .nav {
      background-color: tomato;
    }
    a {
      color: red;
    }
  `}
</style>
```

global style 적용하는 방법

```js
<style jsx global>
  ...
</style>
```

## 1.6 Custom App

NextJS는 `_app.js`내의 우리가 작성한 컴포넌트를 App 컴포넌트의 Props로 전달한다.

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## 1.7 Recap

## 2.0

이미지 경로는 public 폴더에 저장해서 상대경로로 불러오기

## 2.2 Redirect and Rewrite

API 키 숨길 수 있다.

request에 mask를 씌우는것 같은 redirect와 rewrite

```js
const API_KEY = 'aea317dd46e4b586cf0b438e18a866f0';
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/contact',
        destination: 'https://naver.com',
        permanent: false, // 영구적인지 아닌지에 따라 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정된다.
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
```

## 2.3 server side rendering

페이지가 로딩중이라면 서버사이드 단에서 렌더할 때 로딩 컴포넌트를 렌더하게된다. 하지만 모든 데이터를 렌더하고 싶으면
`getServerSideProps` 함수에서 가지고 오면 된다. `getServerSideProps` 함수는 nextJs에서 제공하는 함수이며 서버에서 동작한다.

서버에서 돌아가기 때문에 API키를 넣어도 클라이언트에서 보이지 않는다.

NextJs는 props를 `__NEXT_DATA__` 부분에 넣어준다.

```js
export async function getServerSideProps() {
  const url = `http://localhost:3000/api/movies`;
  const { results } = await (await fetch(url)).json();

  return {
    props: {
      results,
    },
  };
}
```

## 2.5 Dynamic Routes

NextJs는 라우팅이 없다. 대신 pages 폴더안에서 디렉토리 구조로 라우팅을 할 수 있다.

예를들어 /movies/all 페이지로 가려면 `pages/movies/all.js` 파일을 만들어주면 된다.
