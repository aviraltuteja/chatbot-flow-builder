// components/nodes/TextNode.tsx
import { Handle, Position } from "reactflow";

export default function TextNode({ data }: { data: { label: string } }) {
  return (
    <div className="p-2 border rounded bg-white shadow-md text-slate-800">
      <Handle type="target" position={Position.Top} />
      <div>{data.label || "Text Message"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
