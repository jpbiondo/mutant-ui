import { Dna, DnaOff } from "lucide-react";

interface MutantResultModal {
  resultModalRef: React.RefObject<HTMLDialogElement | null>;
  isMutant: boolean;
}
export default function MutantResultModal({
  resultModalRef,
  isMutant,
}: MutantResultModal) {
  return (
    <dialog ref={resultModalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Your results just arrived!</h3>
        <p className="py-4 text-center text-md mb-4">You are a...</p>
        {isMutant ? (
          <div className="flex flex-col items-center text-green-800">
            <DnaOff className="h-14 w-14" />
            <span className="font-bold text-2xl">Mutant</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-red-800">
            <Dna className="h-14 w-14" />
            <span className="font-bold text-2xl">Human</span>
          </div>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
