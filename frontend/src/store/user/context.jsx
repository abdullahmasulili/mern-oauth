import { createContext } from "react";

export const UserContext = createContext({
  currentUser: {},
  accessToken: null,
  setCurrentUser: () => {},
  setAccessToken: () => {},
});
