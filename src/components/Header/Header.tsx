import { useDispatch, useSelector } from "react-redux"
import { chageFilter, selectFilter } from "../../features/filters/filterSlice"



export default function Header() {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter)
    return (
        <header >
            <nav className="flex justify-start gap-7 mt-2 items-center" >
                <span>
                    Filter By: 
                </span>
                <ul className=" inline-flex gap-4 hover:*:bg-filterButton *:cursor-pointer *:rounded-xl *:px-3 *:py-1">
                    <li className={`${filter === "allMails" ? "bg-accent text-white": ""}`}
                        onClick={() => {
                            dispatch(chageFilter({filterOption:"allMails"}))
                        }}
                    >All mails</li>
                    <li
                        className={`${filter === "read" ? "bg-accent text-white": ""}`}
                        onClick={() => {
                            dispatch(chageFilter({filterOption:"read"}))
                        }}
                    >Read</li>
                    <li
                        className={`${filter === "unread" ? "bg-accent text-white": ""}`}
                        onClick={() => {
                            dispatch(chageFilter({filterOption:"unread"}))
                        }}
                    >Unread</li>
                    <li
                        className={`${filter === "favorite" ? "bg-accent text-white": ""}`}
                        onClick={() => {
                            dispatch(chageFilter({filterOption:"favorite"}))
                        }}
                    >Favorites</li>
                </ul>
            </nav>
        </header>
    )
}