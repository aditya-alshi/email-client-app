import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { selectMetaEmails } from "./features/emails/emailSlice";
import { emailMetaData } from "./utils/persistantStorage";
import { useEffect } from "react";

export default function App() {
  let metaEmails: emailMetaData[] = useSelector(selectMetaEmails);

  useEffect(() => {
    function saveOnTermination() {
      localStorage.setItem("emailsMeta", JSON.stringify(metaEmails));
    }

    window.addEventListener("beforeunload", saveOnTermination);

    return () => {
      window.removeEventListener("beforeunload", saveOnTermination);
    };
  }, [metaEmails]);

  return (
    <div className=" w-[75rem] m-auto mt-6 ">
      <Header />
      <Main />
    </div>
  );
}
