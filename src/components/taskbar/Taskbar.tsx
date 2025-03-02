import Notepad from '../../assets/notepad_icon.png';
import { useRef, useEffect } from "react";
import useWindowsContext from "../../hooks/useWindowsContext";
import TaskbarIcon from '../common/TaskbarIcon';
import { handleToggleVolumeSettings, handleIconClick } from "../../utils/taskbarUtils";

export default function Taskbar() {
    const searchInput = useRef<HTMLInputElement>(null);
    const { date, time, volume, windowsOrder, setWindowsOrder, openWindows, setOpenWindows, pinnedApps, apps, minimizeWindow, toggleMaximizeWindow, volumeSettingsOpen, setVolumeSettingsOpen } = useWindowsContext();

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
                                onClick={() => handleIconClick(appId, apps, openWindows, setOpenWindows, setWindowsOrder, windowsOrder, minimizeWindow, toggleMaximizeWindow)}
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
                <div className="volume-container" onClick={() => handleToggleVolumeSettings(volumeSettingsOpen, setVolumeSettingsOpen)}>
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
