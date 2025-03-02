import Desktop from "./Desktop";
import Taskbar from './Taskbar';

export default function Container() {
    return (
        <div className="container">
            <Desktop />
            <Taskbar />
        </div>
    )
};