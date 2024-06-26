"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import axios from "axios";
import BuildDietPlanDefault from "@/components/NutritionAnalyzerDefault";

const navigation = [
  {
    title: "Low Glycemic Menu Options",
    icon: "check-circle",
    color: "#FFFFFF",
    url: "https://www.delish.com/cooking/recipe-ideas/g3593/low-carb-recipes/?utm_source=google&utm_medium=cpc&utm_campaign=mgu_ga_del_d_bm_prog_org_us_g3593&gad_source=1&gclid=CjwKCAjw-O6zBhASEiwAOHeGxXha36jtdzU5wkNspYM8OJLZ_OSvljFfUx0YR0Prcz94mG5e86x5sBoCRSsQAvD_BwE",
    bgColor: "#6B7280",
  },
];

const BuildDietPlanPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chatId, setChatId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const chatIdParam = searchParams.get("chatId");
    if (chatIdParam) {
      setChatId(chatIdParam);
      fetchConversation(chatIdParam);
    }
  }, [searchParams]);

  const fetchConversation = async (chatId: string) => {
    try {
      const response = await axios.post(
        "https://public-multimodal-chat-uzwhzrux7q-uc.a.run.app/chat-data",
        {
          bucket_name: "abbott-diabetes-project-vertex-chat-session-history",
          chat_id: chatId,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch conversation data");
      }

      const parsedConversation = response.data;
      if (parsedConversation.length === 0) {
        console.log("No conversation data found");
      } else {
        setConversation(parsedConversation);
      }
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setError(null);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Append the new question
    setConversation((prev) => [
      ...prev,
      { role: "user", parts: [{ text: message }] },
    ]);

    // Set loading state to true
    setLoading(true);

    try {
      const response = await axios.post(
        "https://public-multimodal-chat-uzwhzrux7q-uc.a.run.app/build-diet-plan",
        {
          text: message,
          chat_history_id: chatId,
        }
      );

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to send message");
      }

      const outputText = response.data.output_text;

      // Append the new answer
      setConversation((prev) => [
        ...prev,
        { role: "model", parts: [{ text: outputText }] },
      ]);

      // Clear the message input
      setMessage("");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again later.");
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Chat title="Build Diet Plan">
        <Answer includeActions={false}>
          <BuildDietPlanDefault navigation={navigation} />
        </Answer>
        {error && <div className="error-message">{error}</div>}
        {conversation.map((entry, index) => {
          if (entry.role === "user" && entry.parts[0].text) {
            return (
              <Question
                key={index}
                content={entry.parts[0].text}
                time="Just now"
              />
            );
          } else if (entry.role === "model" && entry.parts[0].text) {
            return (
              <Answer key={index} time="Just now">
                {entry.parts[0].text}
              </Answer>
            );
          }
          return null;
        })}
        {loading && <Answer loading />}
      </Chat>
      <Message
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </Layout>
  );
};

const SuspendedBuildDietPlanPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BuildDietPlanPage />
  </Suspense>
);

export default SuspendedBuildDietPlanPage;
