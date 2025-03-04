import { JSX, useEffect } from "react";
import { useMutantStats } from "../hooks/useMutantStats";
import { Dna, DnaOff } from "lucide-react";
import { Doughnut } from "react-chartjs-2";

export default function MutantStats() {
  const {
    totalHumanCount,
    totalMutantCount,
    pending: pendingStats,
    getStats,
  } = useMutantStats();

  useEffect(() => {
    getStats();
  }, [getStats]);

  const statsItems: {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
    value: number;
    color: string;
  }[] = [
    {
      title: "Total",
      subtitle: "DNA tests",
      value: totalHumanCount + totalMutantCount,
      color: "gray",
    },
    {
      title: "Mutant",
      icon: <DnaOff />,
      subtitle: "DNA results",
      value: totalMutantCount,
      color: "green",
    },
    {
      title: "Human",
      icon: <Dna />,
      subtitle: "DNA results",
      value: totalHumanCount,
      color: "red",
    },
  ];

  return (
    <>
      <div className="text-center flex flex-col md:flex-row justify-center gap-4">
        {statsItems.map(({ title, subtitle, icon, value, color }, index) => (
          <>
            <div className="text-center flex flex-col justify-center">
              <h2
                className={`text-${color}-800 text-2xl font-semibold flex justify-center items-center gap-1`}
              >
                {icon}
                {title}
              </h2>
              <h3 className="text-gray-700">{subtitle}</h3>
              <span className="text-5xl font-semibold mt-2">
                {pendingStats ? "?" : value}
              </span>
            </div>

            {/* After item divider */}
            {index < statsItems.length - 1 && (
              <div className="divider divider-vertical md:divider-horizontal"></div>
            )}
          </>
        ))}
      </div>

      {/* Doughnut graph */}
      <div className="mt-10">
        {pendingStats ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          <div className="w-72 h-72 mx-auto">
            <Doughnut
              data={{
                labels: ["Mutant Count", "Human Count"],
                datasets: [
                  {
                    data: [totalMutantCount, totalHumanCount],
                    backgroundColor: [
                      "rgba(1, 102, 48, 0.2)",
                      "rgba(159, 7, 18, 0.2)",
                    ],
                    borderColor: ["#016630", "#9f0712"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
