import React from "react";
import style from "./Registration.module.scss";
import { Container, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  selectAuthStatus,
  fetchAuthMe,
  fetchAuth,
} from "../../redux/slices/auth";
import { Link } from "react-router-dom";
const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Введите имя"),
  lastName: Yup.string().required("Введите фамилию"),
  email: Yup.string().email("Не верный формат email").required("Введите email"),
  password: Yup.string().required("Введите пароль"),
  location: Yup.string().required("Введите местоположение"),
  occupation: Yup.string().required("Введите род деятельности"),
  picture: Yup.mixed().required("Загрузите фото"),
});
function Registration() {
  let [isDragEnter, setIsDragEnter] = React.useState(false);
  let [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const data = await dispatch(fetchRegister(formData));
    if (!!!data.payload) {
      setIsRegisterSuccess(false);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  const handleGuestButtonClick = async () => {
    const data = await dispatch(
      fetchAuth({ email: "test@mail.com", password: "123456789" })
    );
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (authStatus === "loaded") {
    dispatch(fetchAuthMe());
    navigate("/");
  }
  return (
    <Container fluid className={`${style.container}`}>
      <div className="bg-white rounded-4 px-3 px-md-5 py-3 my-4">
        <h1 className="fs-4 pb-1">Добро пожаловать на SocialNetwork</h1>
        <h2></h2>
        <Formik
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            location: "",
            occupation: "",
            picture: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Form.Group as={Col} md="12" controlId="validationFormik01">
                  <Form.Label className="m-0">Имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Имя"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => {}}
                    isInvalid={touched.firstName && !!errors.firstName}
                    isValid={touched.firstName && !errors.firstName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik02">
                  <Form.Label className="m-0">Фамилия</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Фамилия"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lastName && !!errors.lastName}
                    isValid={touched.lastName && !errors.lastName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={24} controlId="validationFormik03">
                  <Form.Label className="m-0">Местоположение</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Местоположение"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.location && !!errors.location}
                    isValid={touched.location && !errors.location}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={24} controlId="validationFormik04">
                  <Form.Label className="m-0">Род занятости</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Род занятости"
                    name="occupation"
                    value={values.occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.occupation && !!errors.occupation}
                    isValid={touched.occupation && !errors.occupation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.occupation}
                  </Form.Control.Feedback>
                </Form.Group>

                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                  onDragEnter={() => setIsDragEnter(true)}
                  onDragLeave={() => setIsDragEnter(false)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <div
                        className={`col-sm-24 border border-1 ${
                          touched.picture && errors.picture
                            ? "border-danger"
                            : ""
                        } ${
                          isDragEnter ? "border-success dashed" : ""
                        } rounded-2 px-2 pt-3 pb-1`}
                        role="button"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p className="text-secondary">
                            Перетащите файлы сюда
                          </p>
                        ) : (
                          <p>{values.picture.name}</p>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className="m-1 text-danger fs-6">
                  {touched.picture && errors.picture}
                </div>

                <Form.Group as={Col} sm={24} controlId="validationFormikEmail">
                  <Form.Label className="m-0">Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  as={Col}
                  sm={24}
                  controlId="validationFormik06"
                  className="mb-3"
                >
                  <Form.Label className="m-0">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                {!isRegisterSuccess && (
                  <p className="text-danger mt-0 mb-1">
                    Не удалось зарегистрироваться
                  </p>
                )}
                <Col className="d-grid mt-0">
                  <Button type="submit" className={style.reg__button}>
                    Зарегистрироваться
                  </Button>
                  <p className="text-center my-2">Или</p>
                  <Button
                    onClick={handleGuestButtonClick}
                    className={style.reg__button}
                  >
                    Зайти гостем
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <p role="button" className="text-primary pt-2 m-0">
          <Link className="text-decoration-none" to="/login">
            Уже есть аккаунт? Войти
          </Link>
        </p>
      </div>
    </Container>
  );
}
export default Registration;
