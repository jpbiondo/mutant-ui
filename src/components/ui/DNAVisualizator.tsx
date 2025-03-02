interface DNAVisualProps {
  dnaMatrix: string[][];
}
export default function DNAVisualizator({ dnaMatrix }: DNAVisualProps) {
  const nucleotideColors: Record<string, string> = {
    A: "bg-red-100 border-red-300",
    T: "bg-blue-100 border-blue-300",
    C: "bg-green-100 border-green-300",
    G: "bg-yellow-100 border-yellow-300",
  };

  return (
    <div className="flex justify-center">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${dnaMatrix[0]?.length || 1}, 1fr)`,
        }}
      >
        {dnaMatrix.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`
              w-10 h-10 flex items-center justify-center font-mono font-bold border-2 rounded-md
              ${nucleotideColors[cell] || "bg-gray-100 border-gray-300"}
              
              transition-all duration-300
            `}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
