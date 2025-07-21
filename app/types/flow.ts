// types/flow.ts

export type NodeType = "text";

export interface TextNodeData {
  type: NodeType;
  label: string;
}

export interface FlowNode extends TextNodeData {
  id: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
}
