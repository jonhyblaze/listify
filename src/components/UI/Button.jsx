const Button = ({ onClick, children, className }) => {
  return (
    <>
      <button onClick={onClick} className={`my-1 rounded-md  p-1 ${className}`}>
        <span className="">{children}</span>
      </button>
    </>
  );
};

export default Button;
