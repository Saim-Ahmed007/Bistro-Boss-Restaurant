import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaShoppingCart  } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart()
  const [isAdmin] = useAdmin()
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <Link to="/" className="mt-2 text-black lg:text-white" >Home</Link>
      </li>
      <li>
        <Link to="/menu" className="mt-2 text-black lg:text-white">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad" className="mt-2 text-black lg:text-white">Order Food</Link>
      </li>
     
      {
        user && isAdmin && 
        <li>
        <Link to="/dashboard/adminHome" className="mt-2 text-black lg:text-white">Dashboard</Link>
        </li>
      }
      {
        user && !isAdmin && 
        <li>
        <Link to="/dashboard/userHome" className="mt-2 text-black lg:text-white">Dashboard</Link>
        </li>
      }
      <li>
        <Link to="/dashboard/cart">
          <button className="btn">
            <FaShoppingCart className="mr-2" />
            <div className="badge badge-sm badge-secondary ">+{cart.length}</div>
          </button>
        </Link>
      </li>
      {user ? (
        <>
          {/* <p className="mt-2 mx-2">{user?.displayName}</p> */}
          <button onClick={handleLogOut} className="btn btn-ghost text-black lg:text-white">
            Log Out
          </button>
        </>
      ) : (
        <>
          {" "}
          <li>
            <Link to="/login" className="text-black lg:text-white">Login</Link>
          </li>{" "}
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 bg-[#00000086] text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn border-none bg-red-500">Get Started</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
