import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const { name, price, image, recipe, _id } = item;
  const { user } = useAuth();
  const location = useLocation()
  const axiosSecure = useAxiosSecure()
  const [, refetch] = useCart()
  const handleAddToCart = () => {
    if (user && user.email) {
      //send cart to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then(res => {
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} Added to the Cart`,
          showConfirmButton: false,
          timer: 1500
        });
        refetch()
        }
      })
      
    } else {
      Swal.fire({
        title: "You are not Logged in",
        text: "Please Login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: location}});
        }
      });
    }
  };
  return (
    <div className="card bg-white w-96 shadow-sm">
      <figure>
        <img src={image} alt="image" />
      </figure>
      <p className="absolute right-0 top-4 mr-4 px-4 text-white bg-slate-900 ">
        ${price}
      </p>
      <div className="card-body text-center flex flex-col items-center gap-y-3">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-outine rounded-md bg-slate-100 text-black hover:bg-black hover:text-white border-0 border-b-4 mt-4"
          >
            Add TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
