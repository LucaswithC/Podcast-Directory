import { h } from "preact";
import { Link } from "preact-router/match";
import { useEffect, useState } from "preact/hooks";
import { hasTouch } from "detect-touch";

var sha1 = require("sha1");
const queryString = require("query-string");

import PodcastCard from "./PodcastCard";

const Favourites = ({ favourites }) => {
  const [rand] = useState("id" + Math.floor(Math.random() * 100000 + Date.now()));

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    let promises = [];
    let podcastList = [];

    favourites.forEach((entry) => {
      let url = "https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=" + entry;
      let url2 = "https://api.podcastindex.org/api/1.0/episodes/byid?id=" + entry;
      const promise = fetch("https://my-api-lucas.herokuapp.com/podcast", {
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
          if (data.description !== "No feeds match this id.") return { res: data, promise: "promise" + entry };
          return fetch("https://my-api-lucas.herokuapp.com/podcast", {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: url2
            })
          })
          .then((response) => response.json())
          .then((episodes) => {
            if (episodes.description !== "Episode not found.") return { res: episodes, promise: "promise" + entry };
            else return { res: "empty", promise: "promise" + entry };
          })
        })

      promises.push(promise);
    });
    Promise.all(promises).then((values) => {
      values.forEach((value) => {
        if (value.res !== "empty") podcastList.push(value.res.feed || value.res.episode);
      });
      setPodcasts(podcastList);
    });
  }, [favourites]);

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
    podcasts.length > 0 && (
      <div class="row-outer">
        <div class="container row-header">
          <h4 class="row-title">Favorites</h4>
        </div>
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
      </div>
    )
  );
};

export default Favourites;
