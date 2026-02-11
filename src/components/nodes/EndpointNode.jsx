/**
 * EndpointNode - Terminal state (completion/success node)
 */
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import formatMarkdown from '../../utils/formatMarkdown';
import useNodeHover from '../../hooks/useNodeHover';
import ConnectionBadges from './ConnectionBadges';
import './nodes.css';

function EndpointNode({ data, selected }) {
    const { isHovered, detailRef, handleMouseEnter, handleMouseLeave } = useNodeHover();
    const borderColor = categoryColors[data.category] || 'var(--color-iep)';

    return (
        <div
            className={`flow-node endpoint-node ${selected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            style={{
                '--node-color': borderColor,
                zIndex: isHovered ? 1000 : 'auto',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
                e.stopPropagation();
                data.onNodeClick?.(data);
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div className="endpoint-header">
                <div className="endpoint-badge">✓</div>
                <h3 className="node-title">{data.label}</h3>
            </div>
            <p className="node-summary">{data.summary}</p>

            {/* Connection badges - shown when not expanded */}
            {!isHovered && <ConnectionBadges connections={data.connections} />}

            {data.detail && (
                <div
                    ref={detailRef}
                    className="node-detail nowheel nodrag nopan"
                >
                    <div
                        className="node-detail-content"
                        dangerouslySetInnerHTML={{
                            __html: formatMarkdown(data.detail)
                        }}
                    />

                    {/* Connection badges - shown when expanded (after detail content) */}
                    <ConnectionBadges connections={data.connections} />
                </div>
            )}

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(EndpointNode);
