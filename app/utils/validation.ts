// utils/validation.ts
export const validateFlow = (nodes: any[], edges: any[]) => {
  if (nodes.length <= 1) return null;

  const sourceMap = new Set(edges.map((e) => e.source));
  const missingTargets = nodes.filter((node) => !sourceMap.has(node.id));

  if (missingTargets.length > 1) {
    return "Error: Multiple nodes are missing outgoing connections!";
  }

  return null;
};
