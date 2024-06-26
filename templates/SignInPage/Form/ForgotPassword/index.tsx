import { useState } from "react";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

type ForgotPasswordProps = {
  onClick: () => void;
};

const ForgotPassword = ({ onClick }: ForgotPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      console.error("Error during password reset:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred during password reset.");
      }
    }
  };

  return (
    <>
      <button className="group flex items-center mb-8 h5" onClick={onClick}>
        <Icon
          className="mr-4 transition-transform group-hover:-translate-x-1 dark:fill-n-1"
          name="arrow-prev"
        />
        Reset your password
      </button>
      <form onSubmit={handlePasswordReset}>
        <Field
          className="mb-6"
          classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Email"
          icon="email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
        />
        <button className="btn-blue btn-large w-full mb-6" type="submit">
          Reset password
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default ForgotPassword;
