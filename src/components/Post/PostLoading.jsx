import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Post({ isUserPage }) {
  return (
    <div
      className={`post-paper w-100 bg-white rounded-4 p-4 ${
        isUserPage ? "mb-4 mt-4 mt-lg-0" : "mt-4"
      }`}
    >
      <div className="d-flex justify-content-between">
        <div className="text-decoration-none">
          <div className="d-flex text-decoration-none">
            <Skeleton circle style={{ width: "60px", height: "60px" }} />
            <div className="ms-3">
              <h5 className="mt-2 mb-0 text-decoration-none text-black">
                {<Skeleton style={{ width: "150px" }} count={1} />}
              </h5>
              <p className="text-muted text-decoration-none m-0">
                {<Skeleton style={{ width: "150px" }} count={1} />}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center me-2"></div>
      </div>
      <div className="post-content mt-2">
        <p className="text-muted mb-1">{}</p>
        {
          <Skeleton
            style={{ height: "300px" }}
            count={1}
            className=" d-block w-100 rounded-4"
          />
        }
      </div>
    </div>
  );
}
export default Post;
