import { Node, Edge } from "reactflow";
import { TextNodeData } from "../types/flow";

export const validateFlow = (
  nodes: Node<TextNodeData>[],
  edges: Edge[]
): string | null => {
  if (nodes.length <= 1) return null;

  const sourceIds = new Set(edges.map((e) => e.source));
  const nodesWithoutOutgoing = nodes.filter((n) => !sourceIds.has(n.id));

  if (nodesWithoutOutgoing.length > 1) {
    return "Error: Multiple nodes are missing outgoing connections!";
  }

  return null;
};
