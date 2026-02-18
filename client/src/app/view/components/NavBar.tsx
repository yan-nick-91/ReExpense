import type { AppDispatch, RootState } from '../../store/store';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { logoutController } from '../../controllers/authController';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const logout = async () => {
    logoutController(dispatch);
    navigate('/');
  };

  return (
    <nav
      className={clsx(`w-full text-white
      bg-[linear-gradient(152deg,#020024_0%,#090979_26%,#5f1991_73%,#2f104a_100%)]`)}
    >
      <div className='flex justify-between'>
        <div className='pl-12 w-[10%] flex justify-between'>
          <NavLink to='/' className='p-4 px-4 hover:bg-blue-500 text-[1.2rem]'>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to='/settings'
              className='p-4 px-4 hover:bg-blue-500 text-[1.2rem]'
            >
              Setting
            </NavLink>
          )}
        </div>
        {isAuthenticated && (
          <div className='pr-5'>
            <Button
              className='p-4 px-4 hover:bg-blue-500 text-[1.2rem] cursor-pointer'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
