import React from "react";
import "./Profile.css";

//! Exemple de composant réutilisable

const ProfileCard = ({
  Profile,
  settings,
  disabled,
  buttonFunction,
  buttonLabel,
  cardTitle,
  cardText,
  cardNumber,
  color,
  buttonCSS,
}) => {
  return (
    <div className="Profile-Container">
      {Profile ? (
        <>
          <h2 className={`Profile-${color}`}>
            {Profile.firstname} {Profile.lastname}
          </h2>
          <p>
            <strong>Email</strong> : {Profile.email}
          </p>
          <p>
            <strong>Adresse</strong> : {Profile.address}, {Profile.cp},{" "}
            {Profile.city}, {Profile.region}
          </p>
        </>
      ) : (
        <>
          <div className="OfferNb">
            <h2 className={`Profile-${color}`}>{cardTitle}</h2>
            {settings ? (
              <span className="fas fa-cog" />
            ) : (
              <h2 className={`Profile-${color}`}>{cardNumber}</h2>
            )}
          </div>
          <p>{cardText}</p>{" "}
        </>
      )}
      {cardNumber !== 0 && (
        <button
          className={`ButtonOffer ${buttonCSS}`}
          onClick={buttonFunction}
          disabled={disabled}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
