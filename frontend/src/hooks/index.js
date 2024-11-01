import { useContext } from "react";
import { UserContext } from "../store/user/context";

export const useUser = () => useContext(UserContext);
