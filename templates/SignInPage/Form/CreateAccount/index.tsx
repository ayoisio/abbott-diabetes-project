import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter at the top level
import Link from "next/link";
import Field from "@/components/Field";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import setUpUserProfile from "../../Auth/SetupUserProfile";

type CreateAccountProps = {};

const CreateAccount = ({}: CreateAccountProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter at the top level

  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const photoURL = user.photoURL || "";

        console.log("Account creation success:", {
          user,
          firstName,
          lastName,
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
          router.push("/"); // Redirect to home page after successful sign-up
        } catch (profileError) {
          console.error("Error setting up user profile:", profileError);
        }
      }
    } catch (createAccountError) {
      console.error("Error during account creation:", createAccountError);
      if (createAccountError instanceof Error) {
        setError(createAccountError.message);
      } else {
        setError("An unknown error occurred during account creation.");
      }
    }
  };

  return (
    <form onSubmit={handleCreateAccount}>
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="First Name"
        icon="profile"
        type="text"
        value={firstName}
        onChange={(e: any) => setFirstName(e.target.value)}
        required
      />
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Last Name"
        icon="profile"
        type="text"
        value={lastName}
        onChange={(e: any) => setLastName(e.target.value)}
        required
      />
      <Field
        className="mb-4"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Email"
        icon="email"
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-6"
        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button className="btn-blue btn-large w-full mb-6" type="submit">
        Create Account
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="text-center caption1 text-n-4">
        By creating an account, you agree to our{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="https://www.freestyle.abbott/in-en/terms-of-use.html"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          href="https://www.freestyle.abbott/uk-en/legal/privacy-policy.html"
        >
          Privacy & Cookie Statement
        </Link>
        .
      </div>
    </form>
  );
};

export default CreateAccount;
