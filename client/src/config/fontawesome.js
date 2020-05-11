import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle, faSearch, faArrowCircleRight, faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

// Define the list of loaded and supported fontawesome icons
const ICON_LIST = [
  faPlusCircle,
  faArrowCircleLeft,
  faArrowCircleRight,
  faSearch,
];


// Adds a fixed list of icons to the font awesome local library
// so they can be called from the component.
const buildLibrary = () => {
  library.add(...ICON_LIST);
};

const FontAwesome = {
  buildLibrary,
};

export default FontAwesome;
