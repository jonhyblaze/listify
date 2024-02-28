const Button = ({ onClick, children, className }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`my-1 rounded-md px-1 py-2 ${className}`}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </button>
    </>
  );
};

export default Button;
