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