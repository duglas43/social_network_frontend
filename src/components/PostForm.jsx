import React from "react";
import { Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/post";
function PostForm({ handleSubmit }) {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [isDragEnter, setIsDragEnter] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [isImageClicked, setIsImageClicked] = React.useState(false);
  React.useEffect(() => {
    const element = inputRef.current;
    const handleKeyUp = () => {
      inputRef.current.style.overflow = "hidden";
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    };
    element.addEventListener("keyup", handleKeyUp);
    return () => {
      element.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="bg-white mb-0 mb-lg-4 mt-4 mt-lg-0 rounded-4 p-4 pb-3">
      <div className="mainForm d-flex justify-content-between align-items-center pb-2">
        <img
          src="https://i.pinimg.com/originals"
          className="rounded-circle"
          width="40px"
          height="40px"
          alt=""
        />
        <Form
          className="flex-fill ms-3"
          id="postForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({ file, inputRef, setIsImageClicked, setFile });
          }}
        >
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              ref={inputRef}
              as="textarea"
              required
              rows={1}
              className=" rounded-5 border-0 grey-200"
              style={{
                resize: "none",
              }}
              placeholder="Что у вас нового?"
            />
          </Form.Group>
        </Form>
      </div>
      {isImageClicked && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
          onDragEnter={() => setIsDragEnter(true)}
          onDragLeave={() => setIsDragEnter(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <div
                className={`col-sm-24 border border-1 mb-2  ${
                  isDragEnter ? "border-success dashed" : ""
                } rounded-2 px-2 pt-3 pb-1`}
                role="button"
              >
                <input {...getInputProps()} />
                {!file ? (
                  <p className="text-secondary">Перетащите файлы сюда</p>
                ) : (
                  <p>{file.name}</p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      )}
      <div className="d-flex justify-content-between align-items-center pt-2 mb-0 border-top">
        <i
          className="fas fa-images fa-lg text-muted"
          role="button"
          onClick={() => {
            setIsImageClicked(() => !isImageClicked);
          }}
        ></i>
        <i className="fas fa-video fa-lg text-muted"></i>
        <i className="fa-solid fa-paperclip fa-lg text-muted"></i>
        <i className="fa-solid fa-microphone fa-lg text-muted"></i>
        <Button form="postForm" type="sybmit" className="rounded-5">
          Опубликовать
        </Button>
      </div>
    </div>
  );
}
export default PostForm;
