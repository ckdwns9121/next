import NavBar from './NavBar';
import Seo from './Seo';
export default function Layout({ children }) {
  return (
    <>
      <Seo title="test" />
      <NavBar />
      <div>{children}</div>
    </>
  );
}
