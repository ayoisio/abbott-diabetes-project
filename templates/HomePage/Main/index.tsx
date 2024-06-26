import { useState, useEffect } from "react";
import Message from "@/components/Message";
import Menu from "@/components/Menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { navigation } from "@/constants/navigation";

type MainProps = {};

const Main = ({}: MainProps) => {
  const [message, setMessage] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("Good day!");
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const firstName = userData.firstName || "";
          const lastName = userData.lastName || "";
          const fullName = `${firstName} ${lastName}`.trim() || "!";

          setDisplayName(fullName);

          const hours = new Date().getHours();
          if (hours < 12) {
            setGreeting(`Good morning, ${fullName}`);
          } else if (hours < 18) {
            setGreeting(`Good afternoon, ${fullName}`);
          } else {
            setGreeting(`Good evening, ${fullName}`);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
        <div className="mb-10 text-center">
          <div className="h3 leading-[4rem] 2xl:mb-2 2xl:h4">{greeting}</div>
          <div className="body1 text-n-4 2xl:body1S">
            Turn your Abbott CGM data into a conversation.
          </div>
        </div>
        <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
      </div>
      <Message
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
      />
    </>
  );
};

export default Main;
