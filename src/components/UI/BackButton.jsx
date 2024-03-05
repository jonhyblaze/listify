import PropTypes from "prop-types";

const BackButton = ({ toggler, className }) => {
  return (
    <div onClick={toggler} className={`cursor-pointer pr-1 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="#FFFFFF"
          d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};
export default BackButton;

BackButton.propTypes = {
  navigate: PropTypes.func,
  path: PropTypes.string,
  toggler: PropTypes.func,
  className: PropTypes.string,
};
