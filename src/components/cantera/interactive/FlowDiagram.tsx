import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeType = 'start' | 'end' | 'process' | 'condition' | 'io';

export interface FlowNode {
  id: string;
  type: NodeType;
  label: string;
  x?: number;
  y?: number;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string; // e.g. "SÍ" | "NO"
}

export interface FlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  activeNodeId?: string | null;
  activeEdge?: { from: string; to: string } | null;
  visitedEdges?: { from: string; to: string }[];
  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const CANVAS_W = 400; // Increased width for scrollability and complex branching
const CIRCLE_R = 12;
const DIAMOND_SIZE = 16;
const ROW_GAP = 70;
const BRANCH_OFFSET = 45;

// ─── We compute node positions using a simple vertical layout ─────────────────

type Position = { x: number; y: number };

function buildLayout(nodes: FlowNode[], edges: FlowEdge[]): Record<string, Position> {
  const pos: Record<string, Position> = {};
  const cx = CANVAS_W / 2;

  // 1. Use manual positions if provided
  const unpositioned = nodes.filter(n => {
    if (n.x !== undefined && n.y !== undefined) {
      pos[n.id] = { x: n.x, y: n.y };
      return false;
    }
    return true;
  });

  if (unpositioned.length === 0) return pos;

  // Identify branch targets
  const branchEdges = edges.filter(e => e.label === 'V' || e.label === 'F');
  const siNodes = branchEdges.filter(e => e.label === 'V').map(e => e.to);
  const noNodes = branchEdges.filter(e => e.label === 'F').map(e => e.to);

  // Map to find which node comes after the branch nodes
  const joinNodes = nodes.filter(n => {
    const inEdges = edges.filter(e => e.to === n.id);
    return inEdges.length > 1; // Nodes where paths rejoin
  }).map(n => n.id);

  // We'll do a simple custom layout for this specific structure:
  // start -> io -> cond -> (left/right branches) -> end
  let currentY = 40;
  
  // 1. Start
  const start = nodes.find(n => n.type === 'start');
  if (start) {
    pos[start.id] = { x: cx, y: currentY };
    currentY += ROW_GAP;
  }

  // 2. IO/Read
  const io = nodes.find(n => n.type === 'io' && !siNodes.includes(n.id) && !noNodes.includes(n.id));
  if (io) {
    pos[io.id] = { x: cx, y: currentY };
    currentY += ROW_GAP;
  }

  // 3. Condition
  const cond = nodes.find(n => n.type === 'condition');
  if (cond) {
    pos[cond.id] = { x: cx, y: currentY };
    
    // 4. Branches (at the same Y level)
    const branchY = currentY + ROW_GAP;
    siNodes.forEach(id => {
      pos[id] = { x: cx - BRANCH_OFFSET, y: branchY };
    });
    noNodes.forEach(id => {
      pos[id] = { x: cx + BRANCH_OFFSET, y: branchY };
    });
    
    currentY = branchY + ROW_GAP;
  }

  // 5. End (Join)
  const end = nodes.find(n => n.type === 'end' || joinNodes.includes(n.id));
  if (end && !pos[end.id]) {
    pos[end.id] = { x: cx, y: currentY };
  }

  // Final fallback: Ensure EVERY node has a position to avoid crashes
  nodes.forEach((n, i) => {
    if (!pos[n.id]) {
      pos[n.id] = { x: cx, y: 100 + i * ROW_GAP };
    }
  });

  return pos;
}

// ─── SVG helpers ──────────────────────────────────────────────────────────────

function getNodePath(node: FlowNode, pos: Position): string {
  const { x, y } = pos;
  if (node.type === 'condition') {
    const s = DIAMOND_SIZE;
    return `M ${x} ${y - s} L ${x + s * 1.6} ${y} L ${x} ${y + s} L ${x - s * 1.6} ${y} Z`;
  }
  // Default to a circle for start, end, process, io
  return `M ${x - CIRCLE_R} ${y} A ${CIRCLE_R} ${CIRCLE_R} 0 1 1 ${x + CIRCLE_R} ${y} A ${CIRCLE_R} ${CIRCLE_R} 0 1 1 ${x - CIRCLE_R} ${y}`;
}

