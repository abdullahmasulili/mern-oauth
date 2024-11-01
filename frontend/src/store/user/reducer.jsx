export const ACTION_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
};

export function userReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case ACTION_TYPE.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
  }
}
