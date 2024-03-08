import React from 'react'

const Footer = () => {
    return (
        <>

            <footer className="bg-[#1D2021] flex-shrink-0 flex justify-center w-full pt-4 h-[72px] text-gray-300 ">
                <div className="flex items-center">
                    <img
                        className="h-8 w-8 bg-b"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                    />
                    <p className="ml-2">© 2024 Authentication, Inc.</p>
                </div>
            </footer>

        </>
    )
}

export default Footer