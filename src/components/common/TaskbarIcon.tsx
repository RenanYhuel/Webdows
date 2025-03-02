import useWindowsContext from "../../hooks/useWindowsContext";

export default function TaskbarIcon({ icon, name, appId, onClick, isActive }: { icon: string, name: string, appId: number, onClick: () => void, isActive: boolean }) {
    const { openWindows, deMinimizeApp, minimizeWindow } = useWindowsContext();
    const isOpen = openWindows.some((w) => w.appId === appId);
    const isMinimized = openWindows.find((w) => w.appId === appId)?.isMinimized;

    const handleClick = () => {
        if (isMinimized) {
            deMinimizeApp(appId);
        } else {
            const windowId = openWindows.find((w) => w.appId === appId)?.id;
            if (windowId !== undefined) {
                minimizeWindow(windowId);
            }
        }
        onClick();
    };

    return (
        <div className={`taskbar-icon ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <img src={icon} alt={name} className="icon" />
        </div>
    );
}
