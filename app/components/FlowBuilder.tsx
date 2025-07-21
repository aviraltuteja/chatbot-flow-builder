"use client";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useState } from "react";
import TextNode from "./nodes/TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { validateFlow } from "../utils/validation";

import { TextNodeData } from "../types/flow";

const nodeTypes = { text: TextNode };

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node<TextNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<TextNodeData> | null>(
    null
  );

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      const existing = edges.find((e) => e.source === connection.source);
      if (existing) return; // Only one edge per source
      setEdges((eds) => addEdge(connection, eds));
    },
    [edges]
  );

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const newNode: Node<TextNodeData> = {
      id: `${+new Date()}`,
      type,
      position,
      data: { label: "", type: "text" },
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<TextNodeData>) => {
      setSelectedNode(node);
    },
    []
  );

  const updateSelectedNodeLabel = (label: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode?.id ? { ...n, data: { ...n.data, label } } : n
      )
    );

    if (selectedNode) {
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, label },
      });
    }
  };

  const handleSave = () => {
    const error = validateFlow(nodes, edges);
    if (error) {
      alert(error);
      return;
    }
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
