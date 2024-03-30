import React from "react";
import { Link } from "react-router-dom";

export default function IndexBox({ title, href  }) {
  return (
    <div className="col-4">
      <Link to={href} className="main__link" href="#">
        {title}
      </Link>
    </div>
  );
}
