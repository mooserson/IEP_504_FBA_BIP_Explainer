/**
 * DecisionNode - Diamond-shaped decision point
 */
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import './nodes.css';

function DecisionNode({ data, selected }) {
    const borderColor = categoryColors[data.category] || 'var(--color-decision)';

    return (
        <div
            className={`flow-node decision-node ${selected ? 'selected' : ''}`}
            style={{ '--node-color': borderColor }}
        >
            <Handle type="target" position={Position.Top} />

            <div className="decision-diamond">
                <h3 className="node-title">{data.label}</h3>
                <p className="node-summary">{data.summary}</p>
            </div>

            <Handle type="source" position={Position.Bottom} id="bottom" />
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Left} id="left" />
        </div>
    );
}

export default memo(DecisionNode);
