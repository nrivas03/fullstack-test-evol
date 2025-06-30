import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};


export default Layout;
