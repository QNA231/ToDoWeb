import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

export const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`Nhiệm vụ "${newTaskTitle}" vừa được thêm thành công`);
                handleNewTaskAdded();
            } catch (error) {
                console.error("Lỗi xảy ra khi thêm nhiệm vụ.", error);
                toast.error("Lỗi xảy ra khi thêm nhiệm vụ.");
            }
            setNewTaskTitle("");
        } else {
            toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    return (
        <Card className="p-6 border-0 bg-gradian-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input type="text"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    placeholder="Cần phải làm gì?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button className="px-6 cursor-pointer"
                    variant="gradient"
                    size="xl"
                    onClick={addTask}
                    disabled={!newTaskTitle && true}
                >
                    <Plus className="size-5" /> Thêm
                </Button>
            </div>
        </Card>
    )
};

export default AddTask;