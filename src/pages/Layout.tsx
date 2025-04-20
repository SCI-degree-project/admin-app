import { Outlet } from 'react-router-dom';
import { Header } from './Header.tsx';

function Layout() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export { Layout };