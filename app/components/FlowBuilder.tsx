// components/FlowBuilder.tsx
"use client";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useState } from "react";

import TextNode from "./nodes/TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { validateFlow } from "../utils/validation";

const nodeTypes = { text: TextNode };

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      const existing = edges.find((e) => e.source === connection.source);
      if (existing) return; // only one edge from source
      setEdges((eds) => addEdge(connection, eds));
    },
    [edges]
  );

  const onDrop = useCallback(
    (event: {
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX - 200, y: event.clientY - 60 };

      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: "" },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    []
  );

  const onNodeClick = useCallback((_: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const updateSelectedNodeLabel = (label: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id ? { ...n, data: { ...n.data, label } } : n
      )
    );
    setSelectedNode((n: any) => ({ ...n, data: { ...n.data, label } }));
  };

  const handleSave = () => {
    const error = validateFlow(nodes, edges);
    if (error) return alert(error);
    alert("Flow saved successfully!");
    console.log({ nodes, edges });
  };

  return (
    <div className="flex h-screen">
      {!selectedNode ? (
        <NodesPanel />
      ) : (
        <SettingsPanel
          label={selectedNode.data.label}
          onChange={updateSelectedNodeLabel}
          onDone={() => setSelectedNode(null)}
        />
      )}

      <div
        className="flex-1 relative"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView>
          <Background />
          <Controls />
        </ReactFlow>
        <button
          onClick={handleSave}
          className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}
