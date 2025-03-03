import { useCallback, useState } from "react";

export const useMutantStats = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalHumanCount, setTotalHumanCount] = useState<number>(0);
  const [totalMutantCount, setTotalMutantCount] = useState<number>(0);

  const API_URL = import.meta.env.VITE__MUTANT_API_URL;
  const getStats = useCallback(async () => {
    setPending(true);
    try {
      const response = await fetch(`${API_URL}/stats`);

      const { count_mutant_dna, count_human_dna } = await response.json();
      setTotalMutantCount(count_mutant_dna);
      setTotalHumanCount(count_human_dna);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setPending(false);
    }
  }, []);
  return { totalHumanCount, totalMutantCount, pending, error, getStats };
};
