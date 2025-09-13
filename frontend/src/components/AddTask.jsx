import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const AddTask = () => {
    return (
        <Card className="p-6 border-0 bg-gradian-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input type="text" className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20" placeholder="Cần phải làm gì?" />
                <Button className="px-6 cursor-pointer" variant="gradient" size="xl">
                    <Plus className="size-5"/> Thêm
                </Button>
            </div>
        </Card>
    )
};

export default AddTask;