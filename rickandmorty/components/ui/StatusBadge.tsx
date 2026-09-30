interface Props {
  status: string;
}

const CONFIG: Record<string, { bg: string; dot: string; label: string }> = {
  Alive: {
    bg: "bg-green-950 text-green-300 border border-green-800",
    dot: "bg-green-400",
    label: "Vivo",
  },
  Dead: {
    bg: "bg-red-950 text-red-300 border border-red-800",
    dot: "bg-red-400",
    label: "Muerto",
  },
  unknown: {
    bg: "bg-gray-700 text-gray-300 border border-gray-600",
    dot: "bg-gray-400",
    label: "Desconocido",
  },
};

export default function StatusBadge({ status }: Props) {
  const cfg = CONFIG[status] ?? CONFIG.unknown;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
