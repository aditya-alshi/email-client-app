import { useDispatch, useSelector } from "react-redux";
import {
  readAnEmail,
  selectCurrentPage,
  selectTotalPages,
  setPage,
  emailThunk,
} from "../../../features/emails/emailSlice";
import {
  emailBodyThunk,
  removeSlaveId,
  selectSlaveId,
} from "../../../features/emails/slaveSlice";
import { emailMetaData } from "../../../utils/persistantStorage";
import { AppDispatch, RootState } from "../../../app/store";
import { format } from "date-fns";
import { createSelector } from "@reduxjs/toolkit";
import { Email } from "../../../features/emails/emailAPI";

// the masterSelector
// get the email list, emailMeta, and filter. And produce a final array for emails.
const masterSelector = createSelector(
  (state: RootState) => state.emails.emails, // All original emails
  (state: RootState) => state.emails.emailMeta, // the meta stored in the local storage (see the emailSlice for logic about emailMeta)
  (state: RootState) => state.filter.filter, // The filter

  (list, localList, filter) => {
    if (!localList || localList.length === 0) return list; // if there is no local storage yet. Just return the list

    // Filter based on the current filter
    // The idea here is to filter out the Local storage meta
    // And then get the final result of the filter and store it in some variable
    // now get that new filtered data and merge it with the original list of mail.
    // So basically you just check if the current orginal mail Id exist in that filtered resulted local
    // storage mail ids

    // So this localListTemp is that 'some variable' discussed above
    const localListTemp = (() => {
      // A simple switch logic
      switch (filter) {
        // For favorite and read the logic is straight forward.
        case "favorite":
          return localList.filter((mail) => mail.favorite === true);
        case "read":
          return localList.filter((mail) => mail.read === true);
        case "unread":
          // For unread mails we will loop through the original mail array itself
          // We will use .reduce for this. the accumulator will be an array. Which will contain
          // the array of ids [{id: 1}, {id : 6}]
          // So to filter out the unread mail, which basically means
          // grab each mail from original list and check in the localList(original not localListTemp)
          // if the id exist there somewhere
          // if not push it to the localListTemp.
          // the localList keeps account of read mail. so if the mail id is not present in the localList, it's not read.
          return list.reduce((acc: emailMetaData[], current) => {
            const unreadId = localList.every((mail) => mail.id != current.id); // .every is used
            if (unreadId) {
              typeof current.id === "string"
                ? acc.push({ id: parseInt(current.id) })
                : acc.push({ id: current.id });
            }
            return acc;
          }, []);
        default:
          return localList; // this say if the filter is anything else("all mails") return the origianl localList
      }
    })();

    if (localListTemp.length === 0) return []; // this handle if the the filter is selected but
    // There is no single id present for it in the localStorage. 
    // For example if not a single mail is favorited, then upon clicking the favorite filter, an empty array will be returned. 

    // When the LocalListTemp is not empty (Either read or favorited or unread ids are present or 
    // the all mail is selected which means now the localListTemp is mirror reflection of the original localList),
    // Merge with original `list` based on matching `id`s

    const mergedWithLocal = () => {

      // So there are two situations to handle here.
      // 1. all mails
      // 2. Filtered

      // If "allMails" are selected, then we want to merge not just the correct localListTemp individual mail,
      // But also the remaining mails too. So basically, obviously 'all mails'
      const allMails = list.map((mail) => {
        const localMail = localListTemp.find((lm) => lm.id == mail.id);
        return localMail ? { ...localMail, ...mail } : { ...mail };
      });

      // if 'some filter is there', then we specifically want just the filtered one.
      // reject all rest of the mails from the original list
      const filteredMails = list.reduce((acc, mail) => {
        const localMail = localListTemp.find((lm) => lm.id == mail.id);
        if (localMail) {
          acc.push({ ...localMail, ...mail }); 
        }
        return acc;
      }, [] as typeof list);
      return filter === "allMails" ? allMails : filteredMails; // and we return the result out of the filter is "all mail" or not.
    };
    return mergedWithLocal() as Email[]; // Final result is one of , empty/allmails/filtered
  }
);

export default function Master() {
  const master = useSelector(masterSelector);
  const slaveId = useSelector(selectSlaveId);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const dispatch: AppDispatch = useDispatch();

  const renderMails = master.map((mail) => {
    const date = new Date(mail.date || Date.now());
    const formattedDate = format(date, "dd/MM/yyyy hh:mma").toLowerCase();
    return (
      <div
        className={`text-sm flex gap-5 border-2 ${
          slaveId === mail.id ? " border-accent" : "border"
        } hover:border-accent px-5 py-2 mb-5 rounded-lg cursor-pointer ${
          mail.read ? "bg-readBackground" : "bg-white"
        }`}
        key={mail.id}
        onClick={(e) => {
          dispatch(readAnEmail({ id: mail.id, read: true }));
          dispatch(
            emailBodyThunk({
              id: mail.id,
              date: mail.date,
              favorite: mail.favorite || false,
            })
          );
        }}
      >
        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-accent text-white text-2xl font-semibold aspect-square">
          <p className="">{mail.from.name.at(0)}</p>
        </div>
        <div className="w-full text-sm">
          <p
            className={`truncate ${
              slaveId !== null ? "max-w-[300px]" : "w-full"
            }`}
          >
            From: {`${mail.from.name}`} <b>{`<${mail.from.email}>`}</b>
          </p>
          <p
            className={`truncate ${
              slaveId !== null ? "max-w-[300px]" : "w-full"
            }`}
          >
            Subject : {mail.subject}
          </p>
          <p
            className={` mt-2 truncate ${
              slaveId !== null ? "max-w-[300px]" : "w-full"
            }`}
          >
            {mail.short_description}
          </p>
          <div className="mt-2 flex ">
            <p
              className={`truncate ${
                slaveId !== null ? "max-w-[300px]" : ""
              } mr-5`}
            >
              {formattedDate}
            </p>
            <p className="text-accent font-semibold mr-auto ">
              {mail.favorite ? "Favorite" : ""}
            </p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <section className="flex-[1] min-w-[400px] ">
      {renderMails}
      <div className="bg-slate-300 flex gap-3 justify-center px-5">
        <button
          className="bg-accent p-2 border-text text-white cursor-pointer hover:border-text-500  disabled:bg-text"
          onClick={() => {
            dispatch(emailThunk(1));
            dispatch(setPage(1));
            dispatch(removeSlaveId());
          }}
          disabled={currentPage === 1}
        >
          1
        </button>
        <button
          className="bg-accent p-2 text-white cursor-pointer disabled:bg-text"
          onClick={() => {
            dispatch(emailThunk(2));
            dispatch(setPage(2));
            dispatch(removeSlaveId());
          }}
          disabled={currentPage === totalPages}
        >
          2
        </button>
      </div>
    </section>
  );
}
