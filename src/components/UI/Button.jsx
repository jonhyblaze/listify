const Button = ({ children, className }) => {
  return (
    <>
      <button className={`my-1 rounded-md  p-1 ${className}`}>
        <span>{children}</span>
      </button>
    </>
  );
};

export default Button;
