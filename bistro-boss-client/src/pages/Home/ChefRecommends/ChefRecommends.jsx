import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const ChefRecommends = () => {
  return (
    <section className='my-20'>
        <SectionTitle heading="CHEF RECOMMENDS" subHeading="Should Try"></SectionTitle>
          <div className='grid lg:grid-cols-3 gap-4'>
      <div className="md:h-12/12 w-96 shadow-sm mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={slide1}
            alt="img1"
            className="rounded-xl w-90 h-80"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Caeser Salad</h2>
          <p className='w-70'>
            Lettuse, Eggs, Parmesan Cheese, Chicken Breast Fillets
          </p>
          <div className="card-actions">
            <button className="btn bg-gray-200 border-0 rounded-lg text-yellow-600 uppercase">Add To Cart</button>
          </div>
        </div>
      </div>
      <div className="md:h-12/12 w-96 shadow-sm mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={slide2}
            alt="img1"
            className="rounded-xl w-90 h-80"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Pizza</h2>
          <p className='w-70'>
            Lettuse, Eggs, Parmesan Cheese, Chicken Breast Fillets
          </p>
          <div className="card-actions">
            <button className="btn bg-black border-0 rounded-lg text-yellow-600 uppercase">Add To Cart</button>
          </div>
        </div>
      </div>
      <div className="md:h-12/12 w-96 shadow-sm mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={slide3}
            alt="img1"
            className="rounded-xl w-90 h-80"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Soup</h2>
          <p className='w-70'>
            Lettuse, Eggs, Parmesan Cheese, Chicken Breast Fillets
          </p>
          <div className="card-actions">
            <button className="btn bg-gray-200 border-0 rounded-lg text-yellow-600 uppercase">Add To Cart</button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ChefRecommends;
