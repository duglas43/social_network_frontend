import React from "react";
function Advertisment() {
  return (
    <div className="sponsored-block w-100 bg-white rounded-4 p-4 mt-4 mt-lg-0 d-none d-lg-block">
      <div className="d-flex justify-content-between ">
        <h5 className="my-0">Реклама</h5>
        <p className="text-muted my-0"></p>
      </div>
      <div className="sponsored-content mt-2">
        <img
          src="https://i.pinimg.com/originals"
          alt="avatar"
          className="me-2 w-100 rounded-4"
        />
      </div>
      <div className="d-flex justify-content-between my-2">
        <p className="mb-0">Some Company</p>
        <p className="text-muted mb-0">someSite.com</p>
      </div>
      <p className="text-muted mb-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Itaque, sed.
      </p>
    </div>
  );
}
export default Advertisment;
