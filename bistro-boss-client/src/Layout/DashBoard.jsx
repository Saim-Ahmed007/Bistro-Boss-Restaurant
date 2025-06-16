import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const DashBoard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    return (
        <div className='flex flex-col md:flex-row'>
            <div className="w-full md:w-64 md:min-h-screen bg-orange-300">
                <div className='pl-5 pt-5'>
                    <Link to="/">
                    <h2 className='text-3xl font-bold'>Bistro Boss</h2>
                    <p className='text-xl'>Restaurant</p>
                    </Link>
                </div>
                <ul className='menu pt-5'>
                   {
                    isAdmin ?
                    <>
                     <li>
                        <NavLink to="/dashboard/adminHome">
                        <FaHome></FaHome>
                        Admin Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems">
                        <FaUtensils></FaUtensils>
                        Add Items
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                        <FaList></FaList>
                        Manage Items
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings">
                        <FaBook></FaBook>
                        Manage Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users">
                        <FaUser></FaUser>
                        All Users
                        </NavLink>
                    </li>
                    </>
                    :
                    <>
                     <li>
                        <NavLink to="/dashboard/userHome">
                        <FaHome></FaHome>
                        User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/history">
                        <FaCalendar></FaCalendar>
                        Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                        <FaShoppingCart></FaShoppingCart>
                        My Cart ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                        <FaAd></FaAd>
                        Add a Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                        <FaList></FaList>
                        Payment Real History
                        </NavLink>
                    </li>
                    </>
                   }
                    <div className="divider w-50 pl-5"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome></FaHome>
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <FaSearch></FaSearch>
                        Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                        <FaEnvelope></FaEnvelope>
                        Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;