import React, { useState, useEffect } from "react";
import { postTicket, getTicketPriority } from "../../pages/api/ticketpage";
import { useAppContext } from "../util/contextState";
import { useRouter } from "next/router";


export default function TicketAdd() {
    const [selectValue, setSelectValue] = useState({ value: "Installation" })
    const [priorityValue, setPriorityValue] = useState({ value: "P1" })
    const router = useRouter();
    const context = useAppContext();
    const userId = context.user.email;

    const handleSelectChange = async (event) => {

        setSelectValue({ value: event.target.value })
    }

    useEffect(() => {

        const getPriority = async () => {
            console.log("ticketType", selectValue.value)

            const response = await getTicketPriority(
                userId,
                selectValue.value
            )

            const priority = response.data.priority

            console.log(priority, response.data)

            setPriorityValue({ value: priority })
        }

        getPriority()

    }, [selectValue]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            ticketType: selectValue.value,
            headline: event.target.problemSummary.value,
            description: event.target.problemDescription.value,
            priority: event.target.priority.value
        }
        console.log(formData)
        const response = await postTicket(
            userId,
            formData
        );

        if (response.status == 200) {
            alert('Support Ticket has been created !!');
            router.push("/myAccount/supportTicket");
        }
    }

    return (
        <div className="add-address">
            <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
                Add Support Ticket
            </h2>
            <div className="py-5 bg-white ">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mt-1 block w-full py-2 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="ticketType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ticket Type
                                </label>
                                <select onChange={handleSelectChange} id="support-tickets" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="Installation">Installation</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Emergency BreakUp">Emergency BreakUp</option>
                                    <option value="Return">Return</option>
                                    <option value="Refund">Refund</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="problemSummary"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Problem Summary
                                </label>
                                <input
                                    type="text"
                                    name="problemSummary"
                                    id="problemSummary"
                                    autoComplete="problemSummary"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="problemDescription"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Problem Description
                                </label>
                                <input
                                    type="text"
                                    name="problemDescription"
                                    id="problemDescription"
                                    autoComplete="problemDescription"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="orderNumber"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Order Number
                                </label>
                                <input
                                    type="tel"
                                    name="orderNumber"
                                    id="orderNumber"
                                    autoComplete="orderNumber"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="orderDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Order Date
                                </label>
                                <input
                                    type="text"
                                    name="orderDate"
                                    id="orderDate"
                                    autoComplete="orderDate"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="priority"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Priority
                                </label>
                                <input
                                    type="text"
                                    name="priority"
                                    id="priority"
                                    autoComplete="priority"
                                    value={priorityValue.value}
                                    disabled
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-4 py-5 ">
                            <button
                                type="submit"
                                className="btn-default rounded-full group relative w-48 flex justify-center text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
