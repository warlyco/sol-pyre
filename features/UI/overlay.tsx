import classNames from "classnames";
import Spinner from "features/UI/spinner";
import { useIsLoading } from "hooks/is-loading";
import ScrollLock from "react-scrolllock";
// import { ModalTypes } from "types";

type Props = {
  onClick?: () => void;
  isVisible: boolean;
  // modalType?: ModalTypes;
};

const Overlay = ({ onClick, isVisible }: Props) => {
  const { loadingMessage, setLoadingMessage } = useIsLoading();

  return (
    <>
      <ScrollLock isActive={isVisible}>
        <div
          onClick={onClick}
          className={classNames({
            "absolute top-0 right-0 bottom-0 left-0 transition-all duration-500 ease-in-out bg-opaque bg-black py-6 z-50":
              isVisible,
            "opacity-0 pointer-events-none": !isVisible,
          })}
        >
          {!!loadingMessage?.length && (
            <div className="bg-stone-600 m-auto fixed top-1/2 left-1/2 centered p-6 rounded-xl">
              <div className="text-center flex flex-col items-center justify-center">
                <div className="font-medium text-2xl">{loadingMessage}</div>
                <div className="py-6 italic">
                  Please do not close this window
                </div>
                <div>
                  <Spinner />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollLock>
      <style>
        {`
          .bg-opaque {
            background-color: rgba(0,0,0,0.6);
          }
          .centered {
            transform: translate(-50%, -50%);

          }
        `}
      </style>
    </>
  );
};

export default Overlay;
