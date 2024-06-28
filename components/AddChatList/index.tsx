import { useState, useEffect } from "react";
import Field from "@/components/Field";
import Select from "@/components/Select";
import MultiSelect from "@/components/MultiSelect";
import User from "./User";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { people } from "@/mocks/people";

const colors = [
  {
    id: "0",
    title: "Chinese Violet",
    color: "#8C6584",
  },
  {
    id: "1",
    title: "Dodger blue",
    color: "#3E90F0",
  },
  {
    id: "2",
    title: "Golden Gate Bridge",
    color: "#D84C10",
  },
  {
    id: "3",
    title: "Veronica",
    color: "#8E55EA",
  },
  {
    id: "4",
    title: "Sugus green",
    color: "#7ECE18",
  },
];

const typesAccess = [
  {
    id: "0",
    title: "Full access",
  },
  {
    id: "1",
    title: "Can view",
  },
  {
    id: "2",
    title: "Can start chat",
  },
];

type AddChatListProps = {
  onCancel?: () => void;
};

const AddChatList = ({ onCancel }: AddChatListProps) => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<any>(colors[1]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [typeAccess, setTypeAccess] = useState<any>(typesAccess[1]);
  const [currentUser, setCurrentUser] = useState<any>({
    id: "0",
    name: "Janiya (you)",
    avatar: "/images/light-blue-circle.png",
    status: "Full access",
  });

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
          const photoURL = userData.photoURL || "/images/light-blue-circle.png";
          const fullName = `${firstName} ${lastName}`.trim();

          setCurrentUser({
            id: "0",
            name: `${firstName} (you)`,
            avatar: photoURL,
            status: "Full access",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-12 lg:px-8 md:pt-6 md:px-5 md:pb-6">
      <div className="mb-8 h4">Add chat list</div>
      <div className="relative z-10 flex mb-8 md:block">
        <Field
          className="grow mr-3 md:mr-0 md:mb-3"
          label="Name"
          placeholder="Name"
          icon="chat-1"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
        <Select
          label="Color"
          className="shrink-0 min-w-[14.5rem]"
          items={colors}
          value={color}
          onChange={setColor}
        />
      </div>
      <div className="flex mb-2 base2 font-semibold">Invite team member</div>
      <div className="mb-8 p-5 border border-n-3 rounded-xl md:p-0 md:border-none dark:border-n-5">
        <div className="relative z-5">
          <MultiSelect
            className="mb-4"
            classMultiSelectGlobal="multiselect-access"
            items={people}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <Select
            className="!absolute top-1/2 right-4 -translate-y-1/2"
            classButton="h-auto px-0 !shadow-none caption1 font-semibold"
            classOptions="mt-5 left-auto -right-4 w-[10.125rem]"
            classOption="items-end caption1 font-semibold"
            items={typesAccess}
            value={typeAccess}
            onChange={setTypeAccess}
          />
        </div>
        <div className="mb-5 caption1 text-n-4/50">
          Only people invited in this list can access
        </div>
        <User item={currentUser} key={currentUser.id} />
      </div>
      <div className="flex justify-end">
        <button className="btn-stroke-light mr-3" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-blue">Add list</button>
      </div>
    </div>
  );
};

export default AddChatList;
