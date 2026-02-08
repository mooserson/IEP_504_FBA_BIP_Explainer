import { memo } from 'react';
import './nodes.css';

/**
 * Phase Label Node - Shows high-level phase names when zoomed out
 * These provide context for each section of the flowchart
 */
function PhaseLabelNode({ data }) {
    return (
        <div className="phase-label-node">
            <div className="phase-label-box">
                <div className="phase-label-text">{data.label}</div>
                <div className="phase-label-description">{data.description}</div>
            </div>
        </div>
    );
}

export default memo(PhaseLabelNode);