function nodeCenter(node: FlowNode, pos: Position): [number, number] {
  return [pos.x, pos.y];
}

function nodeBottom(node: FlowNode, pos: Position): [number, number] {
  if (node.type === 'condition') return [pos.x, pos.y + DIAMOND_SIZE];
  return [pos.x, pos.y + CIRCLE_R];
}

function nodeTop(node: FlowNode, pos: Position): [number, number] {
  if (node.type === 'condition') return [pos.x, pos.y - DIAMOND_SIZE];
  return [pos.x, pos.y - CIRCLE_R];
}

function nodeSide(node: FlowNode, pos: Position, dir: 'left' | 'right'): [number, number] {
  const dx = dir === 'right' ? 1 : -1;
  if (node.type === 'condition') return [pos.x + dx * DIAMOND_SIZE * 1.6, pos.y];
  return [pos.x + dx * CIRCLE_R, pos.y];
}

// ─── Color themes ─────────────────────────────────────────────────────────────

function nodeFill(type: NodeType, active: boolean): string {
  if (active) return '#00ff88';
  switch (type) {
    case 'start': return '#00ff88';
    case 'end': return '#00ff88';
    case 'condition': return '#d946ef'; // fuchsia
    case 'io': return '#06b6d4'; // cyan
    default: return '#3b82f6'; // blue
  }
}

function nodeStroke(type: NodeType, active: boolean): string {
  if (active) return '#00ff88';
  switch (type) {
    case 'start':
    case 'end': return '#00ff88';
    case 'condition': return '#d946ef';
    case 'io': return '#06b6d4';
    default: return '#3b82f6';
  }
}

