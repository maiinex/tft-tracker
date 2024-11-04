import "./SummonerInfo.css";

function SummonerInfo(props) {
  return (
    <div className="summonerInfo">
      <p>{props.playerData.name}</p>
      <img
        className="summonerIcon"
        width="150"
        height="150"
        src={
          "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/" +
          props.playerData.profileIconId +
          ".png"
        }
      />

      <p>Summoner Level: {props.playerData.summonerLevel}</p>
    </div>
  );
}
export default SummonerInfo;
