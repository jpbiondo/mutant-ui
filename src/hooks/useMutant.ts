import { useCallback, useState } from "react";

export const useMutant = () => {
  const [isMutant, setIsMutant] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalHumanCount, setTotalHumanCount] = useState<number>(0);
  const [totalMutantCount, setTotalMutantCount] = useState<number>(0);

  const API_URL = import.meta.env.VITE__MUTANT_API_URL;
  const testDna = useCallback(
    async (dna: string[]) => {
      setPending(true);
      console.log(JSON.stringify({ dna: dna }));
      try {
        const response = await fetch(`${API_URL}/mutant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dna: dna }),
        });

        if (!response.ok) {
          if (response.status === 403) {
            setIsMutant(false);
            return;
          }
          setError(`HTTP error! status: ${response.status}`);
          return;
        }

        setIsMutant(true);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setPending(false);
        getStats();
        console.log({ totalHumanCount, totalMutantCount });
      }
    },
    [setPending, setIsMutant]
  );

  const getStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        mode: "no-cors",
      });

      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        return;
      }

      const { count_mutant_dna, count_human_dna } = await response.json();
      setTotalMutantCount(count_mutant_dna);
      setTotalHumanCount(count_human_dna);
    } catch (error: any) {
      setError(error.message);
    }
  }, [setError, setTotalHumanCount, setTotalMutantCount]);
  return {
    isMutant,
    totalHumanCount,
    totalMutantCount,
    pending,
    error,
    testDna,
    getStats,
  };
};
