import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Tab } from "@headlessui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import Logo from "@/components/Logo";
import Image from "@/components/Image";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import setUpUserProfile from "../Auth/SetupUserProfile";

const tabNav = ["Sign in", "Create account"];

type FormProps = {};

const Form = ({}: FormProps) => {
  const [forgot, setForgot] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const idToken = credential?.idToken;

      // The signed-in user info.
      const user = result.user;
      const displayName = user?.displayName || "";
      const photoURL = user?.photoURL || "";
      const email = user?.email || "";

      const [firstName, lastName] = displayName.split(" ");

      console.log(`Google login success:`, {
        user,
        token,
        idToken,
        displayName,
        photoURL,
        email,
      });

      // Set up user profile
      try {
        await setUpUserProfile(user.uid, firstName, lastName, email, photoURL);
        console.log("User profile set up successfully");
        router.push("/"); // Redirect to home page after successful Google sign-in
      } catch (error) {
        console.error("Error setting up user profile:", error);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="w-full max-w-[31.5rem] m-auto">
      {forgot ? (
        <ForgotPassword onClick={() => setForgot(false)} />
      ) : (
        <>
          <Logo className="max-w-[11.875rem] mx-auto mb-8" dark={isLightMode} />
          <Tab.Group defaultIndex={0}>
            <Tab.List className="flex mb-8 p-1 bg-n-2 rounded-xl dark:bg-n-7">
              {tabNav.map((button, index) => (
                <Tab
                  className="basis-1/2 h-10 rounded-[0.625rem] base2 font-semibold text-n-4 transition-colors outline-none hover:text-n-7 ui-selected:bg-n-1 ui-selected:text-n-7 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.25rem_0.125rem_#FFFFFF] tap-highlight-color dark:hover:text-n-1 dark:ui-selected:bg-n-6 dark:ui-selected:text-n-1 dark:ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.0625rem_0.125rem_rgba(255,255,255,0.02)]"
                  key={index}
                >
                  {button}
                </Tab>
              ))}
            </Tab.List>
            <button
              className="btn-stroke-light btn-large w-full mb-3"
              onClick={handleGoogleSignIn}
            >
              <Image src="/images/google.svg" width={24} height={24} alt="" />
              <span className="ml-4">Continue with Google</span>
            </button>
            <div className="flex items-center my-8 md:my-4">
              <span className="grow h-0.25 bg-n-4/50"></span>
              <span className="shrink-0 mx-5 text-n-4/50">OR</span>
              <span className="grow h-0.25 bg-n-4/50"></span>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <SignIn onClick={() => setForgot(true)} />
              </Tab.Panel>
              <Tab.Panel>
                <CreateAccount />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </>
      )}
    </div>
  );
};

export default Form;
