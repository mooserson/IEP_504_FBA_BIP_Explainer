/**
 * ProcessNode - Standard process step node with semantic zoom
 */
import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import './nodes.css';

function ProcessNode({ data, selected }) {
    const [isHovered, setIsHovered] = useState(false);
    const borderColor = categoryColors[data.category] || 'var(--color-primary)';

    return (
        <div
            className={`flow-node process-node ${selected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            style={{
                '--node-color': borderColor,
                zIndex: isHovered ? 1000 : 'auto',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Handle type="target" position={Position.Top} />

            <div className="node-header">
                <div className="node-indicator" />
                <h3 className="node-title">{data.label}</h3>
            </div>

            <p className="node-summary">{data.summary}</p>

            <div className="node-detail">
                <div
                    className="node-detail-content"
                    dangerouslySetInnerHTML={{
                        __html: formatMarkdown(data.detail)
                    }}
                />
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

// Simple markdown-like formatting
function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n• /g, '</p><p class="bullet">• ')
        .replace(/\n/g, '<br/>');
}

export default memo(ProcessNode);
