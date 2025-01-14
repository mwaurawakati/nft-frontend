import mediaRunningReducer from "./reducers/mediaRunning";
import Auth from "./reducers/auth.reducers";
import Bid from "./reducers/bid.reducers";
import Nft from "./reducers/nft.reducers";
import User from "./reducers/user.reducers";
import Collection from "./reducers/collection.reducers";
import Follow from "./reducers/flollow.reducers";
import Notify from "./reducers/notify.reducers";
import Tip from "./reducers/tip.reducers";
import Search from "./reducers/search.reducers";
import { collectionReducer } from "./reducers/create.collection.reducers";

const rootReducers = {
  mediaRunning: mediaRunningReducer,
  auth: Auth,
  nft: Nft,
  bid: Bid,
  user: User,
  collection: Collection,
  follow: Follow,
  notify: Notify,
  tip: Tip,
  search: Search,
  // create collection
  createCollection: collectionReducer
};

export default rootReducers;
