import React from "react";
import styles from "./UserInfo.module.scss";
function UserInfo({
  _id,
  firstName,
  myFriends,
  lastName,
  location,
  occupation,
  picturePath,
  viewdProfile,
  impressions,
  isUserPage,
  friends,
  handleFriendPlusMinusClick,
}) {
  const declOfNum = (number, words) => {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  };
  return (
    <div className="userInfo-paper w-100 bg-white rounded-4 p-4">
      <div className={`${styles.border__grey} border-bottom pb-2`}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              style={{
                background: `url(${process.env.REACT_APP_API_URL}/assets/${picturePath})`,
              }}
              alt=""
              className="me-2 rounded-circle user__avatar"
              width="60"
              height="60"
            />
            <div>
              <h5 className="mt-2 mb-0">{`${firstName} ${lastName}`}</h5>
              <p className="text-muted m-0">{`${friends.length} ${declOfNum(
                friends.length,
                ["друг", "друга", "друзей"]
              )}`}</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            {isUserPage &&
              (myFriends.includes(_id) ? (
                <i
                  className="fa-solid fa-user-minus text-muted"
                  role="button"
                  onClick={() => {
                    handleFriendPlusMinusClick(_id);
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-user-plus text-muted"
                  role="button"
                  onClick={() => {
                    handleFriendPlusMinusClick(_id);
                  }}
                ></i>
              ))}
          </div>
        </div>
      </div>
      <div
        className={`${styles.border__grey} border-bottom pb-2 secondary-info mt-2`}
      >
        <div className="location py-2">
          <i className="fa-solid fa-location-dot fa-lg ms-1 pe-3 text-muted"></i>
          <p className="text-muted d-inline">{location}</p>
        </div>
        <div className="occupation py-2">
          <i className="fa-solid fa-suitcase fa-lg pe-3 text-muted"></i>
          <p className="text-muted d-inline">{occupation}</p>
        </div>
      </div>
      <div className={`${styles.border__grey} pt-1 third-info mt-2`}>
        <div className="d-flex justify-content-between">
          <p className="text-muted">Количество просмотров профиля</p>
          <p>{viewdProfile}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-muted mb-0">Количество реакций</p>
          <p className="mb-0">{impressions}</p>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
