import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFriends,
  selectAuthData,
  selectAuthStatus,
} from "../../redux/slices/auth";
import { selectPosts, fetchPosts, setPost } from "../../redux/slices/post";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../axios";
import {
  UserInfo,
  Post,
  Advertisment,
  FriendsBlock,
  PostForm,
} from "../../components";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector((state) => state.post.status);

  const handleSubmit = async ({
    file,
    inputRef,
    setIsImageClicked,
    setFile,
  }) => {
    const formData = new FormData();
    if (file) {
      formData.append("picture", file);
      formData.append("picturePath", file.name);
    } else {
      formData.append("picturePath", "");
    }
    formData.append("description", inputRef.current.value);
    await axios.post("/post", formData);
    inputRef.current.value = "";
    setIsImageClicked(false);
    setFile(null);
    dispatch(fetchPosts());
  };

  const handleLikeClick = async (postId) => {
    const { data } = await axios.patch(`/post/${postId}/like`);
    dispatch(setPost(data));
  };

  const handleFriendPlusMinusClick = async (userId) => {
    const { data } = await axios.patch(`/users/${userId}`);
    dispatch(setFriends(data));
  };

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  React.useEffect(() => {
    if (authStatus === "error") {
      navigate("/login");
    }
  }, [authStatus]);
  return (
    <div className="my-4">
      <Container>
        <Row>
          <Col lg={{ span: 7, order: 1 }} xs={{ order: 1 }}>
            {authStatus === "loaded" && <UserInfo {...authData} />}
          </Col>
          <Col lg={{ span: 10, order: 2 }} xs={{ order: 3 }}>
            <PostForm handleSubmit={handleSubmit} />
            {postsStatus === "loaded" &&
              authStatus === "loaded" &&
              posts.map((post) => {
                return (
                  <Post
                    myId={authData?._id}
                    key={post._id}
                    {...post}
                    myFriends={authData.friends}
                    handleLikeClick={handleLikeClick}
                    handleFriendPlusMinusClick={handleFriendPlusMinusClick}
                  />
                );
              })}
          </Col>
          <Col lg={{ span: 7, order: 3 }} xs={{ order: 2 }}>
            <Advertisment />
            {authStatus === "loaded" && authData.expandedFriends?.length && (
              <FriendsBlock
                friendsArray={authData.expandedFriends}
                handleFriendPlusMinusClick={handleFriendPlusMinusClick}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
