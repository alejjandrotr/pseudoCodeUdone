import React, { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeType = 'start' | 'end' | 'process' | 'condition' | 'io';

export interface FlowNode {
  id: string;
  type: NodeType;
  label: string;
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
  activeEdgeFrom?: string | null; // id of the FROM node of the active edge
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const CANVAS_W = 420;
const CIRCLE_R = 6;
const DIAMOND_SIZE = 10;
const ROW_GAP = 50;

// ─── We compute node positions using a simple vertical layout ─────────────────

type Position = { x: number; y: number };

function buildLayout(nodes: FlowNode[], edges: FlowEdge[]): Record<string, Position> {
  const pos: Record<string, Position> = {};
  const cx = CANVAS_W / 2;

  // Build adjacency for topological sort
  const inDeg: Record<string, number> = {};
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => { inDeg[n.id] = 0; adj[n.id] = []; });
  edges.forEach(e => { adj[e.from].push(e.to); inDeg[e.to] = (inDeg[e.to] || 0) + 1; });

  // Kahn's BFS topological
  const queue: string[] = nodes.filter(n => !inDeg[n.id]).map(n => n.id);
  const order: string[] = [];
  while (queue.length) {
    const cur = queue.shift()!;
    order.push(cur);
    adj[cur].forEach(next => { inDeg[next]--; if (!inDeg[next]) queue.push(next); });
  }

  let y = 60;
  order.forEach(id => {
    pos[id] = { x: cx, y };
    y += ROW_GAP;
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
  activeEdgeFrom,
}) => {
  const pos = buildLayout(nodes, edges);
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute canvas height dynamically
  const maxY = Math.max(...nodes.map(n => pos[n.id]?.y ?? 0)) + 80;

  const isEdgeActive = (e: FlowEdge) => activeEdgeFrom === e.from;

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${CANVAS_W} ${maxY}`}
      className="select-none"
      style={{ fontFamily: 'monospace' }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#64748b" />
        </marker>
        <marker id="arrowhead-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#00ff88" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── EDGES ── */}
      {edges.map((edge, i) => {
        const fromNode = nodeMap[edge.from];
        const toNode = nodeMap[edge.to];
        if (!fromNode || !toNode || !pos[edge.from] || !pos[edge.to]) return null;

        const active = isEdgeActive(edge);
        const color = active ? '#00ff88' : '#475569';
        const strokeW = active ? 2.5 : 1.5;

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
        } else {
          // Branching: go sideways from condition
          const side = toPos.x > fromPos.x ? 'right' : 'left';
          const [sx, sy] = nodeSide(fromNode, fromPos, side);
          const [tx, ty] = nodeTop(toNode, toPos);
          pathD = `M ${sx} ${sy} L ${toPos.x} ${sy} L ${tx} ${ty}`;
          labelX = sx + (side === 'right' ? 8 : -8);
          labelY = sy - 10;
        }

        return (
          <g key={i}>
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth={strokeW}
              markerEnd={active ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              filter={active ? 'url(#glow)' : undefined}
            />
            {edge.label && (
              <text
                x={labelX}
                y={labelY}
                fill={active ? '#00ff88' : '#94a3b8'}
                fontSize="11"
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
          <g key={node.id} style={{ transition: 'opacity 0.2s' }}>
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
  );
};
