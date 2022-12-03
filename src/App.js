import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, Login, Registration, NotFound, UserPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectAuthStatus } from "./redux/slices/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
