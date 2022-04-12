import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";

const logger = store => (next, args) => action => {
    if(typeof window !== "undefined") {
    if(action.name === "activate"){
        window.history.pushState({ isPopup: true }, "Some Title");
        document.querySelector("body").style.overflow = "hidden"    
    }
    if(action.name === "deactivate") {
        document.querySelector("body").style.overflow = "auto" 
    }
}
    return next(action);
  };
  
  const middlewares = applyMiddleware(logger);


const initialState = { detailsStatus: false, detailsData: {} };
const store = createStore(initialState, middlewares);

export default store;
