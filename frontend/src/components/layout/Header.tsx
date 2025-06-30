const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex flex-col items-center md:flex-row md:justify-between">
      <h1 className="text-xl font-bold text-gray-800 text-center md:text-left">
        Todo List
      </h1>
      <span className="text-sm text-gray-600 mt-1 md:mt-0">by Nicolás Rivas</span>
    </header>
  );
};


export default Header;
