import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

import "./UserCard.css";

export const UserCard = memo(
  forwardRef(function UserCard({ name, email }, ref) {
    return (
      <div ref={ref} className="user-card">
        <h2 className="user-card-title">{name}</h2>
        <p className="user-card-email">{email}</p>
      </div>
    );
  })
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
