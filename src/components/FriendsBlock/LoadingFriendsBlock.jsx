import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function LoadingFriendsBlock() {
  return (
    <div className="friends-block w-100 bg-white rounded-4 p-4 ">
      <p className="mt-0 mb-2 fw-bold fs-5">Друзья</p>
      <ul className="friendsList m-0 mt-2 ps-0">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </ul>
    </div>
  );
}
export default LoadingFriendsBlock;
