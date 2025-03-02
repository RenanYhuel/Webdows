import { MouseEvent } from "react";
import { WindowData, WindowsContextProps } from "../types/WindowsContextProps";

export const handleIconClick = (e: MouseEvent) => {
    const iconClicked = document.querySelector(".icon-clicked");
    if (iconClicked) {
        iconClicked.classList.remove("icon-clicked");
    }
    e.preventDefault();
    const appElement = e.currentTarget as HTMLElement;
    appElement.classList.add("icon-clicked");
};

export const handleIconDoubleClick = (
    appId: number,
    apps: WindowsContextProps['apps'],
    openWindows: WindowsContextProps['openWindows'],
    setOpenWindows: WindowsContextProps['setOpenWindows'],
    setWindowsOrder: WindowsContextProps['setWindowsOrder'],
    windowsOrder: WindowsContextProps['windowsOrder']
) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    const openWindow = openWindows.find(w => w.appId === appId);

    if (openWindow) {
        const updatedOpenWindows = openWindows.map(w =>
            w.appId === appId ? { ...w, isMinimized: false } : w
        );
        setOpenWindows(updatedOpenWindows);

        const updatedWindowsOrder = [openWindow.id, ...windowsOrder.filter(wId => wId !== openWindow.id)];
        setWindowsOrder(updatedWindowsOrder);

        return;
    }

    const newWindow: WindowData = {
        id: Date.now(),
        title: app.name,
        appId: app.id,
        isMinimized: false
    };

    const updatedOpenWindows = [...openWindows, newWindow];
    setOpenWindows(updatedOpenWindows);

    const updatedWindowsOrder = [newWindow.id, ...windowsOrder];
    setWindowsOrder(updatedWindowsOrder);
};
export const handleDesktopClick = (e: MouseEvent, setVolumeSettingsOpen: (open: boolean) => void) => {
    if (!(e.target as HTMLElement).closest(".desktop-icon") && !(e.target as HTMLElement).closest(".volume-settings")) {
        const iconClicked = document.querySelector(".icon-clicked");
        if (iconClicked) {
            iconClicked.classList.remove("icon-clicked");
        }
        setVolumeSettingsOpen(false);
    }
};
