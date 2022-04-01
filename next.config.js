/** @type {import('next').NextConfig} */

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
        source: '/api/movies/:id',
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
