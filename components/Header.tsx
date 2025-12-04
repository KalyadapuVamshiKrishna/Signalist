<<<<<<< HEAD
import Link from "next/link"
import Image from "next/image"
import NavItems from "./NavItems"
import UserDropdown from "./UserDropdown"


const Header = () => {
  return (
  <header className="sticky top-0 header">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center header-wrapper">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        <Image src="/assets/icons/logo.svg" alt="Logo" width={150} height={50} className="h-8 w-auto  cursor-pointer"/>
                </Link>
            <nav className="hidden sm:block">
                <NavItems/>
            </nav>
            <UserDropdown/>
            </div>
    </header>
  )
}

export default Header
=======
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import {searchStocks} from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Signalist logo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    )
}
export default Header
>>>>>>> new-version
