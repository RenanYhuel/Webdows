import { handleIconClick, handleIconDoubleClick, handleDesktopClick } from "../../utils/desktopUtils";
import useWindowsContext from "../../hooks/useWindowsContext";
import Window from "../window/Window";
import VolumeSettings from "../common/VolumeSettings";

export default function Desktop() {
    const { apps, openWindows, windowsOrder, bringToFront, setOpenWindows, setWindowsOrder, setVolumeSettingsOpen } = useWindowsContext();
    const gridSize = 4;

    const onIconDoubleClick = (appId: number) => {
        handleIconDoubleClick(appId, apps, openWindows, setOpenWindows, setWindowsOrder, windowsOrder);
    };

    const gridCells = Array.from({ length: gridSize * gridSize }, (_, index) => {
        const app = apps[index];
        return app ? (
            <div key={app.id} className="desktop-icon" onClick={(e) => handleIconClick(e)} onDoubleClick={() => onIconDoubleClick(app.id)}>
                <img src={app.icon} alt={app.name} className="icon" />
                <span>{app.name}</span>
            </div>
        ) : null;
    });

    return (
        <div className="desktop" onClick={(e) => handleDesktopClick(e, setVolumeSettingsOpen)}>
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
