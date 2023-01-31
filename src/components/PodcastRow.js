import { h } from "preact";
import { Link } from "preact-router/match";
import { useEffect, useState } from "preact/hooks";
import { hasTouch } from "detect-touch";

var sha1 = require("sha1");
const queryString = require("query-string");

import PodcastCard from "./PodcastCard";

const RegularResults = ({ dummy, search, cat, notcat, type, max, since, lang, clean, fulltext }) => {
  const [rand] = useState("id" + Math.floor(Math.random() * 100000 + Date.now()));

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    if (dummy) return setPodcasts(dummy);

    const querys = {};

    let url = "";
    if (type === "Trending") {
      url = "https://api.podcastindex.org/api/1.0/podcasts/trending";
    } else if (type === "Recent Episodes") {
      url = "https://api.podcastindex.org/api/1.0/recent/episodes";
    } else if (type === "Random") {
      url = "https://api.podcastindex.org/api/1.0/episodes/random";
    } else {
      url = "https://api.podcastindex.org/api/1.0/search/byterm";
    }

    if (search) querys.q = search;
    if (max) querys.max = max;
    if (cat) querys.cat = cat;
    if (notcat) querys.notcat = notcat;
    if (since) querys.since = since;
    if (lang) querys.lang = lang;
    if (clean) querys.clean = clean;
    if (fulltext) querys.fulltext = fulltext;

    const stringified = queryString.stringify(querys);

    if (stringified !== "") url += "?" + stringified;

    fetch("https://general-api-ddnv.onrender.com/podcast", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setPodcasts(data.feeds || data.items || data.episodes);
      });
  }, []);

  function scrollLeft() {
    let scroll = typeof window !== "undefined" && document.querySelector(".podcast-scroll#" + rand);
    let width = scroll.children[0].clientWidth;
    scroll.scrollTo({
      left: scroll.scrollLeft - width,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    let scroll = typeof window !== "undefined" && document.querySelector(".podcast-scroll#" + rand);
    let width = scroll.children[0].clientWidth;
    scroll.scrollTo({
      left: scroll.scrollLeft + width,
      behavior: "smooth",
    });
  }

  return (
    <div class="row-outer">
      <div class="container row-header">
        <h4 class="row-title">{search || cat || type}</h4>
      </div>
      {podcasts.length > 0 ? (
        <div class="podcast-row">
          {!hasTouch && (
            <div class="row-arrow row-left" onClick={scrollLeft}>
              <i class="fa-solid fa-caret-left"></i>
            </div>
          )}
          <div class="podcast-scroll" id={rand}>
            {podcasts.map((podcast) => (
              <PodcastCard data={podcast} />
            ))}
          </div>
          {!hasTouch && (
            <div class="row-arrow row-right" onClick={scrollRight}>
              <i class="fa-solid fa-caret-right"></i>
            </div>
          )}
        </div>
      ) : (
        <div class="podcast-row">
          <div class="podcast-scroll">
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
        </div>
      )}
    </div>
  );
};

export default RegularResults;
