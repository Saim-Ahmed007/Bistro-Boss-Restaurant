import { FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        categoty: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} item has been saved`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset()
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading="Add an item"
        subHeading="What's new?"
      ></SectionTitle>
      <div className='px-5 lg:ml-20'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input border-gray-200 bg-white w-full"
              placeholder="Recipe Name"
            />
          </div>
          <div className="flex gap-x-6">
            <div className="form-control my-6 w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-ghost w-full border-gray-200"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="desert">Deserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            <div className="form-control my-6 w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="input border-gray-200 bg-white w-full"
                placeholder="Price"
              />
            </div>
          </div>
          <fieldset className="fieldset">
            <label className="">Recipe Details</label>
            <textarea
              {...register("recipe")}
              className="textarea w-full bg-white border-gray-200 h-24"
              placeholder="Bio"
            ></textarea>
          </fieldset>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input bg-gray-200 max-w-xs"
            />
          </div>

          <button className="btn bg-orange-400 border-none">
            ADD ITEM <FaUtensils className="ml-1"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
