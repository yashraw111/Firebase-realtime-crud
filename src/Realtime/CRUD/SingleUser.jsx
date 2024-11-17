import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const [User, setUser] = useState({});
  const { id } = useParams();

  async function Single() {
    const single_User = await get(ref(db, `firebase/${id}`));
    console.log(single_User.val());
    setUser(single_User.val());
  }

  useEffect(() => {
    Single();
  }, []);
  return (
    <>
      <h1 className="text-center my-5 text-primary">View User Details</h1>
      <div className="col-10 col-md-6 mx-auto">
        <div className="card shadow-lg border-0 rounded">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">User Information</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {User.username || "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {User.email || "N/A"}
              </li>
              <li className="list-group-item">
                <strong>Mobile:</strong> {User.mobile || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
