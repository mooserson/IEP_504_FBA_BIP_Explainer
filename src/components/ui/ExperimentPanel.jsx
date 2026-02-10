import React, { useState } from 'react';
import './ExperimentPanel.css';

function ExperimentPanel({
    settings,
    onSettingChange
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!settings) return null;

    return (
        <div className={`experiment-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded && (
                <div className="experiment-content">
                    <div className="experiment-header">
                        <h3>Experiments</h3>
                    </div>

                    <div className="experiment-controls">
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
            )}

            <button
                className="experiment-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse experiments' : 'Expand experiments'}
            >
                🧪 {isExpanded ? '▼' : '▶'}
            </button>
        </div>
    );
}

export default ExperimentPanel;
