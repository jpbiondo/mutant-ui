import { mutantExamples } from "../lib/utils/mutant-examples";
import { vectorToMatrixDna } from "../lib/utils/mutant.utils";
import DNAVisualizator from "./ui/DNAVisualizator";

export default function MutantAboutAccordion() {
  const nucleotideItems: { name: string; color: string }[] = [
    { name: "A - Adenine", color: "red" },
    { name: "T - Thymine", color: "blue" },
    { name: "C - Cytosine", color: "green" },
    { name: "G - Guanine", color: "yellow" },
  ];
  return (
    <>
      <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">How it works?</div>
        <div className="collapse-content text-sm">
          <ul className="list-disc ml-6">
            <li>
              A DNA sequence is represented as a string array, where each string
              represents a row of a matrix.
            </li>
            <li className="mt-2">
              Each letter in the strings represents a nucleotide (A, T, C, G).
            </li>
            <li className="mt-2">
              A human is considered a mutant if their DNA contains more than one
              sequence of four identical letters, arranged horizontally,
              vertically, or diagonally.
            </li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-2">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">Color legend</div>
        <div className="collapse-content text-sm">
          <ul>
            {nucleotideItems.map(({ name, color }, index) => (
              <li
                className={`flex items-center gap-2 text-gray-700 ${
                  index > 0 && "mt-2"
                } ml-4`}
              >
                <div
                  className={`w-4 h-4 bg-${color}-100 border-${color}`}
                ></div>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-2">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">Examples</div>
        <div className="collapse-content text-sm">
          <div className="flex flex-col justify-center items-center mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap8">
              {mutantExamples.map((example) => (
                <div className="flex flex-col justify-center items-center gap-4">
                  <DNAVisualizator dnaMatrix={vectorToMatrixDna(example.dna)} />
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
      </div>
    </>
  );
}
