"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import axios from "axios";
import NutritionAnalyzerDefault from "@/components/NutritionAnalyzerDefault";

const navigation = [
  {
    title: "Evaluate Your Recent Nutrition",
    icon: "check-circle",
    color: "#FFFFFF",
    url: "https://www.nutritionix.com/",
    bgColor: "#6B7280",
  },
];

const NutritionAnalyzerPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chatId, setChatId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
        const processedConversation = parsedConversation.map((entry: any) => {
          if (entry.role === "user" && entry.parts.length > 1) {
            const textPart = entry.parts.find((part: any) => part.text);
            const filePart = entry.parts.find((part: any) => part.file_data);

            if (filePart && filePart.file_data.file_uri) {
              const gsUri = filePart.file_data.file_uri;
              const publicUrl = gsUri.replace(
                "gs://abbott-diabetes-project-vertex-chat-session-history",
                "https://storage.googleapis.com/abbott-diabetes-project-vertex-chat-session-history"
              );
              return {
                ...entry,
                parts: [{ text: textPart ? textPart.text : "" }],
                image: publicUrl,
              };
            }
          }
          return entry;
        });
        setConversation(processedConversation);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setError("");
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" && !image) return;

    setConversation((prev) => [
      ...prev,
      {
        role: "user",
        parts: [{ text: message }],
        image: imageUrl,
      },
    ]);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", message);
      formData.append("chat_history_id", chatId || "");
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "https://public-multimodal-chat-uzwhzrux7q-uc.a.run.app/nutrition-analyzer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to send message");
      }

      const outputText = response.data.output_text;

      setConversation((prev) => [
        ...prev,
        { role: "model", parts: [{ text: outputText }] },
      ]);

      setMessage("");
      setImage(null);
      setImageUrl(null);
      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleImageRemove = () => {
    setImage(null);
    setImageUrl(null);
  };

  return (
    <Layout>
      <Chat title="Nutrition Analyzer">
        <Answer includeActions={false}>
          <NutritionAnalyzerDefault navigation={navigation} />
        </Answer>
        {error && <div className="error-message">{error}</div>}
        {conversation.map((entry, index) => {
          if (entry.role === "user") {
            return (
              <Question
                key={index}
                content={entry.parts[0].text}
                image={entry.image}
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
        onFileUpload={handleImageUpload}
        onFileRemove={handleImageRemove}
        file={image}
        fileUrl={imageUrl}
        placeholder="Ask about your nutrition..."
      />
    </Layout>
  );
};

const SuspendedNutritionAnalyzerPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <NutritionAnalyzerPage />
  </Suspense>
);

export default SuspendedNutritionAnalyzerPage;
