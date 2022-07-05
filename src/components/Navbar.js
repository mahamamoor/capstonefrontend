import { useState, useEffect } from 'react'
import Add from './Add.js'
import Edit from './Edit.js'
import Order from './Orders.js'
import Report from './Reports.js'
import Services from './Services.js'

const Navbar = () => {
  return(
    <>
    <nav class="flex items-center justify-between flex-wrap bg-green-900 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"></svg>
      <img className="object-scale-down h-10 w-10 rounded border shadow-sm max-w-max h-full" src="https://imgur.com/gbxt4aZ.jpg"/>
      <span class="font-semibold text-xl tracking-tight pl-2">Oakdale Industries</span>
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-slate-50 border-slate-50 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href={Order} class="block mt-4 lg:inline-block lg:mt-0 text-slate-50 hover:text-white mr-4">
          Orders
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-slate-50 hover:text-white mr-4">
          Reports
        </a>
        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-slate-50 hover:text-white">
          Services
        </a>
      </div>
    </div>
  </nav>
    </>
  )
}

export default Navbar
