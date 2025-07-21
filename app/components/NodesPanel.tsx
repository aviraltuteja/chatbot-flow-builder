// components/NodesPanel.tsx
export default function NodesPanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-2 border-r w-48">
      <div
        onDragStart={(e) => onDragStart(e, "text")}
        draggable
        className="p-2 bg-blue-100 cursor-move rounded text-black">
        Text Message
      </div>
    </div>
  );
}
