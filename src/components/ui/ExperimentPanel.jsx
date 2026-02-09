import React from 'react';
import './ExperimentPanel.css';

function ExperimentPanel({
    settings,
    onSettingChange
}) {
    if (!settings) return null;

    return (
        <div className="experiment-panel">
            <div className="experiment-header">
                <h3>🧪 Experiments</h3>
            </div>

            <div className="experiment-controls">
                {/* Complexity Toggle */}
                <div className="experiment-control">
                    <label className="toggle-label">
                        <span>Comprehensive Flow</span>
                        <input
                            type="checkbox"
                            checked={settings.showComplexFlows}
                            onChange={(e) => onSettingChange('showComplexFlows', e.target.checked)}
                        />
                    </label>
                    <p className="control-description">Show return paths, denials, and loops</p>
                </div>

                {/* Color Toggle */}
                <div className="experiment-control">
                    <label className="toggle-label">
                        <span>Functional Colors</span>
                        <input
                            type="checkbox"
                            checked={settings.showColoredEdges}
                            onChange={(e) => onSettingChange('showColoredEdges', e.target.checked)}
                        />
                    </label>
                    <p className="control-description">Green=Forward, Orange=Return, Red=Denial</p>
                </div>

                {/* Animation Toggle */}
                <div className="experiment-control">
                    <label className="toggle-label">
                        <span>Animated Paths</span>
                        <input
                            type="checkbox"
                            checked={settings.animateFlow}
                            onChange={(e) => onSettingChange('animateFlow', e.target.checked)}
                        />
                    </label>
                    <p className="control-description">Show direction of flow with animation</p>
                </div>
            </div>
        </div>
    );
}

export default ExperimentPanel;
