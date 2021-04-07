import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>
        Click <a href={process.env.REACT_APP_URI}>here</a> to return to the
        homepage
      </p>
      {console.log(process.env.REACT_APP_URI)}
    </div>
  );
};

export default NotFound;
