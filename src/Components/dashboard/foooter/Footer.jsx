import React from 'react'

const Footer = () => {
    return (
        <>

            <footer className="bg-[#272A2B] flex-shrink-0 flex justify-center text-gray-300 py-2">
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