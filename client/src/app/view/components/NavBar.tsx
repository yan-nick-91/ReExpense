import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className={clsx(`w-full text-white
      bg-[linear-gradient(152deg,#020024_0%,#090979_26%,#5f1991_73%,#2f104a_100%)]`)}
    >
      <div className='pl-12 w-[10%] flex justify-between'>
        <NavLink to='/' className='p-4 px-4 hover:bg-blue-500 text-[1.2rem]'>
          Home
        </NavLink>
      </div>
    </nav>
  );
}
