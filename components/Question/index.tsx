import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Image from "@/components/Image";
import Document from "./Document";

type QuestionProps = {
  content: any;
  image?: string;
  document?: string;
  time: string;
};

const Question = ({ content, image, document, time }: QuestionProps) => {
  const [userPhotoURL, setUserPhotoURL] = useState<string>(
    "/images/light-blue-circle.png"
  );

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.photoURL) {
      setUserPhotoURL(user.photoURL);
    }
  }, []);

  return (
    <div className="max-w-[50rem] ml-auto">
      <div className="space-y-6 pt-6 px-6 pb-16 border-3 border-n-2 rounded-[1.25rem] md:p-5 md:pb-14 dark:border-transparent dark:bg-n-5/50">
        {document && <Document value={document} />}
        <div className="">{content}</div>
        {image && (
          <div className="relative w-[11.25rem] h-[11.25rem]">
            <img className="rounded-xl object-cover" src={image} alt="Avatar" />
          </div>
        )}
      </div>
      <div className="-mt-8 flex items-end pr-6">
        <div className="pb-0.5 caption1 text-n-4/50 dark:text-n-4">{time}</div>
        <div className="relative w-16 h-16 ml-auto rounded-2xl overflow-hidden shadow-[0_0_0_0.25rem_#FEFEFE] dark:shadow-[0_0_0_0.25rem_#232627]">
          <img className="object-cover" src={userPhotoURL} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Question;
