import React from "react";
import { useNavigate } from "react-router-dom";

function FriendsBlock({
  friendsArray,
  handleFriendPlusMinusClick,
  isUserPage,
}) {
  const navigate = useNavigate();
  return (
    <div className="friends-block w-100 bg-white rounded-4 p-4 mt-4">
      <p className="mt-0 mb-2 fw-bold fs-5">Друзья</p>
      <ul className="friendsList m-0 mt-2 ps-0">
        {friendsArray.map(
          ({ _id, firstName, lastName, occupation, picturePath }) => {
            return (
              <li key={_id} className="friend mt-2">
                <div className="d-flex justify-content-between">
                  <div
                    className="d-flex align-items-center"
                    role="button"
                    onClick={() => {
                      navigate(`/users/${_id}`);
                    }}
                  >
                    <img
                      style={{
                        background: `url(http://localhost:3001/assets/${picturePath})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                      alt=""
                      className="me-2 rounded-circle user__avatar "
                      width="40"
                      height="40"
                    />
                    <div>
                      <p className=" mb-0">{`${firstName} ${lastName}`}</p>
                      <p className="text-muted m-0">{occupation}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {!isUserPage && (
                      <i
                        className="fa-solid fa-user-minus"
                        role="button"
                        onClick={() => {
                          handleFriendPlusMinusClick(_id);
                        }}
                      ></i>
                    )}
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
export default FriendsBlock;
