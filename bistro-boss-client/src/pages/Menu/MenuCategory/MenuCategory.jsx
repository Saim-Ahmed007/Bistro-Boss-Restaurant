import MenuItem from './../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, img}) => {
    return (
        <div>
            {title && <Cover img={img} title={title}></Cover>}
            <div className='grid md:grid-cols-2 gap-10 my-14'>
                {
                items.map(item => <MenuItem key={item._id} item={item}>
                    
                </MenuItem>)
            }
            </div>
           <div className="text-center mb-10">
             <Link to={`/order/${title}`}>
            <button className="uppercase btn border-none outline-none bg-red-600 mt-3">Order Now</button>
            </Link>
           </div>
            
        </div>
    );
};

export default MenuCategory;