// components/SettingsPanel.tsx
type Props = {
  label: string;
  onChange: (value: string) => void;
  onDone: () => void;
};

export default function SettingsPanel({ label, onChange, onDone }: Props) {
  return (
    <div className="p-4 border-l w-64 bg-gray-50 text-black">
      <h2 className="mb-2 font-bold">Edit Text Node</h2>
      <input
        value={label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Type your message..."
      />

      <button
        onClick={onDone}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Done
      </button>
    </div>
  );
}
