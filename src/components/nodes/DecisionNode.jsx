/**
 * DecisionNode - Diamond-shaped decision point
 */
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import formatMarkdown from '../../utils/formatMarkdown';
import useNodeHover from '../../hooks/useNodeHover';
import ConnectionBadges from './ConnectionBadges';
import './nodes.css';

function DecisionNode({ data, selected }) {
    const { isHovered, detailRef, handleMouseEnter, handleMouseLeave } = useNodeHover();
    const borderColor = categoryColors[data.category] || 'var(--color-decision)';

    return (
        <div
            className={`flow-node decision-node ${selected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
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

            <div className="decision-diamond">
                <h3 className="node-title">{data.label}</h3>
                {data.meetingRequired && (
                    <span className="meeting-badge">Meeting Required</span>
                )}
                <p className="node-summary">{data.summary}</p>
            </div>

            {/* Connection badges - shown when not expanded */}
            {!isHovered && <ConnectionBadges connections={data.connections} showEdgeLabels />}

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
                    <ConnectionBadges connections={data.connections} showEdgeLabels />
                </div>
            )}

            <Handle type="source" position={Position.Bottom} id="bottom" />
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Left} id="left" />
        </div>
    );
}

export default memo(DecisionNode);
