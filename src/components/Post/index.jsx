import React from "react";
import { useNavigate } from "react-router-dom";
function Post({
  _id,
  userId,
  firstName,
  lastName,
  userPicturePath,
  picturePath,
  description,
  likes,
  location,
  myId,
  myFriends,
  handleLikeClick,
  handleFriendPlusMinusClick,
  isUserPage,
}) {
  const navigate = useNavigate();
  const handleUserClick = () => {
    if (userId !== undefined && userId !== null && userId !== myId) {
      navigate(`/users/${userId}`);
    }
  };
  return (
    <div
      className={`post-paper w-100 bg-white rounded-4 p-4 ${
        isUserPage ? "mb-4 mt-4 mt-lg-0" : "mt-4"
      }`}
    >
      <div className="d-flex justify-content-between">
        <div
          className="text-decoration-none"
          role={userId === myId ? "" : "button"}
          onClick={handleUserClick}
        >
          <div className="d-flex text-decoration-none">
            <img
              style={{
                background: `url(http://localhost:3001/assets/${userPicturePath})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              alt=""
              className="me-2 rounded-circle "
              width="60"
              height="60"
            />
            <div>
              <h5 className="mt-2 mb-0 text-decoration-none text-black">{`${firstName} ${lastName}`}</h5>
              <p className="text-muted text-decoration-none m-0">{location}</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center me-2">
          {userId !== myId &&
            (myFriends.includes(userId) ? (
              <i
                className="fa-solid fa-user-minus"
                onClick={() => {
                  handleFriendPlusMinusClick(userId);
                }}
                role="button"
              ></i>
            ) : (
              <i
                className="fa-solid fa-user-plus"
                onClick={() => {
                  handleFriendPlusMinusClick(userId);
                }}
                role="button"
              ></i>
            ))}
        </div>
      </div>
      <div className="post-content mt-2">
        <p className="text-muted mb-1">{description}</p>
        {picturePath && (
          <img
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="postImg"
            className="mb-2 w-100 rounded-4"
          />
        )}
      </div>
      <div className="post-reactions mt-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            {likes[myId] ? (
              <i
                className="fa-solid fa-heart text-primary"
                role="button"
                style={{ fontSize: "1.25rem" }}
                onClick={() => {
                  handleLikeClick(_id);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart fa-lg"
                role="button"
                onClick={() => {
                  handleLikeClick(_id);
                }}
              ></i>
            )}
            <p className="text-muted m-0 ms-2">{Object.keys(likes).length}</p>
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-share-nodes fa-lg me-2" role="button"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
