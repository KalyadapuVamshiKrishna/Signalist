"use client"


import { NAV_ITEMs } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'


const NavItems = () => {
    const pathname = usePathname()
;

const isActive = (path:string) => {
    if (path==='/'){
        return pathname ==='/'
    }
    return pathname?.startsWith(path)
}
  return (
    <ul className="flex space-x-6 sm:flex-row p-2 gap-3 sm:gap-10 font-medium text-gray-500">
        {NAV_ITEMs.map((item)=>(
            <li key={item.href}>
                <Link href={item.href} className={`hover:text-yellow-500 transition-colors ${isActive(item.href) ? 'text-gray-200' : ''}`}>
                    {item.title}
                </Link>
                
                </li>
               
        ))}
        
        </ul>
  )
}

export default NavItems