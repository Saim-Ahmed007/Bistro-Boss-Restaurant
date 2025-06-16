import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from "../../../hooks/useMenu";
import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu()
  const desserts = menu.filter(item => item.category === 'dessert')
  const pizzas = menu.filter(item => item.category === 'pizza')
  const salads = menu.filter(item => item.category === 'salad')
  const soups = menu.filter(item => item.category === 'soup')
  const offered = menu.filter(item => item.category === 'offered')
  return (
    <div className="">
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="our menu"></Cover>
      {/* main cover */}
      <SectionTitle subHeading="Don't Miss Out" heading="TODAY'S OFFER"></SectionTitle>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory items={desserts} title="dessert" img={dessertImg}></MenuCategory>
      {/* pizza menu items */}
      <MenuCategory items={pizzas} title="pizza" img={pizzaImg}></MenuCategory>
      {/* salad menu items */}
      <MenuCategory items={salads} title="salad" img={saladImg}></MenuCategory>
      {/* soup menu items */}
      <MenuCategory items={soups} title="soup" img={soupImg}></MenuCategory>

    </div>
  );
};

export default Menu;
