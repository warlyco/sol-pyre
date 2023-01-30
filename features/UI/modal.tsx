import { XCircleIcon } from "@heroicons/react/24/outline";

export interface Props {
  setModal: (modal: React.ReactNode | undefined) => void;
  children: React.ReactNode;
}

export default function Modal({ setModal, children }: Props) {
  return (
    <div className="flex flex-wrap justify-around overflow-y-auto relative">
      <div className="sticky flex w-full justify-end">
        <button
          className="self-end text-2xl"
          onClick={() => setModal(undefined)}
        >
          <XCircleIcon className="h-8 w-8" />
        </button>
      </div>
      {children}
    </div>
  );
}
