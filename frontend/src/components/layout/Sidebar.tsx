import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Tareas', to: '/' },
    { label: 'Nueva Tarea', to: '/create' },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClick}
          className={({ isActive }) =>
            `block text-sm font-medium px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Sidebar fijo (escritorio) */}
      <aside className="hidden md:block w-64 bg-white shadow-md h-screen sticky top-0">
        <nav className="flex flex-col p-6 space-y-2">
          <NavLinks />
        </nav>
      </aside>

      {/* Botón hamburguesa (móvil) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Drawer móvil */}
      {open && (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-md p-6"
        >
          <button className="absolute top-4 right-4" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          <nav className="mt-8 flex flex-col space-y-2">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>
        </motion.aside>
      )}
    </>
  );
};

export default Sidebar;
