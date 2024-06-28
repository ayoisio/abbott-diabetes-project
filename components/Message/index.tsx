import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
  useEffect,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import Icon from "@/components/Icon";
import AddFile from "./AddFile";
import Files from "./Files";

type MessageProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  file?: File | null;
  fileUrl?: string | null;
  onSend: () => void;
  onFileUpload?: (file: File) => void;
  onFileRemove?: () => void;
};

const Message: React.FC<MessageProps> = ({
  value,
  onChange,
  placeholder,
  file,
  fileUrl,
  onSend,
  onFileUpload,
  onFileRemove,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const stylesButton = "group absolute right-3 bottom-2 w-10 h-10";

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
      setInputValue("");
    }
  };

  const handleFileChange = (file: File) => {
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const isVideo = file && file.type.startsWith("video/");

  return (
    <div className="relative z-5 px-10 pb-6 before:absolute before:-top-6 before:left-0 before:right-6 before:bottom-1/2 before:bg-gradient-to-b before:to-n-1 before:from-n-1/0 before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
      <div className="relative z-2 border-2 border-n-3 rounded-xl overflow-hidden dark:border-n-5">
        {fileUrl && (
          <div className="relative">
            {isVideo ? (
              <video src={fileUrl} controls className="max-w-full h-auto" />
            ) : (
              <Files fileUrl={fileUrl} onRemove={onFileRemove} />
            )}
          </div>
        )}
        <div className="relative flex items-center min-h-[3.5rem] px-16 text-0">
          <AddFile onFileSelect={handleFileChange} />
          <TextareaAutosize
            className="w-full py-3 bg-transparent body2 text-n-7 outline-none resize-none placeholder:text-n-4/75 dark:text-n-1 dark:placeholder:text-n-4"
            maxRows={5}
            autoFocus
            value={inputValue}
            onChange={(e) => {
              onChange(e);
              setInputValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ask FreeStyle anything"}
          />
          {inputValue === "" ? (
            <button className={stylesButton}>
              <Icon
                className="fill-n-4 transition-colors group-hover:fill-primary-1"
                name="recording"
              />
            </button>
          ) : (
            <button
              className={`${stylesButton} bg-primary-1 rounded-xl transition-colors hover:bg-primary-1/90`}
              onClick={() => {
                onSend();
                setInputValue("");
              }}
            >
              <Icon className="fill-n-1" name="arrow-up" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
