import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function PostFormLoading() {
  return (
    <div className="bg-white mb-0 mb-lg-4 mt-4 mt-lg-0 rounded-4 p-4 pb-3">
      <div className="mainForm d-flex justify-content-between align-items-center pb-2">
        <Skeleton circle style={{ width: "40px", height: "40px" }} />

        <Skeleton
          containerClassName="sceleton__wrapper flex-fill ms-3 p-0 m-0 h-40 d-flex justify-content-center align-items-center "
          className="h-100 rounded-5"
        />
      </div>

      <div className="d-flex justify-content-between align-items-center pt-2 mb-0 border-top">
        <Skeleton circle style={{ width: "40px", height: "40px" }} />
        <Skeleton circle style={{ width: "40px", height: "40px" }} />
        <Skeleton circle style={{ width: "40px", height: "40px" }} />
        <Skeleton circle style={{ width: "40px", height: "40px" }} />
        <Skeleton
          containerClassName="sceleton__wrapper h-40  d-flex justify-content-center align-items-center skeleton-btn "
          className="h-100 rounded-5"
        />
      </div>
    </div>
  );
}
export default PostFormLoading;
