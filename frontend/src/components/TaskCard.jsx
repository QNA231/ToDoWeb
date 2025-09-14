import React, { useRef, useState } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';
const TaskCard = ({ task, index, handleTaskChanged }) => {
    const [isEdditing, setIsEdditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
    const inputRef = useRef(null);

    const handleEditClick = () => {
        setIsEdditing(true);
        setUpdateTaskTitle(task.title || "");
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updateTask();
        }
    };

    const updateTask = async () => {
        try {
            setIsEdditing(false);
            await api.put(`tasks/${task._id}`, {
                title: updateTaskTitle
            })
            toast.success("Nhiệm vụ đã cập nhật thành công.");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi xảy ra khi cập nhật nhiệm vụ.", error);
            toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`tasks/${taskId}`);
            toast.success("Nhiệm vụ đã xóa.");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi xảy ra khi xóa nhiệm vụ.", error);
            toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
        }
    };

    const togleTaskCompleteButton = async () => {
        try {
            if (task.status === 'active') {
                await api.put(`tasks/${task._id}`, {
                    status: "complete",
                    completedAt: new Date().toISOString(),
                });
                toast.success(`${task.title} đã hoàn thành.`);
            } else {
                await api.put(`tasks/${task._id}`, {
                    status: "active",
                    completedAt: null,
                });
                toast.success(`${task.title} đã đổi sang chưa hoàn thành.`);
            }
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi xảy ra khi cập nhật nhiệm vụ.", error);
            toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
        }
    };

    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg trasition-all duration-200 animate-fade-in group",
            task.status === "complete" && 'opacity-75'
        )} style={{ animationDelay: `${index * 50}ms` }}>
            <div className='flex items-center gap-4'>
                {/* Nút tròn */}
                <Button variant="ghost"
                    size="icon"
                    className={cn("flex-shrink-0 size-8 rounded-full trasition-all duration-200 cursor-pointer",
                        task.status === 'complete' ? 'text-success hover:text-success/80' : 'text-muted-foregroud hover:text-primary'
                    )}
                    onClick={togleTaskCompleteButton}
                >
                    {task.status === 'complete' ? (<CheckCircle2 className='size-5' />) : (<Circle className='size-5' />)}
                </Button>

                {/* Hiển thị hoặc chỉnh sửa title của task */}
                <div className="flex-1 min-w-0">
                    {isEdditing ?
                        (<Input type="text"
                            placeholder="Cần phải làm gì"
                            className="flex-1 h-12 text-base border-border/20 focus:border-primary/50 focus:ring-primary/20"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEdditing(false);
                                setUpdateTaskTitle(task.title || "")
                            }}
                            ref={inputRef}
                        />) :
                        (<p className={cn("text-base trasition-all duration-200",
                            task.status === 'complete' ? 'line-through text-muted-foreground' : 'text-foreground')}>
                            {task.title}
                        </p>)}

                    {/* Ngày tạo và ngày hoàn thành */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-sx text-muted-foreground"> - </span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Nút chỉnh và nút xóa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* Nút edit */}
                    <Button variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground cursor-pointer hover:text-info"
                        onClick={handleEditClick}
                    >
                        <SquarePen className='size-4' />
                    </Button>
                    {/* Nút xóa */}
                    <Button variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground cursor-pointer hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className='size-4' />
                    </Button>
                </div>
            </div>
        </Card>
    )
};

export default TaskCard;