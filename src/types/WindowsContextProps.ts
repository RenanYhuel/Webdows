export interface WindowData {
    id: number;
    title: string;
    appId: number;
    isMinimized?: boolean;
}

export interface WindowsContextProps {
    apps: { id: number, name: string, icon: string, component: React.ComponentType}[];
    setApps: (apps: { id: number, name: string, icon: string, component: React.ComponentType }[]) => void;
    openWindows: WindowData[];
    setOpenWindows: (openWindows: WindowData[]) => void;
    windowsOrder: number[];
    setWindowsOrder: (windowsOrder: number[]) => void;
    pinnedApps: number[];
    setPinnedApps: (pinnedApps: number[]) => void;
    volume: number;
    setVolume: (volume: number) => void;
    date: string;
    time: string;
    volumeSettingsOpen: boolean;
    setVolumeSettingsOpen: (volumeSettingsOpen: boolean) => void;
    bringToFront: (id: number) => void;
    minimizeWindow: (id: number) => void;
    deMinimizeApp: (appId: number) => void;
    closeWindow: (id: number) => void;
    toggleMaximizeWindow: (id: number) => void;
    maximizedWindows: number[];
}