/**
 * NodeDetailModal - Full modal view for node details
 * Opens when clicking a node header, renders via portal outside React Flow
 */
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { categoryColors } from '../../data/flowData';
import formatMarkdown from '../../utils/formatMarkdown';
import './NodeDetailModal.css';

function NodeDetailModal({ node, onClose }) {
    if (!node) return null;

    const borderColor = categoryColors[node.category] || 'var(--color-primary)';

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handleKeyDown]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className="node-modal-backdrop" onClick={handleBackdropClick}>
            <div className="node-modal" style={{ '--modal-color': borderColor }}>
                <button className="node-modal-close" onClick={onClose} aria-label="Close">
                    &times;
                </button>

                <div className="node-modal-header">
                    <div className="node-modal-indicator" />
                    <h2 className="node-modal-title">{node.label}</h2>
                </div>

                {node.meetingRequired && (
                    <span className="node-modal-meeting-badge">Meeting Required</span>
                )}

                <p className="node-modal-summary">{node.summary}</p>

                {node.detail && (
                    <div className="node-modal-detail">
                        <div
                            className="node-modal-detail-content"
                            dangerouslySetInnerHTML={{
                                __html: formatMarkdown(node.detail)
                            }}
                        />
                    </div>
                )}

                {node.connections && (node.connections.incoming.length > 0 || node.connections.outgoing.length > 0) && (
                    <div className="node-modal-connections">
                        {node.connections.incoming.length > 0 && (
                            <div className="node-modal-connection-group">
                                <span className="node-modal-connection-label">Incoming</span>
                                {node.connections.incoming.map((name, i) => (
                                    <span key={i} className="node-modal-badge incoming">{name}</span>
                                ))}
                            </div>
                        )}
                        {node.connections.outgoing.length > 0 && (
                            <div className="node-modal-connection-group">
                                <span className="node-modal-connection-label">Outgoing</span>
                                {node.connections.outgoing.map((conn, i) => {
                                    const name = typeof conn === 'string' ? conn : conn.name;
                                    const label = typeof conn === 'object' && conn.edgeLabel ? conn.edgeLabel : '';
                                    return (
                                        <span key={i} className="node-modal-badge outgoing">
                                            {label ? `${label} \u2192 ${name}` : name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}

export default NodeDetailModal;
