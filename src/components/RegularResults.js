import { h } from "preact";
import { Link } from "preact-router/match";
import { useEffect, useState } from "preact/hooks";
import Favourites from "./Favourites";

var sha1 = require("sha1");

import PodcastRow from "./PodcastRow";

const RegularResults = () => {
  const [favourites, setFavourites] = useState(JSON.parse(typeof window !== "undefined" && localStorage.getItem("podcastFavourites")) || []);
  let dummy = new Array(10).fill({
    image:
      "https://images.unsplash.com/photo-1612828898780-c0b0c219e552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    id: 75075,
    url: "https://feeds.theincomparable.com/batmanuniversity",
    title: "Batman University",
    description:
      "Batman University is a seasonal podcast about you know who. It began with an analysis of episodes of “Batman: The Animated Series” but has now expanded to cover other series, movies, and media. Your professor is Tony Sindelar.",
    author: "Tony Sindelar",
    newestItemPublishTime: 1546399813,
    itunesId: 1441923632,
    trendScore: 1,
    language: "en-us",
    categories: {
      104: "Tv",
      105: "Film",
      107: "Reviews",
    },
  });
  dummy = ""

  if (typeof window !== "undefined") {
  window.onstorage = (event) => {
    let storage = JSON.parse(localStorage.getItem("podcastFavourites")) || [];
    setFavourites(JSON.parse(localStorage.getItem("podcastFavourites")) || []);
  };}

  return (
    <div>
      <Favourites favourites={favourites} />
      <PodcastRow dummy={dummy} search="" cat="" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="" type="Recent Episodes" max="10" />
      <PodcastRow dummy={dummy} search="" cat="Film" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="Comedy" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="News" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="Games" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="Education" type="Trending" max="10" />
      <PodcastRow dummy={dummy} search="" cat="" type="Random" max="10" />
    </div>
  );
};

export default RegularResults;
