import useWindowsContext from "../hooks/useWindowsContext";
import { MouseEvent } from "react";
import VolumeSettings from "./VolumeSettings";
import Window from "./Window";
import { WindowData } from "../types/WindowsContextProps";

export default function Desktop() {
    const { apps, setVolumeSettingsOpen, openWindows, windowsOrder, bringToFront, setOpenWindows, setWindowsOrder } = useWindowsContext();
    const gridSize = 4;

    const handleIconClick = (e: MouseEvent) => {
        const iconClicked = document.querySelector(".icon-clicked");
        if (iconClicked) {
            iconClicked.classList.remove("icon-clicked");
        }
        e.preventDefault();
        const appElement = e.currentTarget as HTMLElement;
        appElement.classList.add("icon-clicked");
    };
    
    const handleIconDoubleClick = (appId: number) => {
        const app = apps.find(a => a.id === appId);
        if (!app) return;

        const openWindow = openWindows.find(w => w.appId === appId);

        if (openWindow) {
            const updatedOpenWindows = openWindows.map(w =>
                w.appId === appId ? { ...w, isMinimized: false } : w
            );
            setOpenWindows(updatedOpenWindows); // Met à jour openWindows avec un tableau modifié

            const updatedWindowsOrder = [openWindow.id, ...windowsOrder.filter(wId => wId !== openWindow.id)];
            setWindowsOrder(updatedWindowsOrder); // Met à jour windowsOrder avec un tableau modifié

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
    };
    

    const handleDesktopClick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest(".desktop-icon") && !(e.target as HTMLElement).closest(".volume-settings")) {
            const iconClicked = document.querySelector(".icon-clicked");
            if (iconClicked) {
                iconClicked.classList.remove("icon-clicked");
            }
            setVolumeSettingsOpen(false);
        }
    };

    const gridCells = Array.from({ length: gridSize * gridSize }, (_, index) => {
        const app = apps[index];
        return app ? (
            <div key={app.id} className="desktop-icon" onClick={(e) => handleIconClick(e)} onDoubleClick={() => handleIconDoubleClick(app.id)}>
                <img src={app.icon} alt={app.name} className="icon" />
                <span>{app.name}</span>
            </div>
        ) : null;
    });

    return (
        <div className="desktop" onClick={handleDesktopClick}>
            <div className="grid-container">
                {gridCells}
            </div>
            <VolumeSettings />
            {openWindows.map((win) => {
                const zIndex = windowsOrder.includes(win.id) ? 100 + windowsOrder.length - windowsOrder.indexOf(win.id) - 1 : 99;
                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        onFocus={() => bringToFront(win.id)}
                        style={{ zIndex }}
                    />
                );
            })}
        </div>
    );
}
