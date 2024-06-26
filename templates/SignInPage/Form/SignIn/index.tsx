import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter at the top level
import Field from "@/components/Field";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import setUpUserProfile from "../../Auth/SetupUserProfile";

type SignInProps = {
  onClick: () => void;
};

const SignIn = ({ onClick }: SignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter at the top level

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const displayName = user.displayName || "";
        const photoURL = user.photoURL || "";
        const email = user.email || "";

        const [firstName, lastName] = displayName.split(" ");

        console.log("Email/password login success:", {
          user,
          displayName,
          photoURL,
          email,
        });

        try {
          await setUpUserProfile(
            user.uid,
            firstName,
            lastName,
            email,
            photoURL
          );
          console.log("User profile set up successfully");
          router.push("/"); // Redirect to home page after successful sign-in
        } catch (profileError) {
          console.error("Error setting up user profile:", profileError);
        }
      }
    } catch (signInError) {
      console.error("Error during sign-in:", signInError);
      if (signInError instanceof Error) {
        setError(signInError.message);
      } else {
        setError("An unknown error occurred during sign-in.");
      }
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Username or email"
        icon="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-2"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button
        className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
        type="button"
        onClick={onClick}
      >
        Forgot password?
      </button>
      <button className="btn-blue btn-large w-full" type="submit">
        Sign in with FreeStyle
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default SignIn;
