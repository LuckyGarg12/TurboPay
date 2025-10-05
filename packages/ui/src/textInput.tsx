"use client"

export const TextInput = ({
    placeholder,
    onchange,
    label    
}:{
    placeholder: string,
    onchange: (value:string) => void,
    label: string
}) => {
    return(
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={(e) => onchange(e.target.value)} id="first-name" type="text" placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></input>
        </div>
    )
}