import {createContext} from "react";
import {AppContext} from "./model/AppContext.ts";

export const ApplicationContext = createContext<AppContext | undefined>(undefined);