/**
 * DecisionNode - Diamond-shaped decision point
 */
import { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { categoryColors } from '../../data/flowData';
import './nodes.css';

// Simple markdown-like formatting
function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n• /g, '</p><p class="bullet">• ')
        .replace(/\n/g, '<br/>');
}

function DecisionNode({ data, selected }) {
    const [isHovered, setIsHovered] = useState(false);
    const detailRef = useRef(null);
    const borderColor = categoryColors[data.category] || 'var(--color-decision)';

    // Use capture phase to intercept wheel events before React Flow
    useEffect(() => {
        const detailEl = detailRef.current;
        if (!detailEl) return;

        const handleWheel = (e) => {
            const isExpanded = detailEl.scrollHeight > 0 && detailEl.clientHeight > 0;
            const hasScrollableContent = detailEl.scrollHeight > detailEl.clientHeight;

            if (isExpanded || hasScrollableContent) {
                e.stopPropagation();
                e.preventDefault();
                detailEl.scrollTop += e.deltaY;
            }
        };

        detailEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => detailEl.removeEventListener('wheel', handleWheel, { capture: true });
    }, [isHovered]);

    return (
        <div
            className={`flow-node decision-node ${selected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
            style={{
                '--node-color': borderColor,
                zIndex: isHovered ? 1000 : 'auto',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
            {!isHovered && data.connections && (data.connections.incoming.length > 0 || data.connections.outgoing.length > 0) && (
                <div className="node-connections">
                    {data.connections.incoming.length > 0 && (
                        <div className="connection-group">
                            <span className="connection-label">IN:</span>
                            {data.connections.incoming.map((name, i) => (
                                <span key={i} className="connection-badge incoming">{name}</span>
                            ))}
                        </div>
                    )}
                    {data.connections.outgoing.length > 0 && (
                        <div className="connection-group">
                            <span className="connection-label">OUT:</span>
                            {data.connections.outgoing.map((conn, i) => {
                                const name = typeof conn === 'string' ? conn : conn.name;
                                const label = typeof conn === 'object' && conn.edgeLabel ? conn.edgeLabel : '';
                                return (
                                    <span key={i} className="connection-badge outgoing">
                                        {label ? `${label} → ${name}` : name}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

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
                    {data.connections && (data.connections.incoming.length > 0 || data.connections.outgoing.length > 0) && (
                        <div className="node-connections">
                            {data.connections.incoming.length > 0 && (
                                <div className="connection-group">
                                    <span className="connection-label">IN:</span>
                                    {data.connections.incoming.map((name, i) => (
                                        <span key={i} className="connection-badge incoming">{name}</span>
                                    ))}
                                </div>
                            )}
                            {data.connections.outgoing.length > 0 && (
                                <div className="connection-group">
                                    <span className="connection-label">OUT:</span>
                                    {data.connections.outgoing.map((conn, i) => {
                                        const name = typeof conn === 'string' ? conn : conn.name;
                                        const label = typeof conn === 'object' && conn.edgeLabel ? conn.edgeLabel : '';
                                        return (
                                            <span key={i} className="connection-badge outgoing">
                                                {label ? `${label} → ${name}` : name}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <Handle type="source" position={Position.Bottom} id="bottom" />
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Left} id="left" />
        </div>
    );
}

export default memo(DecisionNode);
