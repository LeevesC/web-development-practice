import { useState } from "react";

export default function StarRating({ maxRating, onSetRating }) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
  const starContainerStyle = {
    display: "flex",
    gap: "0px",
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
  };

  const [rate, setRate] = useState(null);
  const [buffRate, setBuffRate] = useState(null);

  function handleMouseEnter(id) {
    // console.log(id);
    setBuffRate(() => id + 1);
  }
  function handleMouseLeave() {
    setBuffRate(null);
  }
  function handleRate(id) {
    setRate(() => id + 1);
    onSetRating(id + 1);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) =>
          (buffRate > 0 ? index < buffRate : index < rate) ? (
            <FillInStar
              key={index}
              handleMouseLeave={handleMouseLeave}
              handleMouseEnter={handleMouseEnter}
              handleRate={handleRate}
              index={index}
            />
          ) : (
            <OutlineStar
              key={index}
              handleMouseEnter={handleMouseEnter}
              index={index}
            />
          )
        )}
      </div>
      <p style={textStyle}>{rate}</p>
    </div>
  );
}

const starStyle = {
  width: "35px",
  height: "35px",
  display: "block",
  cursor: "pointer",
};

function OutlineStar({ handleMouseEnter, index }) {
  return (
    <span
      role="button"
      style={starStyle}
      onMouseEnter={() => handleMouseEnter(index)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#000"
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </span>
  );
}
function FillInStar({ handleMouseLeave, handleMouseEnter, handleRate, index }) {
  return (
    <span
      role="button"
      style={starStyle}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => handleMouseEnter(index)}
      onClick={() => handleRate(index)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#000"
        stroke="#000"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
