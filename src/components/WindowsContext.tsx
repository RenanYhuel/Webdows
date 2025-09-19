import { ReactNode, useState, useEffect } from "react";
import { WindowsContext } from "../context/WindowsContext";
import { WindowsContextProps } from "../types/WindowsContextProps";
import NotepadIcon from "./../assets/notepad_icon.png";
import Notepad from "../components/apps/notepad/Notepad";
import BrowserIcon from "./../assets/browser_icon.svg";
import Browser from "../components/apps/browser/Browser";

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
    const [apps, setApps] = useState<WindowsContextProps["apps"]>([
        { id: 1, name: "Notepad", icon: NotepadIcon, component: Notepad },
        { id: 2, name: "Navigateur", icon: BrowserIcon, component: Browser },
    ]);
    const [openWindows, setOpenWindows] = useState<WindowsContextProps["openWindows"]>([]);
    const [windowsOrder, setWindowsOrder] = useState<WindowsContextProps["windowsOrder"]>([1, 2, 3]);
    const [pinnedApps, setPinnedApps] = useState<WindowsContextProps["pinnedApps"]>([
        1,
    ]);
    const [volume, setVolume] = useState<WindowsContextProps["volume"]>(0);
    const [volumeSettingsOpen, setVolumeSettingsOpen] = useState<boolean>(false);
    const [date, setDate] = useState<string>(new Date().toLocaleDateString());
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    const [maximizedWindows, setMaximizedWindows] = useState<number[]>([]);

    const bringToFront = (id: number) => {
        setWindowsOrder((prev) => [id, ...prev.filter((wId) => wId !== id)]);
    };

    const minimizeWindow = (id: number) => {
        setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
        setWindowsOrder((prev) => prev.filter((wId) => wId !== id));
    };

    const deMinimizeApp = (appId: number) => {
        setOpenWindows((prev) => prev.map((w) => w.appId === appId ? { ...w, isMinimized: false } : w));
        setWindowsOrder((prev) => [...prev, openWindows.find((w) => w.appId === appId)?.id as number]);
    };

    const closeWindow = (id: number) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== id));
        setWindowsOrder((prev) => prev.filter((wId) => wId !== id));
    };

    const toggleMaximizeWindow = (id: number) => {
        setMaximizedWindows((prev) =>
            prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date().toLocaleDateString());
            setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <WindowsContext.Provider
            value={{
                apps,
                setApps,
                openWindows,
                setOpenWindows,
                windowsOrder,
                setWindowsOrder,
                pinnedApps,
                setPinnedApps,
                volume,
                setVolume,
                date,
                time,
                volumeSettingsOpen,
                setVolumeSettingsOpen,
                bringToFront,
                minimizeWindow,
                deMinimizeApp,
                closeWindow,
                maximizedWindows,
                toggleMaximizeWindow
            }}
        >
            {children}
        </WindowsContext.Provider>
    );
};
