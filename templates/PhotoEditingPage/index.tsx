"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Photo from "@/components/Photo";

const PhotoEditingPage = () => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    // Handle the send message action here
    console.log("Message sent:", message);
    // Clear the message input after sending
    setMessage("");
  };

  return (
    <Layout>
      <Chat title="Track Blood Sugar">
        <Question
          content="Retouch this photo"
          time="Just now"
          image="/images/photo.jpg"
        />
        <Answer loading />
        <Answer time="Just now">
          <Photo
            image="/images/photo-1.jpg"
            content="I have implemented modifications to the lighting, color, and sharpness parameters, resulting in the elimination of blemishes and imperfections present in the image."
          />
        </Answer>
        <Question
          content="Looks great, let’s remove text on hoodie and make it blue"
          time="Just now"
        />
        <Answer time="Just now">
          <Photo
            image="/images/photo-2.jpg"
            content="You can adjust the color of hoodie manually"
            colorPicker
          />
        </Answer>
        <Answer time="Just now">
          <Photo image="/images/photo-3.jpg" content="Variation one" />
        </Answer>
      </Chat>
      <Message
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </Layout>
  );
};

export default PhotoEditingPage;
