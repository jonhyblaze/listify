import PropTypes from "prop-types";

const Button = ({ children, onClick, className }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`my-1 rounded-md px-1 py-2 ${className}`}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </div>
    </>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
