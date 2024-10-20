import { useDispatch, useSelector } from "react-redux";
import {
  selectEmailBody,
  selectEmailDate,
  selectSlaveId,
  selectFavorite,
  favoriteTheSlave
} from "../../../features/emails/slaveSlice";
import {
  favoriteAnEmail,
  readAnEmail
} from '../../../features/emails/emailSlice'
import { format } from "date-fns";

export default function Slave() {
  const dispatch = useDispatch();
  const emailBody = useSelector(selectEmailBody);
  const emailDate = useSelector(selectEmailDate);
  const slaveId = useSelector(selectSlaveId);
  const favorite = useSelector(selectFavorite)
  const date = new Date(emailDate || Date.now());
  const formattedDate = format(date, "dd/MM/yyyy hh:mma").toLowerCase();

  return (
    <section className="rounded-lg bg-white h-fit py-5 pl-5 pr-10 flex-[2] grid grid-rows-[auto auto] grid-cols-[auto_5fr_1fr] gap-5 border border-blue-800">
      <div className=" justify-self-center w-16 h-16 bg-accent rounded-full aspect-square flex justify-center items-center text-white text-2xl font-semibold">
        <span>F</span>
      </div>
      <div className="row-start-1 col-start-2 col-span-2  row-span-1 flex justify-between ">
        <div className="flex-row">
            <p className=" mb-2">Subject</p>
          <p className="">{formattedDate}</p>
        </div>
        <button
          type="button"
          className=" w-[9rem] h-10 border rounded-full p-1 bg-accent text-white "
          onClick={() => {
            dispatch(favoriteAnEmail({id: slaveId}));
            dispatch(favoriteTheSlave());
          }}
        >
          {favorite? "Favorited": "Mark as favorite"}
          
        </button>
      </div>
      <section
        className="col-start-2 col-span-2"
        dangerouslySetInnerHTML={{ __html: emailBody as string }}
      ></section>
    </section>
  );
}
