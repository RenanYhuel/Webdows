

import React, { useState, useRef } from 'react';
import './browser.css';

const DEFAULT_HOME = 'https://www.example.com';

const Browser = () => {
	const [url, setUrl] = useState(DEFAULT_HOME);
	const [inputUrl, setInputUrl] = useState(url);
	const [history, setHistory] = useState<string[]>([DEFAULT_HOME]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// Utilise le proxy classique
	const getProxiedUrl = (rawUrl: string) => {
		const safeUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
		return `http://localhost:3001/proxy?url=${encodeURIComponent(safeUrl)}`;
	};

	const handleNavigate = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setLoading(true);
		setUrl(inputUrl);
		const newHistory = history.slice(0, historyIndex + 1).concat([inputUrl]);
		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
	};

	const goBack = () => {
		if (historyIndex > 0) {
			setHistoryIndex(historyIndex - 1);
			setInputUrl(history[historyIndex - 1]);
			setUrl(history[historyIndex - 1]);
		}
	};

	const goForward = () => {
		if (historyIndex < history.length - 1) {
			setHistoryIndex(historyIndex + 1);
			setInputUrl(history[historyIndex + 1]);
			setUrl(history[historyIndex + 1]);
		}
	};

	const goHome = () => {
		setInputUrl(DEFAULT_HOME);
		setUrl(DEFAULT_HOME);
		setHistory([DEFAULT_HOME]);
		setHistoryIndex(0);
	};

	const handleReload = () => {
		setLoading(true);
		setUrl(url);
	};

	// Gestion du chargement de l'iframe
	const handleIframeLoad = () => {
		setLoading(false);
	};

	return (
		<div className="browser-container">
			<div className="browser-fake-chrome-bar">
				<div className="browser-nav-btns">
					<button className="browser-nav-btn" onClick={goBack} disabled={historyIndex === 0} title="Précédent">
						<svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 16l-5-5 5-5" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
					</button>
					<button className="browser-nav-btn" onClick={goForward} disabled={historyIndex === history.length - 1} title="Suivant">
						<svg width="20" height="20" viewBox="0 0 20 20"><path d="M7 4l5 5-5 5" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
					</button>
					<button className="browser-nav-btn" onClick={handleReload} title="Rafraîchir">
						<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 10a6 6 0 1 1 2 4.47" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M4 14v-4h4" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
					</button>
					<button className="browser-nav-btn" onClick={goHome} title="Accueil">
						<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 10l7-7 7 7" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/><rect x="7" y="10" width="6" height="7" rx="1" fill="#eee" stroke="#555" strokeWidth="2"/></svg>
					</button>
				</div>
				<form className="browser-chrome-address-form" onSubmit={handleNavigate}>
					<div className="browser-chrome-address-bar">
						<span className="browser-chrome-lock">{url.startsWith('https') ? '🔒' : '⚠️'}</span>
						<input
							type="text"
							value={inputUrl}
							onChange={e => setInputUrl(e.target.value)}
							className="browser-chrome-input"
							placeholder="Rechercher ou entrer une adresse URL"
						/>
						<button type="submit" className="browser-chrome-go">Aller</button>
					</div>
				</form>
				<div className="browser-chrome-actions">
					{loading && <span className="browser-chrome-loading">Chargement…</span>}
				</div>
			</div>
			<iframe
				ref={iframeRef}
				src={getProxiedUrl(url)}
				title="Web Browser"
				className="browser-iframe"
				sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
				onLoad={handleIframeLoad}
			/>
		</div>
	);
};

export default Browser;
