/* eslint-disable react/prop-types */
import { UserContext } from "./context";
import { ACTION_TYPE, userReducer } from "./reducer";

export default function UserContextProvider({ children }) {
  const [userState, userDispatch] = userReducer(userReducer, {
    currentUser: {},
    accessToken: null,
  });

  function hanldeSetCurrentUser(user) {
    userDispatch({
      type: ACTION_TYPE.SET_CURRENT_USER,
      payload: user,
    });
  }

  function handleSetAccessToken(token) {
    userDispatch({
      type: ACTION_TYPE.SET_ACCESS_TOKEN,
      payload: token,
    });
  }

  const contextValue = {
    currentUser: userState.currentUser,
    accessToken: userState.accessToken,
    setCurrentUser: hanldeSetCurrentUser,
    setAccessToken: handleSetAccessToken,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
