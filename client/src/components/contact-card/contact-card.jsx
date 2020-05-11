import React from "react";
import "./contact-card.scss";

// The ContactCard component renders a card with the user minimal information
// such as its name, a picture, and a button to delete the user
const ContactCard = (props) => {
  const { name, photo, showAction, onClickDelete } = props;
  return (
    <div className="card-wrapper">
      <div className="card-photo">
        <img
          alt="Contact User"
          src={photo}
        ></img>
      </div>
      <div className="card-content">
        <div className="card-name">
          <span className="text-c-gray text-w-bold">{name}</span>
        </div>
        {
          showAction ? 
          <div className="card-action text-c-yellow">
            <div onClick={onClickDelete}>
              <span>Eliminar</span>
            </div>
          </div> : null
        }
      </div>
    </div>
  );
};

export default ContactCard;
