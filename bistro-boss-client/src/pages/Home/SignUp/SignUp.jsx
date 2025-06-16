import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import SocialLogin from "../../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {createUser, updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user
      console.log(loggedUser)
      updateUserProfile(data.name, data.photoURL)
      .then(() => {

        //create user entry in the database
        const userInfo = {name: data.name , email: data.email }
        axiosPublic.post("/users", userInfo)
        .then(res => {
          if(res.data.insertedId){
            console.log('user add to db')
            reset()
              Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Updated",
              showConfirmButton: false,
              timer: 1500
        });
        navigate('/')
          }
        })
        
      })
      .catch((err) => console.log(err))
    })
  };

  return (
    <>
      <Helmet>
        <title>Bistro | Signup</title>
      </Helmet>
      <div className="hero bg-white min-h-screen">
        <div className="hero-content flex">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-white w-1/2 max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  className="input bg-white border-black"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input bg-white border-black"
                  placeholder="photo URL"
                />
                {errors.photoURL && (
                  <span className="text-red-500">Photo URL is required</span>
                )}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  className="input bg-white border-black"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input bg-white border-black"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must have one uppercase one lowercase one number
                    and one special characters
                  </p>
                )}
                <input
                  type="submit"
                  value="Signup"
                  className="btn btn-primary mt-4"
                />
              </fieldset>
            </form>
            <p className="text-center text-yellow-600 mb-2">
              <small>
                Already Registered? <Link to="/login">Go to Login</Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
