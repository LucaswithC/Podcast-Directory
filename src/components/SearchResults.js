import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

var sha1 = require("sha1");
const queryString = require("query-string");

import PodcastCard from "./PodcastCard";

const SearchResults = ({ search, clean }) => {
  const [rand] = useState("id" + Math.floor(Math.random() * 100000 + Date.now()));

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // if (dummy) return setPodcasts(dummy);

    const querys = {};

    let url = "";
    url = "https://api.podcastindex.org/api/1.0/search/byterm";

    if (search) querys.q = search;
    if (!clean) querys.clean = "";
    // if (max) querys.max = max;
    // if(cat) querys.cat = cat;
    // if (notcat) querys.notcat = notcat;
    // if (since) querys.since = since;
    // if (lang) querys.lang = lang;
    // if (fulltext) querys.fulltext = fulltext;

    const stringified = queryString.stringify(querys);

    if (stringified !== "") url += "?" + stringified;

    fetch("https://general-api-ddnv.onrender.com/podcast", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.count === 0) return setPodcasts("No result");
        if (data.status) setPodcasts(data.feeds || data.items || data.episodes);
      });
  }, [search, clean]);

  return (
    <div class="search-cont">
      <div class="row-header">
        <h4 class="row-title">Search Results</h4>
      </div>
      {podcasts === "No result" ? (
        <div class="no-results">Sorry, we couldn't find any Podcast matching your Search</div>
      ) : podcasts.length > 0 ? (
        <div class="search-flex">
          {podcasts.map((cast) => (
            <PodcastCard data={cast} />
          ))}
        </div>
      ) : (
        <div class="search-flex">
          {new Array(4)
            .fill(
              <div class="podcast-card skeleton-card">
                <div class="podcast-img" src="" />
                <div class="title">
                  <div></div>
                </div>
                <div class="names dimmed"></div>
              </div>
            )
            .map((card) => card)}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
