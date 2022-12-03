import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const inputRef = React.useRef();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const updateSearchResults = React.useCallback(
    debounce((str) => {
      axios.get(`/users/find/query/?text=${str}`).then(({ data }) => {
        setSearchResults(data);
      });
    }, 400),
    []
  );
  const onChangeInput = (e) => {
    setIsSearchOpen(true);
    setInputValue(e.target.value);
    updateSearchResults(e.target.value);
  };
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Form className="position-relative">
      <Form.Control
        ref={inputRef}
        value={inputValue}
        onChange={onChangeInput}
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="grey-200 my-3 my-md-0 border-0"
      />
      <div
        className={`position-absolute ${
          !!searchResults.length && inputValue && isSearchOpen ? "" : "d-none"
        }  start-0 w-100 bg-white rounded search-block py-2 `}
      >
        {!!searchResults.length &&
          searchResults.map((user) => (
            <div
              key={user._id}
              className=" search-block__item"
              role="button"
              onClick={() => {
                navigate(`/users/${user._id}`);
              }}
            >
              <div className=" px-2 d-flex align-items-center py-2 ">
                <img
                  style={{
                    background: `url(${process.env.REACT_APP_API_URL}/assets/${user.picturePath})`,
                  }}
                  alt=""
                  className="me-2 rounded-circle user__avatar"
                  width="30"
                  height="30"
                />
                <p className="m-0">{`${user.firstName} ${user.lastName}`}</p>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
}
export default Search;
