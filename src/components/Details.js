import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Connect } from "redux-zero/preact";
import actions from "./redux/actions";

import errorImage from '../assets/images/error-image.jpg'

const mapToProps = ({ detailsStatus, detailsData }) => ({ detailsStatus, detailsData });

const langCodes = {
  af: "Afrikaans",
  sq: "Albanian",
  an: "Aragonese",
  ar: "Arabic (Standard)",
  "ar-dz": "Arabic (Algeria)",
  "ar-bh": "Arabic (Bahrain)",
  "ar-eg": "Arabic (Egypt)",
  "ar-iq": "Arabic (Iraq)",
  "ar-jo": "Arabic (Jordan)",
  "ar-kw": "Arabic (Kuwait)",
  "ar-lb": "Arabic (Lebanon)",
  "ar-ly": "Arabic (Libya)",
  "ar-ma": "Arabic (Morocco)",
  "ar-om": "Arabic (Oman)",
  "ar-qa": "Arabic (Qatar)",
  "ar-sa": "Arabic (Saudi Arabia)",
  "ar-sy": "Arabic (Syria)",
  "ar-tn": "Arabic (Tunisia)",
  "ar-ae": "Arabic (U.A.E.)",
  "ar-ye": "Arabic (Yemen)",
  hy: "Armenian",
  as: "Assamese",
  ast: "Asturian",
  az: "Azerbaijani",
  eu: "Basque",
  bg: "Bulgarian",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  br: "Breton",
  bg: "Bulgarian",
  my: "Burmese",
  ca: "Catalan",
  ch: "Chamorro",
  ce: "Chechen",
  zh: "Chinese",
  "zh-hk": "Chinese (Hong Kong)",
  "zh-cn": "Chinese (PRC)",
  "zh-sg": "Chinese (Singapore)",
  "zh-tw": "Chinese (Taiwan)",
  cv: "Chuvash",
  co: "Corsican",
  cr: "Cree",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch (Standard)",
  "nl-be": "Dutch (Belgian)",
  en: "English",
  "en-au": "English (Australia)",
  "en-bz": "English (Belize)",
  "en-ca": "English (Canada)",
  "en-ie": "English (Ireland)",
  "en-jm": "English (Jamaica)",
  "en-nz": "English (New Zealand)",
  "en-ph": "English (Philippines)",
  "en-za": "English (South Africa)",
  "en-tt": "English (Trinidad & Tobago)",
  "en-gb": "English (United Kingdom)",
  "en-us": "English (United States)",
  "en-zw": "English (Zimbabwe)",
  eo: "Esperanto",
  et: "Estonian",
  fo: "Faeroese",
  fa: "Farsi",
  fj: "Fijian",
  fi: "Finnish",
  fr: "French (Standard)",
  "fr-be": "French (Belgium)",
  "fr-ca": "French (Canada)",
  "fr-fr": "French (France)",
  "fr-lu": "French (Luxembourg)",
  "fr-mc": "French (Monaco)",
  "fr-ch": "French (Switzerland)",
  fy: "Frisian",
  fur: "Friulian",
  gd: "Gaelic (Scots)",
  "gd-ie": "Gaelic (Irish)",
  gl: "Galacian",
  ka: "Georgian",
  de: "German (Standard)",
  "de-at": "German (Austria)",
  "de-de": "German (Germany)",
  "de-li": "German (Liechtenstein)",
  "de-lu": "German (Luxembourg)",
  "de-ch": "German (Switzerland)",
  el: "Greek",
  gu: "Gujurati",
  ht: "Haitian",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  iu: "Inuktitut",
  ga: "Irish",
  it: "Italian (Standard)",
  "it-ch": "Italian (Switzerland)",
  ja: "Japanese",
  kn: "Kannada",
  ks: "Kashmiri",
  kk: "Kazakh",
  km: "Khmer",
  ky: "Kirghiz",
  tlh: "Klingon",
  ko: "Korean",
  "ko-kp": "Korean (North Korea)",
  "ko-kr": "Korean (South Korea)",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "FYRO Macedonian",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mo: "Moldavian",
  nv: "Navajo",
  ng: "Ndonga",
  ne: "Nepali",
  no: "Norwegian",
  nb: "Norwegian (Bokmal)",
  nn: "Norwegian (Nynorsk)",
  oc: "Occitan",
  or: "Oriya",
  om: "Oromo",
  fa: "Persian",
  "fa-ir": "Persian/Iran",
  pl: "Polish",
  pt: "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  pa: "Punjabi",
  "pa-in": "Punjabi (India)",
  "pa-pk": "Punjabi (Pakistan)",
  qu: "Quechua",
  rm: "Rhaeto-Romanic",
  ro: "Romanian",
  "ro-mo": "Romanian (Moldavia)",
  ru: "Russian",
  "ru-mo": "Russian (Moldavia)",
  sz: "Sami (Lappish)",
  sg: "Sango",
  sa: "Sanskrit",
  sc: "Sardinian",
  gd: "Scots Gaelic",
  sd: "Sindhi",
  si: "Singhalese",
  sr: "Serbian",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somani",
  sb: "Sorbian",
  es: "Spanish",
  "es-ar": "Spanish (Argentina)",
  "es-bo": "Spanish (Bolivia)",
  "es-cl": "Spanish (Chile)",
  "es-co": "Spanish (Colombia)",
  "es-cr": "Spanish (Costa Rica)",
  "es-do": "Spanish (Dominican Republic)",
  "es-ec": "Spanish (Ecuador)",
  "es-sv": "Spanish (El Salvador)",
  "es-gt": "Spanish (Guatemala)",
  "es-hn": "Spanish (Honduras)",
  "es-mx": "Spanish (Mexico)",
  "es-ni": "Spanish (Nicaragua)",
  "es-pa": "Spanish (Panama)",
  "es-py": "Spanish (Paraguay)",
  "es-pe": "Spanish (Peru)",
  "es-pr": "Spanish (Puerto Rico)",
  "es-es": "Spanish (Spain)",
  "es-uy": "Spanish (Uruguay)",
  "es-ve": "Spanish (Venezuela)",
  sx: "Sutu",
  sw: "Swahili",
  sv: "Swedish",
  "sv-fi": "Swedish (Finland)",
  "sv-sv": "Swedish (Sweden)",
  ta: "Tamil",
  tt: "Tatar",
  te: "Teluga",
  th: "Thai",
  tig: "Tigre",
  ts: "Tsonga",
  tn: "Tswana",
  tr: "Turkish",
  tk: "Turkmen",
  uk: "Ukrainian",
  hsb: "Upper Sorbian",
  ur: "Urdu",
  ve: "Venda",
  vi: "Vietnamese",
  vo: "Volapuk",
  wa: "Walloon",
  cy: "Welsh",
  xh: "Xhosa",
  ji: "Yiddish",
  zu: "Zulu",
};

