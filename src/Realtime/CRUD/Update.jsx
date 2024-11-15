import { get, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import db from "../../Firebase";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const redirect = useNavigate();
  async function single() {
    const single_User = await get(ref(db, `firebase/${id}`));
    console.log(single_User.val());
    reset(single_User.val());
  }

  useEffect(() => {
    single();
  }, []);

  async function SubmitData(data) {
    await set(ref(db, `firebase/${id}`), data)
      .then(() => {
        toast.success("🦄 Data Updated!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
          transition: Bounce,
        });

        setTimeout(() => {
          redirect("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h2 className="text-center text-primary my-4">Update User Information</h2>
      <form
        onSubmit={handleSubmit(SubmitData)}
        className="col-10 col-md-6 mx-auto p-5 shadow-lg rounded bg-light"
      >
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            className="form-control"
            {...register("username")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className="form-control"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter Mobile Number"
            className="form-control"
            {...register("mobile")}
          />
        </div>
        <button type="submit" className="btn btn-success w-100 py-2">
          Update
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Update;
