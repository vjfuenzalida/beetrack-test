import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon-button.scss';

const Icon = ({icon = null}) => {
  if (!icon) return null;
  return (
    <span className="button-icon">
      <FontAwesomeIcon icon={icon} size="lg"/>
    </span>
  )
}

// The IconButton component renders a fontawesome icon and a text next to it.
// If the icon is not available, only the text is rendered.
const IconButton = (props) => {
  const { icon, text, onClick } = props;
  return (
    <button className="btn button-container" onClick={onClick}>
      <Icon icon={icon}></Icon>
      <span className="text-white">{text}</span>
    </button>
  );
};

export default IconButton;
