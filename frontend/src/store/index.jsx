/* eslint-disable react/prop-types */
import UserContextProvider from "./user/provider";

export default function ContextProvider({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
