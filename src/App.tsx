import {
  Atom,
  ChartLine,
  Construction,
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
import { useMutantStats } from "./hooks/useMutantStats";
import DNAStats from "./components/ui/DNAStats";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [dnaInput, setDnaInput] = useState<string>("");
  const [manualInputTab, setManualInputTab] = useState<boolean>(true);
  const [dnaMatrix, setDnaMatrix] = useState<string[][]>([]);
  const resultModalRef = useRef<HTMLDialogElement | null>(null);
  const { isMutant, pending, error, testDna } = useMutant();
  const {
    totalHumanCount,
    totalMutantCount,
    pending: pendingStats,
    error: errorStats,
    getStats,
  } = useMutantStats();

  useEffect(() => {
    if (dnaInput) {
      const matrixDna: string[][] = vectorToMatrixDna(dnaInput.split("\n"));
      setDnaMatrix(matrixDna);
      return;
    }

    setDnaMatrix([]);
  }, [dnaInput]);

  useEffect(() => {
    getStats();
  }, [getStats]);

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

  const nucleotideItems: { name: string; color: string }[] = [
    { name: "A - Adenine", color: "red" },
    { name: "T - Thymine", color: "blue" },
    { name: "C - Cytosine", color: "green" },
    { name: "G - Guanine", color: "yellow" },
  ];

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

            <div className="mt-4">
              <h3 className="text-lg font-medium text-black">How it works</h3>
              <ul className="list-disc ml-6">
                <li className="mt-2">
                  A DNA sequence is represented as a string array, where each
                  string represents a row of a matrix.
                </li>
                <li className="mt-2">
                  Each letter in the strings represents a nucleotide (A, T, C,
                  G).
                </li>
                <li className="mt-2">
                  A human is considered a mutant if their DNA contains more than
                  one sequence of four identical letters, arranged horizontally,
                  vertically, or diagonally.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-black">Color legend</h3>
            <ul>
              {nucleotideItems.map(({ name, color }) => (
                <li className="flex items-center gap-2 text-gray-700 mt-2 ml-4">
                  <div
                    className={`w-4 h-4 bg-${color}-100 border-${color}`}
                  ></div>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-black">Examples</h3>
            <div className="flex flex-col justify-center items-center mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap8">
                {mutantExamples.map((example) => (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <DNAVisualizator
                      dnaMatrix={vectorToMatrixDna(example.dna)}
                    />
                    {example.isMutant ? (
                      <div className="badge badge-error">
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <rect
                              x="1.972"
                              y="11"
                              width="20.056"
                              height="2"
                              transform="translate(-4.971 12) rotate(-45)"
                              fill="currentColor"
                              strokeWidth={0}
                            ></rect>
                            <path
                              d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                              strokeWidth={0}
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                        Human
                      </div>
                    ) : (
                      <div className="badge badge-success">
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="currentColor"
                            strokeLinejoin="miter"
                            strokeLinecap="butt"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></circle>
                            <polyline
                              points="7 13 10 16 17 8"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></polyline>
                          </g>
                        </svg>
                        Mutant
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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

          <div className="mt-4 flex flex-col-reverse gap-8">
            <div className="w-72 h-72 mx-auto">
              <DNAStats
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
            <div className=" flex-1 gap-4 text-center">
              <div>
                <h2 className="text-2xl">Total DNA Tests</h2>
                <span className="text-6xl font-semibold">
                  {totalHumanCount + totalMutantCount}
                </span>
              </div>
              <div className="flex flex-row gap-4 justify-center mt-4">
                <div>
                  <h2>Human DNA Results</h2>
                  <span className="text-4xl font-semibold">
                    {" "}
                    {totalHumanCount}
                  </span>
                </div>
                <div>
                  <h2>Mutant DNA Results</h2>
                  <span className="text-4xl font-semibold">
                    {" "}
                    {totalMutantCount}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-2 items-center justify-center">
              <Construction className="h-12 w-12" />
              <h2 className="text-xl font-semibold">Cooming soon...</h2>
            </div> */}
          </div>
        </section>

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
      </div>
    </main>
  );
}

export default App;
