"use client"


import { NAV_ITEMS } from '@/lib/constants'
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
        {NAV_ITEMS.map((item)=>(
            <li key={item.href}>
                <Link href={item.href} className={`hover:text-yellow-500 transition-colors ${isActive(item.href) ? 'text-gray-200' : ''}`}>
                    {item.label}
                </Link>
                
                </li>
               
        ))}
        
        </ul>
  )
}

export default NavItems