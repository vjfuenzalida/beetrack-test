import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import IconButton from "../../components/icon-button";
import "./new-user-modal.scss";

// The NewUserModal component displays a modal when its 'show' property is true.
// The modal contains a form with user information, that is then passed to the onSubmit method.
const NewUserModal = (props) => {
  const { show, onHide, onSubmit } = props;
  const [values, setValues] = useState({
    photo: "",
    name: "",
    description: "",
  });

  const clearInputs = () => {
    setValues({
      photo: "",
      name: "",
      description: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const submitForm = () => {
    onSubmit(values).then(() => {
      clearInputs();
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-container"
    >
      <div className="modal-header">
        <h1 className="text-c-gray text-w-bold modal-title">
          Agregar nuevo contacto
        </h1>
      </div>
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <form id="new-user-form">
                <div className="form-group">
                  <label>URL Imagen de perfil</label>
                  <input
                    onChange={handleInputChange}
                    value={values.photo}
                    type="text"
                    className="form-control"
                    id="userUrl"
                    name="photo"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    onChange={handleInputChange}
                    value={values.name}
                    type="text"
                    className="form-control"
                    id="userName"
                    name="name"
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    onChange={handleInputChange}
                    value={values.description}
                    className="form-control"
                    id="userDescription"
                    name="description"
                    rows="5"
                    required
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="row modal-actions">
            <div className="col-12">
              <IconButton text="Guardar" onClick={submitForm} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewUserModal;
