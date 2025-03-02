import { WindowData, WindowsContextProps } from "../types/WindowsContextProps"; // Assurez-vous d'importer le type approprié

export const handleToggleVolumeSettings = (
    volumeSettingsOpen: WindowsContextProps['volumeSettingsOpen'],
    setVolumeSettingsOpen: WindowsContextProps['setVolumeSettingsOpen']
) => {
    setVolumeSettingsOpen(!volumeSettingsOpen);
};

export const handleIconClick = (
    appId: number,
    apps: WindowsContextProps['apps'],
    openWindows: WindowsContextProps['openWindows'],
    setOpenWindows: WindowsContextProps['setOpenWindows'],
    setWindowsOrder: WindowsContextProps['setWindowsOrder'],
    windowsOrder: WindowsContextProps['windowsOrder'],
    minimizeWindow: WindowsContextProps['minimizeWindow'],
    toggleMaximizeWindow: WindowsContextProps['toggleMaximizeWindow']
) => {
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
    setOpenWindows(updatedOpenWindows);

    const updatedWindowsOrder = [newWindow.id, ...windowsOrder];
    setWindowsOrder(updatedWindowsOrder);

    toggleMaximizeWindow(newWindow.id);
};