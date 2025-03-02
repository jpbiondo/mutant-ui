import { useCallback, useState } from "react";

export const useMutant = () => {
  const [isMutant, setIsMutant] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      }
    },
    [setPending, setIsMutant]
  );

  return {
    isMutant,
    pending,
    error,
    testDna,
  };
};
