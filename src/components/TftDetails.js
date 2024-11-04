import React, { useEffect, useState } from "react";
import "./TftDetails.css";
import "./Button.css";

function TftDetails(props) {
  // const imagePath = props.tier.toLowerCase();
  return (
    <>
      <div className="tftGameMode">
        <button className="button">Ranked</button>
        <button className="button">Double-Up</button>
        <button className="button">Normal</button>
      </div>
      <div className="tftDetailsWrapper">
        <div className="tftDetails">
          <div className="tftDetailsRank">
            <img
              className="rankEmblem"
              src={require(`../assets/ranked-emblems/${props.tier.toLowerCase()}.png`)}
              alt={`${props.tier} Emblem`}
            />
            <div className="tftDetailsRankTier">
              <p>Tier:</p>
              <p>
                {props.tier} {props.rank}
              </p>
              <p>{props.leaguePoints} LP</p>
            </div>
          </div>
        </div>
        <div className="tftDetailsInfoContainer">
          <p>Recent placements:</p>
          <div className="tftDetailsInfo">
            <div className="tftDetailsInfoAveragePlacement"></div>
            {props.placement.map((placement, index) => (
              <div
                className={`tftDetailsInfoPlacement place-item--type-${placement.placement}`}
                key={index}
              >
                #{placement.placement}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TftDetails;
