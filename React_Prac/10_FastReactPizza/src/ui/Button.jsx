import { Link } from "react-router-dom";

function Button({ children, disabled, to, handleClick }) {
  if (to)
    return (
      <Link
        to={to}
        className="inline-block bg-yellow-400 px-4 py-3 font-semibold uppercase text-stone-800 hover:bg-yellow-300 md:px-6 md:py-4"
        onClick={handleClick}
      >
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className="inline-block bg-yellow-400 px-4 py-3 font-semibold uppercase text-stone-800 hover:bg-yellow-300 md:px-6 md:py-4"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
