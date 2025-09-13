import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);

    useEffect(() => {
        fetchTask();
    }, [])

    const fetchTask = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/tasks");
            setTaskBuffer(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất tasks: ", error);
            toast("Lỗi xảy ra khi truy xuất task.")
        }
    }

    return (
        <>
            <div className="min-h-screen w-full bg-white relative">
                {/* Pastel Wave */}
                <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(120deg, #d5c5ff 0%, #a7f3d0 50%, #f0f0f0 100%)" }} />
                {/* Your Content/Components */}
                <div className="container pt-8 mx-auto relative">
                    <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                        {/* Đầu trang */}
                        <Header />

                        {/* Tạo nhiệm vụ */}
                        <AddTask />

                        {/* Thống kê và bộ lọc */}
                        <StatsAndFilter />

                        {/* Danh sách nhiệm vụ */}
                        <TaskList filteredTasks={taskBuffer} />

                        {/* Phân trang và lọc theo ngày */}
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <TaskListPagination />
                            <DateTimeFilter />
                        </div>

                        {/* Chân trang */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage