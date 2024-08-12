
import React from 'react';

function ControlPanel({ isAnimating, animateMarker, stopAnimation, speed, handleSpeedChange }) {
    return (
        <div className="control-panel" style={{ marginBottom: '50px' }}>
            <div className="button-group">
                <button
                    className={`control-button ${isAnimating ? 'Running' : ''}`}
                    onClick={animateMarker}
                    disabled={isAnimating}
                >
                    {isAnimating ? 'Running...' : 'Start Run'}
                </button>
                <button
                    className="control-button"
                    onClick={stopAnimation}
                    disabled={!isAnimating}
                >
                    Stop Animation
                </button>
            </div>
            <div className="speed-control">
                <label htmlFor="speed">Speed: </label>
                <input
                    type="range"
                    id="speed"
                    name="speed"
                    min="1"
                    max="99"
                    value={speed}
                    onChange={handleSpeedChange}
                />
                <span className="speed-value">{speed}</span>
            </div>
        </div>
    );
}

export default ControlPanel;