const Details = () => {
  const [isfavour, setFavour] = useState(false);

  function isFavour(id) {
    let oldStorage = JSON.parse(typeof window !== "undefined" && localStorage.getItem("podcastFavourites")) || [];
    setFavour(oldStorage.indexOf(id.toString()) >= 0);
  }

  function getDate(date) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let realDate = new Date(date * 1000);
    return `${realDate.getDate()}. ${months[realDate.getMonth()]} ${realDate.getFullYear()}`;
  }

  function Favourite(e, id) {
    e.stopPropagation();
    let oldStorage = JSON.parse(typeof window !== "undefined" && localStorage.getItem("podcastFavourites")) || [];
    if (oldStorage.indexOf(id.toString()) < 0) {
      oldStorage.unshift(id.toString());
      setFavour(true);
    } else {
      let one = oldStorage.slice(0, oldStorage.indexOf(id.toString()));
      let two = oldStorage.slice(oldStorage.indexOf(id.toString()) + 1);
      oldStorage = [...one, ...two];
      setFavour(false);
    }
    typeof window !== "undefined" && localStorage.setItem("podcastFavourites", JSON.stringify(oldStorage));
    typeof window !== "undefined" && window.dispatchEvent( new Event('storage') )
  }

  return (
    <Connect mapToProps={mapToProps} actions={actions}>
      {({ detailsStatus, detailsData, deactivate }) => (
        <div class={"details-outer " + (detailsStatus && "active")} onClick={deactivate}>
          {detailsStatus && isFavour(detailsData.id)}
          <i class="fa-solid fa-xmark details-close"></i>
          <div class="details-inner" onClick={(e) => e.stopPropagation()}>
            <img class="details-img" src={detailsData.image || ""} onerror={(e) => {e.target.onerror = null; e.target.src = errorImage}} />
            <div class="details-header">
              <h3 class="details-title">
                <strong>{detailsData.title || ""}</strong>
              </h3>
              <div class="details-favour" onClick={(e) => Favourite(e, detailsData.id)}>
                <i class={(isfavour ? "fa-solid" : "fa-regular") + " fa-heart"}></i>
              </div>
            </div>
            <p class="dimmed">{detailsData.author || ""}</p>
            <div class="details-category-list">
              {detailsData.categories && Object.keys(detailsData.categories).map((key, index) => <p>{detailsData.categories[key]}</p>)}
            </div>
            <p class="details-point">Last Upload</p>
            <p>{getDate(detailsData.newestItemPublishTime || detailsData.lastUpdateTime || detailsData.datePublished)}</p>
            <p class="details-point">Language</p>
            <p>{langCodes[(detailsData.language || "").toLowerCase()] || "not defined"}</p>
            <p class="details-desc">{(detailsData.description || "").replaceAll(/<!--|--!?>/g, "")}</p>
            {detailsData.link && (
              <a href={detailsData.link} class="button " target="_blank">
                Website
              </a>
            )}
            {detailsData.url && (
              <a href={detailsData.url} class="button sec" target="_blank">
                Feed
              </a>
            )}
          </div>
        </div>
      )}
    </Connect>
  );
};

export default Details;
