import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import { get, push, ref, remove, set } from "firebase/database";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [users, setUser] = useState([]);

  function SubmitData(data) {
    set(push(ref(db, "firebase")), data)
      .then(() => {
        showFirebase();
        reset();
        toast.success("🦄 Data Submitted!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function showFirebase() {
    const res = await get(ref(db, "firebase"));
    const obj = res.val();
    const arr = [];

    for (const key in obj) {
      const User = obj[key];
      const newUser = {
        id: key,
        ...User,
      };
      arr.push(newUser);
    }
    setUser(arr);
  }

  useEffect(() => {
    showFirebase();
  }, []);

  async function trash(id) {
    if (window.confirm("Do you want to delete this data?")) {
      const single_User = ref(db, `firebase/${id}`);
      await remove(single_User);
      showFirebase();
      toast.error("🗑️ Data Deleted!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(SubmitData)}
        className="col-10 col-md-6 mx-auto p-5 shadow-lg rounded bg-light my-5"
      >
        <h3 className="text-center text-primary">User Management</h3>
        <div className="form-group mt-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="form-control"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-danger">{errors.username.message}</span>
          )}
        </div>
        <div className="form-group mt-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group mt-4">
          <label className="form-label">Mobile</label>
          <input
            type="tel"
            placeholder="Enter Mobile"
            className="form-control"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number should be 10 digits",
              },
            })}
          />
          {errors.mobile && (
            <span className="text-danger">{errors.mobile.message}</span>
          )}
        </div>
        <button className="btn btn-success w-100 mt-4">Submit</button>
      </form>

      <div className="container my-5">
        <h3 className="text-center text-secondary">Users List</h3>
        <table className="table table-responsive table-striped table-hover shadow-sm rounded mt-4">
          <thead className="table-primary">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((User, index) => (
              <tr key={User.id}>
                <td>{index + 1}</td>
                <td>{User.username}</td>
                <td>{User.email}</td>
                <td>{User.mobile}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => trash(User.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <NavLink
                    className="btn btn-primary btn-sm mx-2"
                    to={`/user/${User.id}`}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </NavLink>
                  <NavLink
                    className="btn btn-warning btn-sm"
                    to={`/update/${User.id}`}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </>
  );
};

export default Create;
