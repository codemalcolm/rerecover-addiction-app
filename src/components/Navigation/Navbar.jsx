import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
const Navbar = () => {
  return (
    <div className="text-3xl bg-gradient-to-r from-purple-400 to-purple-700 from-10% via-30% to-90% 
    h-16 flex items-center justify-between">
        <div className="px-3">
            <div className="border rounded-full w-12 h-12 flex items-center justify-center">
                <p className="text-sm">Logo</p>
                {/* <img src="./" alt="" width={50} height={50}/> */}
            </div>
        </div>
        <div className="px-4 ">
            <FontAwesomeIcon icon={faBars} />
        </div>


    </div>
  )
}

export default Navbar