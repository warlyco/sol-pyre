import classNames from "classnames";
import ScrollLock from "react-scrolllock";

type Props = {
  onClick?: () => void;
  isVisible: boolean;
  modal?: React.ReactNode;
};

const Overlay = ({ onClick, isVisible, modal }: Props) => {
  return (
    <>
      <ScrollLock isActive={isVisible}>
        <div
          onClick={onClick}
          className={classNames({
            "absolute top-0 right-0 bottom-0 left-0 -mr-8 transition-all duration-500 ease-in-out bg-opaque bg-black py-6 z-50 min-h-0":
              isVisible,
            "opacity-0 pointer-events-none": !isVisible,
          })}
        >
          {!!modal && (
            <div className="bg-narentines-amber-200 m-auto fixed top-1/2 left-1/2 centered p-6 rounded-xl shadow-deep-float max-w-[95vw] max-h-[95vh] overflow-y-auto min-w-[95vw] sm:min-w-[600px] scroll-mobile">
              {modal}
            </div>
          )}
        </div>
      </ScrollLock>
      <style>
        {`
          .scroll-mobile {
            -webkit-overflow-scrolling: touch
          }
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
