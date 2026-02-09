/**
 * Special Education Intervention Flowchart
 * Interactive visualization of 504, IEP, FBA, and BIP processes
 */
import { useCallback, useState, useMemo, useEffect } from 'react';
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
import ThemeToggle from './components/ui/ThemeToggle';
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

import ExperimentPanel from './components/ui/ExperimentPanel';

function FlowCanvas() {
    // Experiment State
    const [experimentSettings, setExperimentSettings] = useState({
        showComplexFlows: false,
        showColoredEdges: false,
        animateFlow: false,
    });

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [hoveredNodeId, setHoveredNodeId] = useState(null);
    const { fitView } = useReactFlow();

    // Handle Experiment Settings
    const handleSettingChange = useCallback((setting, value) => {
        setExperimentSettings(prev => {
            const newSettings = { ...prev, [setting]: value };
            return newSettings;
        });
    }, []);

    // Effect to update graph based on settings
    useEffect(() => {
        try {
            // 1. Filter Nodes based on Complexity
            const safeInitialNodes = Array.isArray(initialNodes) ? initialNodes : [];
            const filteredNodes = safeInitialNodes.filter(node =>
                experimentSettings.showComplexFlows || node.data?.scenario !== 'complex'
            );

            setNodes(filteredNodes);

            // 2. Filter & Style Edges
            const safeInitialEdges = Array.isArray(initialEdges) ? initialEdges : [];
            const filteredEdges = safeInitialEdges.filter(edge =>
                experimentSettings.showComplexFlows || edge.data?.scenario !== 'complex'
            ).map(edge => {
                const newEdge = { ...edge, style: { ...edge.style } };

                // Ensure valid markerEnd base
                const baseMarker = edge.markerEnd || defaultEdgeOptions.markerEnd;

                // Apply Animation - only to hovered connected edges
                // (Default to no animation unless hovering with animation toggle on)
                newEdge.animated = false;

                // Apply Coloring
                if (experimentSettings.showColoredEdges) {
                    if (edge.data?.type === 'return') {
                        // Orange for return paths (going back in the flow)
                        newEdge.style = { ...newEdge.style, stroke: '#f59e0b', strokeWidth: 2.5 };
                        newEdge.markerEnd = { ...baseMarker, color: '#f59e0b' };
                    } else if (edge.data?.type === 'denial') {
                        // Red for denial/ineligibility paths
                        newEdge.style = { ...newEdge.style, stroke: '#ef4444', strokeWidth: 2.5 };
                        newEdge.markerEnd = { ...baseMarker, color: '#ef4444' };
                    } else {
                        // Green for all forward progress paths (default)
                        newEdge.style = { ...newEdge.style, stroke: '#22c55e', strokeWidth: 2 };
                        newEdge.markerEnd = { ...baseMarker, color: '#22c55e' };
                    }
                } else {
                    // Reset to default
                    newEdge.style = { ...defaultEdgeOptions.style, ...edge.style };
                    newEdge.markerEnd = { ...defaultEdgeOptions.markerEnd };
                }

                // Apply hover-based highlighting and animation
                if (hoveredNodeId) {
                    const isConnected = edge.source === hoveredNodeId || edge.target === hoveredNodeId;
                    if (isConnected) {
                        // Glow effect for connected edges
                        newEdge.style = {
                            ...newEdge.style,
                            strokeWidth: 4,
                            filter: 'drop-shadow(0 0 6px currentColor)',
                        };
                        // Animate only connected edges when animation toggle is on
                        if (experimentSettings.animateFlow) {
                            newEdge.animated = true;
                        }
                    } else {
                        // Dim unconnected edges
                        newEdge.style = {
                            ...newEdge.style,
                            opacity: 0.15,
                        };
                    }
                }

                return newEdge;
            });
            setEdges(filteredEdges);
        } catch (err) {
            console.error('Error updating flow visualization:', err);
        }

    }, [experimentSettings, hoveredNodeId, setNodes, setEdges]);

    // Handle node hover for edge highlighting
    const onNodeMouseEnter = useCallback((event, node) => {
        setHoveredNodeId(node.id);
    }, []);

    const onNodeMouseLeave = useCallback(() => {
        setHoveredNodeId(null);
    }, []);

    // Handle zoom changes for semantic zoom
    const onMove = useCallback((event, viewport) => {
        setZoomLevel(viewport.zoom);
    }, []);

    // Determine zoom category for UI display
    const zoomCategory = useMemo(() => {
        if (zoomLevel >= 1.2) return 'detailed';
        if (zoomLevel < 0.8) return 'overview';
        return 'standard';
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
                onMove={onMove}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
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
                <Controls position="bottom-left" />
                <MiniMap
                    nodeColor={nodeColor}
                    maskColor="rgba(15, 23, 42, 0.8)"
                    style={{ background: 'var(--color-bg-secondary)' }}
                    zoomable
                    pannable
                />
            </ReactFlow>

            {/* Experiment Panel */}
            <ExperimentPanel
                settings={experimentSettings}
                onSettingChange={handleSettingChange}
            />

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
                Scroll to zoom • Drag to pan • Hover tiles for details
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
            { name: 'ISBE Part 226: Special Education', url: './Docs/isbe_part_226.pdf' },
            { name: 'ISBE Part 28: Dispute Resolution', url: './Docs/isbe_part_28.pdf' },
            { name: 'ISBE Part 401: Non-Public Special Ed', url: './Docs/isbe_part_401.pdf' },
            { name: 'ISBE-IASSW School Social Work Guide', url: './Docs/ISBE-IASSW-School-Social-Work-Guide.pdf' },
            { name: 'ISBE IEP Instructions', url: './Docs/iep_instructions.pdf' },
            { name: 'FBA Form (Sample)', url: './Docs/FBA-FORM.pdf' },
            { name: 'BIP Form (Sample)', url: './Docs/BIP-FORM-English.pdf' },
        ],
        web: [
            { name: 'Understood.org: IEP vs 504', url: 'https://www.understood.org/en/articles/the-difference-between-ieps-and-504-plans' },
            { name: 'Center on MTSS (National)', url: 'https://mtss4success.org/' },
            { name: 'IL Legal Aid: School & Education', url: 'https://www.illinoislegalaid.org/legal-information/school-education' },
            { name: 'Parent Center Hub: FBA/BIP Resources', url: 'https://www.parentcenterhub.org/fba/' },
            { name: 'CRS Report: IDEA Series', url: 'https://www.congress.gov/crs-product/R41833' },
            { name: 'INTC: FBA Guide', url: 'https://intc.education.illinois.edu/docs/librariesprovider14/2022-lc/evaluating-and-developing-quality-functional-behavioral-assessments-(fbas).pdf?sfvrsn=8e2d0936_3' },
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
                        <div className="sources-title">📄 Official Documents</div>
                        <ul className="sources-list">
                            {sources.documents.map((source, idx) => (
                                <li key={idx}>
                                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                                        {source.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="sources-section">
                        <div className="sources-title">🌐 Web References</div>
                        <ul className="sources-list">
                            {sources.web.map((source, idx) => (
                                <li key={idx}>
                                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                                        {source.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="sources-disclaimer">
                        <em>Note: Always verify current regulations with official sources.</em>
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
                <ThemeToggle />
            </header>

            <ReactFlowProvider>
                <FlowCanvas />
            </ReactFlowProvider>
        </div>
    );
}

export default App;
