import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";
import faqsReducer from "./slice/faqs";
import teamReducer from "./slice/team";
import permSecReducer from "./slice/perm_sec";
import wdcReducer from "./slice/wdc";
import partnersReducer from "./slice/partners";
import resourcesReducer from "./slice/resources";
import LGAsReducer from "./slice/lga";

export default configureStore({
  reducer: {
    user: userReducer,
    faqs: faqsReducer,
    teams: teamReducer,
    permSec: permSecReducer,
    wdc: wdcReducer,
    partners: partnersReducer,
    resources: resourcesReducer,
    lgas: LGAsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       // ignoredActions: ["your/action/type"],
  //       // Ignore these field paths in all actions
  //       ignoredActionPaths: ["meta.arg", "payload.timestamp"],
  //       // Ignore these paths in the state
  //       ignoredPaths: ["items.dates"],
  //     },
  //   }),
});
