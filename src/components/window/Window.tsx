import { createElement } from "react";
import useWindowsContext from "../../hooks/useWindowsContext";
import { useDrag, useResize } from "../../utils/windowUtils";

interface WindowProps {
    id: number;
    title: string;
    onFocus: () => void;
    style: React.CSSProperties;
}

export default function Window({ id, title, onFocus, style }: WindowProps) {
    const { apps, openWindows, minimizeWindow, closeWindow, maximizedWindows, toggleMaximizeWindow } = useWindowsContext();
    const appInOpenWindows = openWindows.find((w) => w.id === id);
    const appInfos = apps.find((app) => app.id === appInOpenWindows?.appId);

    const isMaximized = maximizedWindows.includes(id);
    const appComponent = appInfos?.component;

    const { position, handleMouseDown } = useDrag({ x: 100, y: 100 });
    const setPosition = (newPosition: { x: number; y: number }) => {
        position.x = newPosition.x;
        position.y = newPosition.y;
    };
    const { size, handleMouseDownResize } = useResize({ width: 800, height: 600 }, position, setPosition);

    return (
        <div
            className={`window ${appInOpenWindows?.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
            style={{ ...style, left: position.x, top: position.y, width: size.width, height: size.height }}
            onMouseDown={onFocus}
        >
            <div className="window-header" onMouseDown={handleMouseDown}>
                <div className="window-infos">
                    <img src={appInfos?.icon} alt="" />
                    <span className="window-title">{title}</span>
                </div>
                <div className="window-buttons">
                    <button className="window-btn minimize" onClick={() => minimizeWindow(id)}>−</button>
                    <button className="window-btn maximize" onClick={() => toggleMaximizeWindow(id)}>
                        {isMaximized ? '⧉' : '☐'}
                    </button>
                    <button className="window-btn close" onClick={() => closeWindow(id)}>✕</button>
                </div>
            </div>
            <div className="window-content">
                {appComponent && createElement(appComponent)}
            </div>
            <div className="resize-handle" onMouseDown={(e) => handleMouseDownResize(e, 'corner')}></div>
            <div className="resize-handle-right" onMouseDown={(e) => handleMouseDownResize(e, 'right')}></div>
            <div className="resize-handle-left" onMouseDown={(e) => handleMouseDownResize(e, 'left')}></div>
            <div className="resize-handle-top" onMouseDown={(e) => handleMouseDownResize(e, 'top')}></div>
            <div className="resize-handle-bottom" onMouseDown={(e) => handleMouseDownResize(e, 'bottom')}></div>
        </div>
    );
}
