import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils';

const TaskListPagination = ({ handleNext, handlePrev, handlePageChange, page, totalPages }) => {
    const generatePages = () => {
        const pages = [];
        if (totalPages < 4) {
            // Hiện toàn bộ
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page < 2) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (page >= totalPages - 1) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page, "...", totalPages);
            }
        }
        return pages;
    };

    const pagesToShow = generatePages();

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    {/* Trước */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn("cursor-pointer", page === 1 && "cursor-default opacity-50 pointer-events-none")}
                        />
                    </PaginationItem>

                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {
                                p === '...' ? (<PaginationEllipsis />) :
                                    (<PaginationLink
                                        isActive={p === page}
                                        onClick={() => {
                                            if (p !== page) handlePageChange(p);
                                        }}
                                        className="cursor-pointer"
                                    >{p}</PaginationLink>)
                            }
                        </PaginationItem>
                    ))}

                    {/* Sau */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={page === totalPages ? undefined : handleNext}
                            className={cn("cursor-pointer", page === totalPages && "cursor-default opacity-50 pointer-events-none")}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
};

export default TaskListPagination;