import PropTypes from "prop-types";

const OptionsButton = ({ toggle, index = null, className }) => {
  return (
    <aside onClick={toggle} className={`cursor-pointer ${className}`}>
      <svg
        id={index}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="6" r="2" fill="#FFFFFF" pointerEvents="none" />
        <circle cx="12" cy="12" r="2" fill="#FFFFFF" pointerEvents="none" />
        <circle cx="12" cy="18" r="2" fill="#FFFFFF" pointerEvents="none" />
      </svg>
    </aside>
  );
};

export default OptionsButton;

OptionsButton.propTypes = {
  index: PropTypes.number,
  toggle: PropTypes.func,
  className: PropTypes.string,
};