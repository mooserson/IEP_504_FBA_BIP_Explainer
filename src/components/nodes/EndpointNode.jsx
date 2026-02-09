/**
 * EndpointNode - Terminal state (completion/success node)
 */
import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import './nodes.css';

function EndpointNode({ data, selected }) {
    const [isHovered, setIsHovered] = useState(false);
    const borderColor = categoryColors[data.category] || 'var(--color-iep)';

    return (
        <div
            className={`flow-node endpoint-node ${selected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            style={{
                '--node-color': borderColor,
                zIndex: isHovered ? 1000 : 'auto',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
