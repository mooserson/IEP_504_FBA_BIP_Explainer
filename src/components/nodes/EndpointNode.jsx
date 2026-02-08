/**
 * EndpointNode - Terminal state (completion/success node)
 */
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import './nodes.css';

function EndpointNode({ data, selected }) {
    const borderColor = categoryColors[data.category] || 'var(--color-iep)';

    return (
        <div
            className={`flow-node endpoint-node ${selected ? 'selected' : ''}`}
            style={{ '--node-color': borderColor }}
        >
            <Handle type="target" position={Position.Top} />

            <div className="endpoint-badge">✓</div>
            <h3 className="node-title">{data.label}</h3>
            <p className="node-summary">{data.summary}</p>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(EndpointNode);
