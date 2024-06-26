import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

type AudioPlayerProps = {
  edit?: boolean;
  onSave?: () => void;
};

const AudioPlayer = ({ edit, onSave }: AudioPlayerProps) => {
  const [active, setActive] = useState<boolean>(true);

  return (
    <div className="">
      <div
        className={twMerge(
          `border-2 border-transparent rounded-xl overflow-hidden bg-n-1 dark:bg-n-6 ${
            edit && "border-primary-1"
          }`
        )}
      >
        <div className="flex items-center px-3.5 py-2.5">
          <button
            className="shrink-0 w-8 h-8 bg-n-7 rounded-full text-0 dark:bg-n-1"
            onClick={() => setActive(!active)}
          >
            <Icon
              className="w-3 h-3 fill-n-1 dark:fill-n-7"
              name={active ? "pause" : "play"}
            />
          </button>
          <div className="grow ml-3 text-0">
            <Image
              className="w-full"
              src={edit ? "/images/audio-edited.svg" : "/images/audio.svg"}
              width={532}
              height={39}
              alt="Audio"
            />
          </div>
        </div>
        {edit && (
          <>
            <div className="p-3.5 border-t border-n-3 dark:border-n-5">
              <span className="bg-primary-1 text-n-1">
                Introducing &quot;FreeStyle&quot;, a comprehensive diabetes
                management tool that can turn your Abbott CGM and Fitbit data
                into actionable insights.
              </span>{" "}
              Using advanced real-time data analysis and personalized
              recommendations, FreeStyle helps you monitor your blood sugar
              levels, analyze your nutrition, and track your physical activity
              with ease. Create personalized meal plans, get instant answers to
              your diabetes-related questions, and access best practices for
              managing your diabetes daily. With FreeStyle, managing your
              diabetes has never been easier or more efficient.
            </div>
            <div className="flex justify-between items-center px-3.5 pt-3.5 pb-2.5 border-t border-n-3 dark:border-n-5">
              <div className="caption1 text-n-4/75">609 characters</div>
              <button className="btn-blue btn-medium" onClick={onSave}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between mt-2 caption2 text-n-4">
        <div>0:21</div>
        <div>1:02</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
