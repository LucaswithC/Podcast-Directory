import { h } from "preact";
import { Connect } from "redux-zero/preact";
import actions from "./redux/actions";
import { useState } from "preact/hooks";

import errorImage from '../assets/images/error-image.jpg'

const mapToProps = ({ detailsStatus, detailsData }) => ({ detailsStatus, detailsData });

const PodcastCard = ({ data }) => {
  if (typeof localStorage !== "undefined") {
  const [isfavour, setFavour] = useState(() => {
    let oldStorage = JSON.parse(localStorage.getItem("podcastFavourites")) || [];
    return oldStorage.indexOf(data.id.toString()) >= 0 || false;
  });}

  function Favourite(e, id) {
    e.stopPropagation();
    let oldStorage = JSON.parse(localStorage.getItem("podcastFavourites")) || [];
    if (oldStorage.indexOf(id.toString()) < 0) {
      oldStorage.unshift(id.toString());
      setFavour(true);
    } else {
      let one = oldStorage.slice(0, oldStorage.indexOf(id.toString()));
      let two = oldStorage.slice(oldStorage.indexOf(id.toString()) + 1);
      oldStorage = [...one, ...two];
      setFavour(false);
    }
    localStorage.setItem("podcastFavourites", JSON.stringify(oldStorage));
    window.dispatchEvent( new Event('storage') )
  }

  return (
    <Connect mapToProps={mapToProps} actions={actions}>
      {({ activate }) => (
        <div class="podcast-card" onClick={() => activate(data)}>
          <img class="podcast-img" src={data.image} onerror={(e) => {e.target.onerror = null; e.target.src = errorImage}} />
          <div class="favour" onClick={(e) => Favourite(e, data.id)}>
            <i class={(isfavour ? "fa-solid" : "fa-regular") + " fa-heart"}></i>
          </div>
          <p class="title">
            <strong>{data.title}</strong>
          </p>
          <p class="names dimmed">{data.author}</p>
        </div>
      )}
    </Connect>
  );
};

export default PodcastCard;
