import "./SummonerSearch.css";

function SummonerSearch(props) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.getSummonerId();
    }
  };
  return (
    <div className="container">
      {/* <h5>Search Player</h5> */}
      <div className="summonerSearchBar">
        <div className="summonerSearchBar name">
          <input
            type="text"
            placeholder="Summoner Name"
            value={props.value}
            onChange={(e) => props.setSearchNameText(e.target.value)}
            onKeyUp={handleKeyPress}
          ></input>
        </div>
        <div className="summonerSearchBar tag">
          <input
            type="text"
            placeholder="Tagline"
            value={props.value1}
            onChange={(e) => props.setSearchTagText(e.target.value)}
            onKeyUp={handleKeyPress}
          ></input>
        </div>

        <button
          className="button"
          onClick={function (event) {
            props.getSummonerId();
            // props.getPlayerMatchIds();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default SummonerSearch;
