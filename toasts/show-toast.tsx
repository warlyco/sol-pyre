import toast from "react-hot-toast";
import { AppError, ToastLink } from "types/types";

const showToast = ({
  primaryMessage,
  secondaryMessage,
  link,
  error,
}: {
  primaryMessage: string;
  secondaryMessage?: string;
  link?: ToastLink;
  error?: AppError;
}) => {
  toast.custom(
    <div className="flex flex-col bg-narentines-green-100 rounded-xl text-xl shadow-deep-float p-4 max-w-sm text-center text-narentines-amber-200">
      <div className="text-stone-800">{primaryMessage}</div>
      {secondaryMessage && <div>{secondaryMessage}</div>}
      {link && (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {link.title}
        </a>
      )}
      {error && (
        <div className="text-sm font-bold text-red-600">
          Error Code {error.code}
        </div>
      )}
    </div>
  );
};

export default showToast;
