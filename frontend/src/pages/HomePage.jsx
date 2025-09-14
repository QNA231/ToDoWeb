import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setactiveTaskCount] = useState(0);
    const [completeTaskCount, setcompleteTaskCount] = useState(0);
    const [filter, setfilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, [])

    // logic
    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTaskBuffer(res.data.tasks);
            setactiveTaskCount(res.data.activeCount);
            setcompleteTaskCount(res.data.completeCount);
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất tasks: ", error);
            toast("Lỗi xảy ra khi truy xuất task.")
        }
    };

    const handleTaskChanged = () => {
        fetchTasks();
    };

    // biến
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active';
            case 'completed':
                return task.status === 'complete';
            default:
                return true;
        }
    });

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
                        <AddTask handleNewTaskAdded={handleTaskChanged} />

                        {/* Thống kê và bộ lọc */}
                        <StatsAndFilters
                            filter={filter}
                            setFilter={setfilter}
                            activeTaskCount={activeTaskCount}
                            completedTaskCount={completeTaskCount}
                        />

                        {/* Danh sách nhiệm vụ */}
                        <TaskList filteredTasks={filteredTasks}
                            filter={filter}
                            handleTaskChanged={handleTaskChanged}
                        />

                        {/* Phân trang và lọc theo ngày */}
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <TaskListPagination />
                            <DateTimeFilter />
                        </div>

                        {/* Chân trang */}
                        <Footer
                            activeTasksCount={activeTaskCount}
                            completedTasksCount={completeTaskCount}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage