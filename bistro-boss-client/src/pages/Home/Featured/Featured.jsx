import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import FeatudedImg from '../../../assets/home/featured.jpg' 
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item pt-8 my-20 bg-fixed">
            <SectionTitle heading="FROM OUR MENU" subHeading="check it Out"></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src={FeatudedImg} alt="" />
                </div>
                <div className="mt-4 md:ml-10 text-white">
                    <p>March 20, 2025</p>
                    <p className="uppercase">where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum excepturi fugiat praesentium quibusdam ratione, dignissimos, cumque quis nulla ad ut non aspernatur, voluptatem similique quasi illo exercitationem explicabo molestiae.</p>
                    <button className="uppercase btn border-none outline-none bg-red-600 mt-3">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;