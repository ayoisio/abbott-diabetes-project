import { getAuth, onAuthStateChanged } from "firebase/auth";

const defaultAvatar = "/images/avatar.jpg";

const getUserPhotoURL = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && user.photoURL) {
    return user.photoURL;
  }

  return defaultAvatar;
};

interface ChatHistoryItem {
  id: string;
  title: string;
  content: string;
  users: string[];
  time: string;
  url: string;
  image?: string;
}

export const fetchChatHistory = async (): Promise<ChatHistoryItem[]> => {
  const userPhotoURL = await getUserPhotoURL();

  return [
    {
      id: "0",
      title: "Morning Blood Sugar Check",
      content:
        "My fasting blood sugar was 90 mg/dL this morning. Is this within the normal range?",
      users: [userPhotoURL],
      time: "Just now",
      url: "/#",
    },
    {
      id: "1",
      title: "Post-Meal Spike",
      content:
        "I noticed a spike in my blood sugar levels 2 hours after lunch. What could be causing this?",
      image: "/images/food/pexels-enginakyurt-1437267.jpg",
      users: [userPhotoURL],
      time: "5 minutes ago",
      url: "/#",
    },
    {
      id: "2",
      title: "Healthy Snack Ideas",
      content:
        "Can anyone recommend some healthy snacks that won't cause a big increase in blood sugar?",
      users: [userPhotoURL, "/images/avatar-1.jpg", "/images/avatar-2.jpg"],
      time: "10 minutes ago",
      url: "/#",
    },
    {
      id: "3",
      title: "Evening Walk",
      content:
        "Went for a 30-minute walk after dinner and my blood sugar levels improved. Does anyone else find exercise helps manage their levels?",
      users: [userPhotoURL],
      time: "15 minutes ago",
      url: "/#",
    },
    {
      id: "4",
      title: "Medication Timing",
      content:
        "Should I take my medication before or after meals for better effectiveness?",
      users: [userPhotoURL],
      time: "20 minutes ago",
      url: "/#",
    },
    {
      id: "5",
      title: "Doctor's Advice Needed",
      content:
        "I'm experiencing frequent low blood sugar episodes. What adjustments should I make?",
      users: [userPhotoURL],
      time: "30 minutes ago",
      url: "/#",
    },
    {
      id: "6",
      title: "Support and Encouragement",
      content:
        "Feeling a bit overwhelmed managing my diabetes. Any tips or words of encouragement?",
      users: [userPhotoURL, "/images/avatar-1.jpg", "/images/avatar-2.jpg"],
      time: "45 minutes ago",
      url: "/#",
    },
    {
      id: "7",
      title: "Creating a New Topic",
      content:
        "Started a new discussion on managing diabetes during travel. Join in!",
      users: [userPhotoURL],
      time: "1 hour ago",
      url: "/#",
    },
  ];
};
