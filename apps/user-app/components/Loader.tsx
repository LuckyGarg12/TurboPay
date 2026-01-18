export const Loader = () => {
    return (
        <div className="flex justify-center flex-col h-screen w-screen top-0 left-0 fixed">
            <div className="flex justify-center">
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-bounce [animation-delay:.7s]"></div>
                </div>
            </div>
        </div>
    )
}