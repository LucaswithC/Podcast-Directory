import { h } from "preact";
import style from "./style.css";
import { useEffect, useState } from "preact/hooks";
import { bindActions } from "redux-zero/utils";
import actions from "../../components/redux/actions";
import store from "../../components/redux/store";

import SearchResults from "../../components/SearchResults.js";
import RegularResults from "../../components/RegularResults.js";

const boundActions = bindActions(actions, store);

let searchTimeout;
const Home = () => {
  const [search, setSearch] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false)

  

  useEffect(() => {
    let moreOptionsCont = document.querySelector("#more-options")
    if(moreOptions) {
      moreOptionsCont.style.height = moreOptionsCont.scrollHeight + "px"
    } else {
      moreOptionsCont.style.height = "0px"
    }
  }, [moreOptions])

  function changeSearch(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  }

  window.onpopstate = function (event) {
    boundActions.deactivate();
  };

  

  return (
    <div class={style.home}>
      <div class="container search-container">
        <form class="search-form">
          <h3 class="search-title">Search for your favorite podcast</h3>
          <div class="form-inputs">
            <input type="search" placeholder="Search Podcast" onInput={changeSearch} />
            <div class="more-options-search" onClick={() => moreOptions ? setMoreOptions(false) : setMoreOptions(true)}>
              <i class={"fa-solid fa-caret-down " + (moreOptions && "active")}></i>
            </div>
          </div>
          <div id="more-options">
            <div class="explicit-radio">
              <label for="explicit-radio">
                <div class={explicit && "active"}>
                  <input type="checkbox" id="explicit-radio" onInput={(e) => (e.target.checked ? setExplicit(true) : setExplicit(false))} />
                  Explicit Content
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div>
        {search !== "" && <SearchResults search={search} clean={explicit} />} 
        <RegularResults input="" class={search !== "" && "hidden"} />
      </div>
    </div>
  );
};

export default Home;
