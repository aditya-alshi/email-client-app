export default function Header() {
    return (
        <header >
            <nav className="flex justify-start gap-7 mt-2 items-center" >
                <span>
                    Filter By: 
                </span>
                <ul className=" inline-flex gap-4 hover:*:bg-filterButton *:cursor-pointer *:rounded-xl *:px-3 *:py-1">
                    <li className=" ">All mails</li>
                    <li>Favorites</li>
                </ul>
            </nav>
        </header>
    )
}