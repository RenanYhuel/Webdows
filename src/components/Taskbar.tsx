import Notepad from '../assets/notepad_icon.png';
import { useRef, useEffect } from "react";
import useWindowsContext from "../hooks/useWindowsContext";
import TaskbarIcon from './TaskBarIcon';
import { WindowData } from '../types/WindowsContextProps';

export default function Taskbar() {
    const searchInput = useRef<HTMLInputElement>(null);
    const { date, time, volume, volumeSettingsOpen, setVolumeSettingsOpen, windowsOrder, openWindows, pinnedApps, setOpenWindows, apps, setWindowsOrder, minimizeWindow, toggleMaximizeWindow } = useWindowsContext();

    useEffect(() => {
        const inputElement = searchInput.current;
        if (!inputElement) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
        };

        inputElement.addEventListener("keydown", handleKeyDown);

        return () => {
            inputElement.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleToggleVolumeSettings = () => {
        setVolumeSettingsOpen(!volumeSettingsOpen);
    };

    const handleIconClick = (appId: number) => {
        const app = apps.find(a => a.id === appId);
        if (!app) return;

        const openWindow = openWindows.find(w => w.appId === appId);

        if (openWindow) {
            if (openWindow.isMinimized) {
                const updatedOpenWindows = openWindows.map(w =>
                    w.appId === appId ? { ...w, isMinimized: false } : w
                );
                setOpenWindows(updatedOpenWindows);

                const updatedWindowsOrder = [openWindow.id, ...windowsOrder.filter(wId => wId !== openWindow.id)];
                setWindowsOrder(updatedWindowsOrder);
            } else {
                minimizeWindow(openWindow.id);
            }
            return;
        }

        const newWindow: WindowData = {
            id: Date.now(),
            title: app.name,
            appId: app.id,
            isMinimized: false
        };

        const updatedOpenWindows = [...openWindows, newWindow];
        setOpenWindows(updatedOpenWindows); // Ajoute la nouvelle fenêtre à openWindows

        const updatedWindowsOrder = [newWindow.id, ...windowsOrder];
        setWindowsOrder(updatedWindowsOrder); // Ajoute l'ID de la nouvelle fenêtre à windowsOrder

        toggleMaximizeWindow(newWindow.id); // Maximize the new window
    };


    const highestAppId = openWindows.find((w) => w.id === windowsOrder[0])?.appId;

    const uniqueAppIds = Array.from(new Set([...pinnedApps, ...openWindows.map(w => w.appId)]));

    return (
        <div className="taskbar">
            <div className="left-container">
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search the web and Windows"
                        id="search_input"
                        ref={searchInput}
                    />
                </div>
                <div className="icons-container">
                    {uniqueAppIds.map(appId => {
                        const appDetails = apps.find(a => a.id === appId);
                        return (
                            <TaskbarIcon
                                key={appId}
                                icon={appDetails?.icon || Notepad}
                                name={appDetails?.name || ""}
                                appId={appId}
                                onClick={() => handleIconClick(appId)}
                                isActive={highestAppId === appId}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="right-container">
                <div className="wifi-container">
                    <span className="material-symbols-outlined">
                        wifi
                    </span>
                </div>
                <div className="volume-container" onClick={handleToggleVolumeSettings}>
                    <span className="material-symbols-outlined">
                        {volume === 0 ? "no_sound" : volume > 50 ? "volume_up" : "volume_down"}
                    </span>
                </div>
                <div className="date-container">
                    <span className="time">{time}</span>
                    <span className="date">{date}</span>
                </div>
            </div>
        </div>
    );
}