function nodeFillOpacity(active: boolean): number {
  return active ? 0.25 : 0.08;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  edges,
  activeNodeId,
  activeEdge,
  visitedEdges = [],
  onNodeClick,
  onNodeHover,
}) => {
  const pos = buildLayout(nodes, edges);
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute canvas height dynamically
  const maxY = Math.max(0, ...nodes.map(n => pos[n.id]?.y ?? 0)) + 80;

  const isEdgeActive = (e: FlowEdge) => activeEdge?.from === e.from && activeEdge?.to === e.to;
  const isEdgeVisited = (e: FlowEdge) => visitedEdges.some(v => v.from === e.from && v.to === e.to);

  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="relative group w-full h-full overflow-auto custom-scrollbar flex justify-center">
      {/* Zoom Controls (Moved to top-left to avoid overlap with Run controls) */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleZoomIn}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 shadow-xl"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 shadow-xl"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={handleResetZoom}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 shadow-xl"
          title="Reset Zoom"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      <svg
        ref={svgRef}
        width={CANVAS_W * zoom}
        height={maxY * zoom}
        viewBox={`0 0 ${CANVAS_W} ${maxY}`}
        className="select-none flex-shrink-0"
        style={{ 
          fontFamily: 'monospace',
          transition: 'all 0.2s ease-out',
        }}
      >
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#64748b" />
        </marker>
        <marker id="arrowhead-v" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#3e5c4b" />
        </marker>
        <marker id="arrowhead-f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#5c3e3e" />
        </marker>
        <marker id="arrowhead-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#00ff88" />
        </marker>
        <marker id="arrowhead-error" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#ff4444" />
        </marker>
        <marker id="arrowhead-visited" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#10b981" />
        </marker>
        <marker id="arrowhead-visited-f" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#ef4444" />
        </marker>
        <filter id="glow" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="3000" height="3000">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-error" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="3000" height="3000">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-visited" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="3000" height="3000">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── EDGES ── */}
      {edges.map((edge, i) => {
        const fromNode = nodeMap[edge.from];
        const toNode = nodeMap[edge.to];
        if (!fromNode || !toNode || !pos[edge.from] || !pos[edge.to]) return null;

        const active = isEdgeActive(edge);
        const visited = isEdgeVisited(edge);
        const isFalso = edge.label === 'F';
        const isVerdadero = edge.label === 'V';
        
        // Grayish but lighter tones for inactive condition lines
        const inactiveColor = isFalso ? '#7f1d1d' : isVerdadero ? '#14532d' : '#64748b';
        
        let color = inactiveColor;
        if (active) color = isFalso ? '#ff4444' : '#00ff88';
        else if (visited) color = isFalso ? '#ef4444' : '#10b981'; // Retain bright color for history

        const strokeW = active ? 2.5 : visited ? 2 : 1.5;
        
        let marker = 'url(#arrowhead)';
        if (active) marker = isFalso ? 'url(#arrowhead-error)' : 'url(#arrowhead-active)';
        else if (visited) marker = isFalso ? 'url(#arrowhead-visited-f)' : 'url(#arrowhead-visited)';
        else if (isFalso) marker = 'url(#arrowhead-f)';
        else if (isVerdadero) marker = 'url(#arrowhead-v)';

        let filter = undefined;
        if (active) filter = isFalso ? 'url(#glow-error)' : 'url(#glow)';
        else if (visited) filter = 'url(#glow-visited)';

        // Decide routing: straight down or branching sideways
        const fromPos = pos[edge.from];
        const toPos = pos[edge.to];
        const isStraight = Math.abs(fromPos.x - toPos.x) < 5;

        let pathD: string;
        let labelX = 0, labelY = 0;

        if (isStraight) {
          const [x1, y1] = nodeBottom(fromNode, fromPos);
          const [x2, y2] = nodeTop(toNode, toPos);
          pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
          labelX = x1 + 8;
          labelY = (y1 + y2) / 2;
        } else if (fromNode.type === 'condition') {
          // Branching OUT: go sideways from condition, then down
          const side = toPos.x > fromPos.x ? 'right' : 'left';
          const [sx, sy] = nodeSide(fromNode, fromPos, side);
          const [tx, ty] = nodeTop(toNode, toPos);
          pathD = `M ${sx} ${sy} L ${toPos.x} ${sy} L ${tx} ${ty}`;
          labelX = sx + (side === 'right' ? 8 : -8);
          labelY = sy - 10;
        } else {
          // Joining IN: go down from process/io, then sideways
          const [bx, by] = nodeBottom(fromNode, fromPos);
          const [tx, ty] = nodeTop(toNode, toPos);
          // Reduced shared vertical segment to 6px to avoid collisions with central lines
          const joinY = ty - 6;
          pathD = `M ${bx} ${by} L ${bx} ${joinY} L ${tx} ${joinY} L ${tx} ${ty}`;
          labelX = bx + (bx > tx ? 8 : -16);
          labelY = (by + joinY) / 2;
        }

        return (
          <g key={i}>
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth={strokeW}
              markerEnd={marker}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              filter={filter}
            />
            {edge.label && (
              <text
                x={labelX}
                y={labelY}
                fill={active ? color : '#94a3b8'}
                fontSize="9"
                fontWeight="bold"
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {/* ── NODES ── */}
      {nodes.map(node => {
        const p = pos[node.id];
        if (!p) return null;
        const active = activeNodeId === node.id;
        const fill = nodeFill(node.type, active);
        const stroke = nodeStroke(node.type, active);
        const fillOp = nodeFillOpacity(active);

        return (
          <g 
            key={node.id} 
            style={{ transition: 'opacity 0.2s', cursor: onNodeClick ? 'pointer' : 'default' }}
            onClick={() => onNodeClick && onNodeClick(node.id)}
            onMouseEnter={() => onNodeHover && onNodeHover(node.id)}
            onMouseLeave={() => onNodeHover && onNodeHover(null)}
          >
            <path
              d={getNodePath(node, p)}
              fill={fill}
              fillOpacity={fillOp}
              stroke={stroke}
              strokeWidth={active ? 2.5 : 1.5}
              filter={active ? 'url(#glow)' : undefined}
              style={{ transition: 'all 0.3s' }}
            />
          </g>
        );
      })}
    </svg>
    </div>
  );
};
