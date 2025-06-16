import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <section className='my-20'>
            <SectionTitle subHeading="Popular Items" heading="From Our Menu"></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                popular.map(item => <MenuItem key={item._id} item={item}>
                    
                </MenuItem>)
            }
            </div>
            <div className='text-center mt-10'>
                <button className="uppercase btn border-none outline-none bg-red-600 mt-3">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;