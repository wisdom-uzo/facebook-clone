function HeaderIcon({Icon, active}) {
    return (
        <div className="cursor-pointer md:px-8 
        sm:h-14 md:hover:bg-gray-100 rounded-xl 
        active:border-blue-500 active:border-b-2
        flex items-center group">
             <Icon className={`
             ${active && `text-blue-500`}
             text-gray-500 sm:h-7 mx-auto h-5 
             group-hover:text-blue-500 text-center`}/>
        </div>
    )
}

export default HeaderIcon
