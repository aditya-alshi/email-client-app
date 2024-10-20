import { useDispatch, useSelector } from "react-redux";
import {
  readAnEmail,
  selectCurrentPage,
  selectTotalPages,
  setPage,
  emailThunk,
  selectMetaEmails,
} from "../../../features/emails/emailSlice";
import { selectAllEmails } from "../../../features/emails/emailSlice";
import {
  emailBodyThunk,
  removeSlaveId,
  selectSlaveId,
} from "../../../features/emails/slaveSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { format } from "date-fns";
import { selectFilter } from "../../../features/filters/filterSlice";
import { createSelector } from "@reduxjs/toolkit";
import { Email } from "../../../features/emails/emailAPI";

const masterSelector = createSelector(
    (state: RootState) => state.emails.emails,
    (state: RootState) => state.emails.emailMeta,
    (state: RootState) => state.filter.filter,

    (list, localList, filter) => {
        if((!localList || localList.length < 1) && filter === "allMails") {
            return list
        }
    }
)

export default function Master() {

  const list = useSelector(selectAllEmails);
  const localEmailsData = useSelector(selectMetaEmails);
  const slaveId = useSelector(selectSlaveId);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const filter = useSelector(selectFilter);


  const dispatch: AppDispatch = useDispatch();

  const allMails = () => {
    if (localEmailsData && localEmailsData.length > 0) {
      const mergedWithLocal = list.map((mail) => {
        const localMail = localEmailsData.find((lm) => lm.id == mail.id);
        return localMail
          ? { ...localMail, ...mail }
          : { ...mail, read: false, favorite: false };
      });
      return mergedWithLocal;
    }
    return list;
  };


  const renderMails = allMails().map((mail) => {
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
          dispatch(emailBodyThunk({ id: mail.id, date: mail.date }));
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
            <p className="text-accent font-semibold mr-auto ">Favorite</p>
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
