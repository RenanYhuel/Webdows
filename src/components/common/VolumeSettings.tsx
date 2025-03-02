import useWindowsContext from "../../hooks/useWindowsContext";

export default function VolumeSettings() {
    const { volume, setVolume } = useWindowsContext();

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    return (
        <div className="volume-settings">
            <header>Volume Settings</header>
            <div className="volume-content">
                <span className="volume-icon material-symbols-outlined">
                    {volume === 0 ? "no_sound" : volume > 50 ? "volume_up" : "volume_down"}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
}
