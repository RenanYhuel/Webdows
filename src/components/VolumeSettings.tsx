import useWindowsContext from '../hooks/useWindowsContext';

const VolumeSettings: React.FC = () => {
  const { volume, setVolume, volumeSettingsOpen } = useWindowsContext();

  const getVolumeIcon = () => {
    if (volume === 0) return <span className="material-symbols-outlined">volume_off</span>;
    if (volume < 50) return <span className="material-symbols-outlined">volume_down</span>;
    return <span className="material-symbols-outlined">volume_up</span>;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="volume-settings" 
        style={{
            display: volumeSettingsOpen ? 'flex' : 'none',
        }}
    >
      <header>Windows Default Speaker</header>
      <div className="volume-content">
        <span className="volume-icon">{getVolumeIcon()}</span>
        <input 
          type="range" 
          value={volume} 
          min="0" 
          max="100" 
          onChange={handleVolumeChange} 
          style={{ width: '250px' }} 
        />
        <span className="volume-value">{volume}</span>
      </div>
    </div>
  );
};

export default VolumeSettings;
