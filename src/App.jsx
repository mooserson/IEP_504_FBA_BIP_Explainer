/**
 * Special Education Intervention Flowchart
 * Interactive visualization of 504, IEP, FBA, and BIP processes
 */
import { useCallback, useState, useMemo } from 'react';
import {
    ReactFlow,
    Controls,
    MiniMap,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ProcessNode from './components/nodes/ProcessNode';
import DecisionNode from './components/nodes/DecisionNode';
import EndpointNode from './components/nodes/EndpointNode';
import PhaseLabelNode from './components/nodes/PhaseLabelNode';
import { initialNodes, initialEdges, categoryColors, NODE_CATEGORIES } from './data/flowData';
import './App.css';

// Register custom node types
const nodeTypes = {
    processNode: ProcessNode,
    decisionNode: DecisionNode,
    endpointNode: EndpointNode,
    phaseLabelNode: PhaseLabelNode,
};

// Edge styling with arrows
const defaultEdgeOptions = {
    style: { stroke: 'var(--color-primary-light)', strokeWidth: 2 },
    type: 'smoothstep',
    animated: false,
    markerEnd: {
        type: 'arrowclosed',
        color: 'var(--color-primary-light)',
        width: 20,
        height: 20,
    },
};

function FlowCanvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [zoomLevel, setZoomLevel] = useState(1);
    const { fitView } = useReactFlow();

    // Handle zoom changes for semantic zoom
    const onMoveEnd = useCallback((event, viewport) => {
        setZoomLevel(viewport.zoom);
    }, []);

    // Determine zoom category for UI display
    const zoomCategory = useMemo(() => {
        if (zoomLevel > 1.2) return 'detailed';
        if (zoomLevel > 0.6) return 'standard';
        return 'overview';
    }, [zoomLevel]);

    // Minimap node color based on category
    const nodeColor = useCallback((node) => {
        return categoryColors[node.data?.category] || '#666';
    }, []);

    return (
        <div className={`flow-container zoom-${zoomCategory}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onMoveEnd={onMoveEnd}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.2}
                maxZoom={2}
                attributionPosition="bottom-right"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
            >
                <Background color="var(--color-border)" gap={20} size={1} />
                <Controls />
                <MiniMap
                    nodeColor={nodeColor}
                    maskColor="rgba(15, 23, 42, 0.8)"
                    style={{ background: 'var(--color-bg-secondary)' }}
                />
            </ReactFlow>

            {/* Zoom Level Indicator */}
            <div className="zoom-indicator">
                Zoom: <strong>{Math.round(zoomLevel * 100)}%</strong>
                <span style={{ marginLeft: '8px', opacity: 0.7 }}>
                    ({zoomCategory === 'detailed' ? '📋 Full Detail' :
                        zoomCategory === 'standard' ? '📝 Summary' : '🗺️ Overview'})
                </span>
            </div>

            {/* Sources Panel */}
            <SourcesPanel />

            {/* Instructions */}
            <div className="instructions">
                Scroll to zoom • Drag to pan • Zoom in for details
            </div>

            {/* Legend */}
            <Legend />
        </div>
    );
}

function SourcesPanel() {
    const [isOpen, setIsOpen] = useState(false);

    const sources = {
        documents: [
            'ISBE Part 226 (Special Education)',
            'ISBE Part 28 (Dispute Resolution)',
            'ISBE Part 401 (Section 504)',
            'ISBE-IASSW School Social Work Guide',
            'SOWK 609B Course Materials',
            'IEP Instructions Form',
            'FBA & BIP Forms',
        ],
        web: [
            { name: 'NCLD - IEP vs 504', url: 'ncld.org' },
            { name: 'ISBE - MTSS Framework', url: 'isbe.net' },
            { name: 'IL Legal Aid - Parent Rights', url: 'illinoislegalaid.org' },
            { name: 'UNC/ECAC - Referral Process', url: 'unc.edu' },
            { name: 'Disability Rights - FBA/BIP', url: 'drckansas.org' },
        ],
    };

    return (
        <div className={`sources-panel ${isOpen ? 'open' : ''}`}>
            <button
                className="sources-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="View reference sources"
            >
                <span className="sources-icon">📚</span>
                <span className="sources-label">Sources</span>
            </button>
            {isOpen && (
                <div className="sources-content">
                    <div className="sources-section">
                        <div className="sources-title">📄 Course Documents</div>
                        <ul className="sources-list">
                            {sources.documents.map((source, idx) => (
                                <li key={idx}>{source}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="sources-section">
                        <div className="sources-title">🌐 Web References</div>
                        <ul className="sources-list web">
                            {sources.web.map((source, idx) => (
                                <li key={idx}>
                                    <span>{source.name}</span>
                                    <span className="source-url">{source.url}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

function Legend() {
    const legendItems = [
        { label: 'Recognition', color: categoryColors[NODE_CATEGORIES.RECOGNITION] },
        { label: 'MTSS/RTI', color: categoryColors[NODE_CATEGORIES.MTSS] },
        { label: 'Referral', color: categoryColors[NODE_CATEGORIES.REFERRAL] },
        { label: 'Evaluation', color: categoryColors[NODE_CATEGORIES.EVALUATION] },
        { label: 'IEP', color: categoryColors[NODE_CATEGORIES.IEP] },
        { label: '504 Plan', color: categoryColors[NODE_CATEGORIES.PLAN_504] },
        { label: 'FBA/BIP', color: categoryColors[NODE_CATEGORIES.FBA_BIP] },
    ];

    return (
        <div className="legend">
            <div className="legend-title">Process Types</div>
            <div className="legend-items">
                {legendItems.map(item => (
                    <div key={item.label} className="legend-item">
                        <div className="legend-color" style={{ background: item.color }} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="legend-divider" />
            <div className="legend-title">Line Styles</div>
            <div className="legend-items">
                <div className="legend-item">
                    <div className="legend-line solid" />
                    <span>Forward Flow</span>
                </div>
                <div className="legend-item">
                    <div className="legend-line dashed" />
                    <span>Return Path</span>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <div>
                    <h1 className="app-title">Special Education Intervention Flowchart</h1>
                    <p className="app-subtitle">504 Plans • IEPs • FBAs • BIPs — A comprehensive guide for school social workers</p>
                </div>
            </header>

            <ReactFlowProvider>
                <FlowCanvas />
            </ReactFlowProvider>
        </div>
    );
}

export default App;
