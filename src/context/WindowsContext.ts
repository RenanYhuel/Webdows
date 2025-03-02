import { createContext } from "react";
import { WindowsContextProps } from "../types/WindowsContextProps";

export const WindowsContext = createContext<WindowsContextProps | null>(null);