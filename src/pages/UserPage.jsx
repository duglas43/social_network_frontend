import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPosts, fetUserPosts, setPost } from "../redux/slices/post";
import {
  fetchUser,
  selectUserData,
  selectUserStatus,
  setUserFriends,
} from "../redux/slices/user";
import {
  setFriends,
  selectAuthData,
  selectAuthStatus,
} from "../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../axios";
import {
  UserInfo,
  Post,
  Advertisment,
  FriendsBlock,
  PostLoading,
  LoadingFriendsBlock,
} from "../components";

function UserPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);

  const userData = useSelector(selectUserData);
  const userStatus = useSelector(selectUserStatus);

  const posts = useSelector(selectPosts);
  const postsStatus = useSelector((state) => state.post.status);

  const handleLikeClick = async (postId) => {
    const { data } = await axios.patch(`/post/${postId}/like`);
    dispatch(setPost(data));
  };
  const handleFriendPlusMinusClick = async (userId) => {
    const { data } = await axios.patch(`/users/${userId}`);
    dispatch(setFriends(data));
    dispatch(setUserFriends(data));
  };

  React.useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetUserPosts(id));
    window.scrollTo(0, 0);
  }, [id]);
  React.useEffect(() => {
    if (authStatus === "loaded" && id === authData._id) {
      navigate("/");
    }
  }, [authStatus, id]);
  return (
    <div className="my-4">
      <Container>
        <Row>
          <Col lg={{ span: 7, order: 1 }} xs={{ order: 1 }}>
            {
              <UserInfo
                isUserPage
                myFriends={
                  authStatus === "loaded" && userStatus === "loaded"
                    ? authData.friends
                    : null
                }
                isLoading={authStatus !== "loaded" || userStatus !== "loaded"}
                {...userData}
                handleFriendPlusMinusClick={handleFriendPlusMinusClick}
              />
            }
          </Col>
          <Col lg={{ span: 10, order: 2 }} xs={{ order: 3 }}>
            {postsStatus === "loaded" &&
            authStatus === "loaded" &&
            userStatus === "loaded"
              ? posts.map((post) => {
                  return (
                    <Post
                      myId={authData?._id}
                      key={post._id}
                      {...post}
                      isUserPage
                      myFriends={authData.friends}
                      handleLikeClick={handleLikeClick}
                      handleFriendPlusMinusClick={handleFriendPlusMinusClick}
                    />
                  );
                })
              : Array(5)
                  .fill(0)
                  .map((_, index) => <PostLoading isUserPage key={index} />)}
          </Col>
          <Col lg={{ span: 7, order: 3 }} xs={{ order: 2 }}>
            {authStatus === "loaded" ? (
              <Advertisment />
            ) : (
              <PostLoading isUserPage />
            )}
            {userStatus === "loaded" ? (
              <FriendsBlock
                friendsArray={userData.expandedFriends}
                isUserPage={true}
              />
            ) : (
              <LoadingFriendsBlock />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default UserPage;
