import { useSelector } from "react-redux";
import Master from "./Subsection/Master";
import Slave from "./Subsection/Slave";
import { RootState } from "../../app/store";
import { selectSlaveId } from "../../features/emails/slaveSlice";

export default function Main() {

    const slaveId = useSelector(selectSlaveId)
    return (
        <main className="flex w-full gap-5">
            <Master />
            {slaveId !== null && <Slave />}
        </main>
    )
}