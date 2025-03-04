import {
  Atom,
  ChartLine,
  Dna,
  DnaOff,
  FlaskConical,
  Microscope,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mutantExamples } from "./lib/utils/mutant-examples";
import Header from "./components/Header";
import DNAVisualizator from "./components/ui/DNAVisualizator";
import { stringToVectorDna, vectorToMatrixDna } from "./lib/utils/mutant.utils";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { useMutant } from "./hooks/useMutant";
import MutantStats from "./components/MutantStats";
import MutantAboutAccordion from "./components/MutantAboutAccordion";
import MutantResultModal from "./components/MutantResultModal";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [dnaInput, setDnaInput] = useState<string>("");
  const [manualInputTab, setManualInputTab] = useState<boolean>(true);
  const [dnaMatrix, setDnaMatrix] = useState<string[][]>([]);
  const resultModalRef = useRef<HTMLDialogElement | null>(null);
  const { isMutant, pending, error, testDna } = useMutant();

  useEffect(() => {
    if (dnaInput) {
      const matrixDna: string[][] = vectorToMatrixDna(dnaInput.split("\n"));
      setDnaMatrix(matrixDna);
      return;
    }

    setDnaMatrix([]);
  }, [dnaInput]);

  const openResultModal = () => {
    if (resultModalRef.current) {
      resultModalRef.current.showModal();
      return;
    }
    console.error("Modal not found");
  };
  const handleTabSwitch = (value: boolean) => {
    setManualInputTab(value);
  };

  const handleOnClickDnaSample = (data: string[]) => {
    setDnaInput(data.join("\n"));
  };

  const handleOnClickDnaTest = async () => {
    await testDna(stringToVectorDna(dnaInput));

    if (error) {
      console.log(error);
      return;
    }

    openResultModal();
  };

  return (
    <main className="max-w-4xl mx-auto py-8">
      <Header />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="card bg-base-100 shadow-sm py-8 px-4">
          <div>
            <div className="card-title">
              <FlaskConical className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">DNA Sequence Input</h2>
            </div>
            <p className="text-sm/5 text-gray-600 mt-2">
              Enter a DNA sequence to check if it belongs to a mutant. Each line
              represents a row in the DNA matrix.
            </p>
          </div>

          <div className="mt-6 flex flex-col">
            <div className="tabs tabs-box font-semibold flex flex-row">
              <input
                type="radio"
                name="inputType"
                className="tab flex-1"
                aria-label="Manual Input"
                defaultChecked
                onClick={() => handleTabSwitch(true)}
              />
              <input
                type="radio"
                name="inputType"
                className="tab flex-1"
                aria-label="Examples"
                onClick={() => handleTabSwitch(false)}
              />
            </div>

            {manualInputTab ? (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">DNA Sequence</legend>
                <textarea
                  className="textarea h-38 w-full font-mono"
                  value={dnaInput}
                  onChange={(e) => setDnaInput(e.target.value)}
                  placeholder="ATGCGA
CAGTGC
TTATGT
AGAAGG
CCCCTA
TCACTG"
                ></textarea>
                <p className="fieldset-label">
                  Use only A, T, C, G characters. Matrix must be square (NxN).
                </p>
              </fieldset>
            ) : (
              <div className="mt-2">
                <legend className="text-xs font-semibold">
                  Select an example DNA sequence
                </legend>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {mutantExamples.map((dnaTest, index) => (
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => handleOnClickDnaSample(dnaTest.dna)}
                    >
                      {dnaTest.isMutant ? (
                        <DnaOff className="h-5 w-5" />
                      ) : (
                        <Dna className="h-5 w-5" />
                      )}
                      {`${dnaTest.isMutant ? "Mutant" : "Human"} Example ${
                        index + 1
                      }`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn btn-primary mt-6"
              disabled={pending}
              onClick={handleOnClickDnaTest}
            >
              {pending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Analyzing
                </>
              ) : (
                <>
                  <Microscope className="h-4 w-4" />
                  Analyze DNA
                </>
              )}
            </button>
          </div>
        </section>

        <section className="card bg-base-100 shadow-sm py-8 px-4">
          <div>
            <div className="card-title">
              <Microscope className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">DNA Visualization</h2>
            </div>
            <p className="text-sm/5 text-gray-600 mt-2">
              DNA matrix representation with highlighted sequences
            </p>
          </div>

          <div className="mt-6 flex flex-col">
            <div className="flex flex-col items-center justify-center h-64 text-gray-600">
              {dnaInput.length > 0 ? (
                <DNAVisualizator dnaMatrix={dnaMatrix} />
              ) : (
                <>
                  <Dna className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm/5">Enter a DNA sequence to visualize</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="card bg-base-100 shadow-sm py-8 px-4 md:col-span-2">
          <div>
            <div className="card-title">
              <Atom className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">
                About the Mutant Challenge
              </h2>
            </div>
          </div>

          <div className="mt-4 text-gray-700">
            <p>
              The MercadoLibre Mutant Challenge is a coding assessment that
              involves detecting whether a human is a mutant based on their DNA
              sequence.
            </p>
            <MutantAboutAccordion />
          </div>
        </section>

        <section className="card bg-base-100 shadow-sm py-8 px-4 md:col-span-2">
          <div>
            <div className="card-title">
              <ChartLine className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Stats</h2>
            </div>
            <p className="text-sm/5 text-gray-600 mt-2">
              Watch the mutant-human ratio of tests
            </p>
          </div>

          <div className="mt-10">
            <MutantStats />
          </div>
        </section>

        <MutantResultModal
          resultModalRef={resultModalRef}
          isMutant={isMutant}
        />
      </div>
    </main>
  );
}

export default App;
