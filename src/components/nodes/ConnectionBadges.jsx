/**
 * ConnectionBadges - Shared incoming/outgoing connection badges for flow nodes.
 * Props:
 *   connections  – { incoming: string[], outgoing: (string | { name, edgeLabel })[] }
 *   showEdgeLabels – if true, outgoing badges render "label -> name" (default false)
 */
function ConnectionBadges({ connections, showEdgeLabels = false }) {
    if (!connections) return null;
    if (connections.incoming.length === 0 && connections.outgoing.length === 0) return null;

    return (
        <div className="node-connections">
            {connections.incoming.length > 0 && (
                <div className="connection-group">
                    <span className="connection-label">IN:</span>
                    {connections.incoming.map((name, i) => (
                        <span key={i} className="connection-badge incoming">{name}</span>
                    ))}
                </div>
            )}
            {connections.outgoing.length > 0 && (
                <div className="connection-group">
                    <span className="connection-label">OUT:</span>
                    {connections.outgoing.map((conn, i) => {
                        const name = typeof conn === 'string' ? conn : conn.name;
                        const label = showEdgeLabels && typeof conn === 'object' && conn.edgeLabel
                            ? conn.edgeLabel
                            : '';
                        return (
                            <span key={i} className="connection-badge outgoing">
                                {label ? `${label} \u2192 ${name}` : name}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ConnectionBadges;
