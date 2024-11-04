import React, { useEffect, useState } from "react";
import "./Summoner.css";
import "./Button.css";
import axios from "axios";
import SummonerSearch from "./SummonerSearch";
import SummonerInfo from "./SummonerInfo";
import TftDetails from "./TftDetails";

// TODO
// Implement loader until all data fetched
// Replace Summoner css in summonerinfo css
// Make new component solely for fetching API data
// use matchData instead of placement array to improve reusability
// Average Placement
// Use JSX for later components
// On search go to route /localhost:3000/{summoner_name}

function Summoner() {
  const [searchNameText, setSearchNameText] = useState("");
  const [searchTagText, setSearchTagText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [playerPuuid, setPlayerPuuid] = useState("");
  const [playerMatchId, setPlayerMatchId] = useState({});
  const [matchData, setMatchData] = useState([]);
  const [placement, setPlacement] = useState([]);
  const [playerLeague, setPlayerLeague] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Search for player details

  const getSummonerId = async () => {
    var APICallStringPuuid =
      "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" +
      searchNameText +
      "/" +
      searchTagText +
      "/?api_key=" +
      API_KEY;

    try {
      const { data } = await axios.get(APICallStringPuuid);
      //store puuid to use in next request
      const puuid = data.puuid;
      const { data: reqData } = await axios.get(
        "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" +
          puuid +
          "?api_key=" +
          API_KEY
      );
      setPlayerData(reqData);
      console.log(reqData);
    } catch (e) {
      console.log(e);
      setPlayerData({});
    }
    setSearchNameText("");
    setSearchTagText("");
  };

  // Get player rank
  async function getSummonerRank(event) {
    try {
      // Set up correct API call
      var APICallString =
        "https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/" +
        playerData.id +
        "?api_key=" +
        API_KEY;

      const response = await axios.get(APICallString);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Get last 20 matches played
  async function getPlayerMatchIds(event) {
    // Set up correct API call
    var APICallString =
      "https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/" +
      playerData.puuid +
      "/ids?start=0&count=20&api_key=" +
      API_KEY;

    // Handle API call
    try {
      const response = await axios.get(APICallString);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function getMatchDetails(matchId) {
    // Set up correct API call
    var APICallString =
      "https://europe.api.riotgames.com/tft/match/v1/matches/" +
      matchId +
      "?api_key=" +
      API_KEY;

    //Handle API call
    return axios
      .get(APICallString)
      .then(function (response) {
        // Success
        return response.data.info;
      })
      .catch(function (error) {
        // Error
        console.log(error);
        return null;
      });
  }

  async function fetchMatchDetails() {
    setPlacement([""]);
    let nextId = 0;
    const matchIds = await getPlayerMatchIds();
    setPlayerMatchId(matchIds);

    if (matchIds.length > 0) {
      const updatedPlacement = [];

      for (let i = 0; i < matchIds.length; i++) {
        const matchId = matchIds[i];
        const matchDetails = await getMatchDetails(matchId);
        // console.log(matchDetails);

        if (matchDetails && matchDetails.queue_id === 1100) {
          for (let j = 0; j <= 7; j++) {
            if (matchDetails.participants[j].puuid === playerData.puuid) {
              const min = String(
                Math.floor(matchDetails.participants[j].time_eliminated / 60)
              );
              const sec = String(
                (matchDetails.participants[j].time_eliminated % 60).toFixed(0)
              );
              updatedPlacement.push({
                id: nextId,
                placement: matchDetails.participants[j].placement,
                time: min + ":" + sec,
              });
              nextId++;
              break;
            }
          }
        }
      }
      setPlacement(updatedPlacement);
    }
  }

  useEffect(() => {
    if (JSON.stringify(playerData) !== "{}") {
      async function fetchData() {
        const playerLeagueData = await getSummonerRank();
        setPlayerLeague(playerLeagueData);
        fetchMatchDetails();
      }
      fetchData();
    }
  }, [playerData]);

  return (
    <>
      <SummonerSearch
        value={searchNameText}
        value1={searchTagText}
        setSearchNameText={setSearchNameText}
        setSearchTagText={setSearchTagText}
        // searchForPlayerPuuid={searchForPlayerPuuid}
        getSummonerId={getSummonerId}
        // getPlayerMatchIds={getPlayerMatchIds}
      />
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <div className="summoner">
            <SummonerInfo playerData={playerData} />
            {console.log(playerData)}
            {/* {console.log(playerMatchId)} */}
            {/* {console.log("MATCH DATA:" + JSON.stringify(matchData[2]))} */}
            {/* {console.log("All placements: " + JSON.stringify(placement))} */}

            {/* {console.log(playerData)} */}
            {/* <button onClick={(e) => getPlayerMatchIds(e)}>getMatchIds</button> */}
          </div>
          <div className="details">
            {playerLeague.length > 0 ? (
              <TftDetails
                tier={playerLeague[0].tier}
                rank={playerLeague[0].rank}
                leaguePoints={playerLeague[0].leaguePoints}
                placement={placement}
              />
            ) : (
              <p>Loading matches...</p>
            )}
          </div>
        </>
      ) : (
        <>
          <p>No Player data</p>
        </>
      )}
    </>
  );
}

export default Summoner;
