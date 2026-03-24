"use client"

// generally we define the
// errors state here only but as we have used the hydration boundries over the server side 
// ,so in that case there wont be error as it will always have the data so we will define the error under default next.js error boundry which is error.tsx page on server side.
// However this default error boundry thing has a demerit because it works on the folder level and if a single component needs 
// error showing we cannot do it so for that we can install react-error-boundr and use this by passing the error state compoent to fallback of it
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () =>{
    const router = useRouter();
    const [filters,setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    // const {data , isLoading, isError} = useQuery(trpc.agents.getMany.queryOptions({}));
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));
    
    
    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
                data={data.items}
                columns={columns}
                onRowClick={(row)=>{ router.push(`/agents/${row.id}`)}}
            />
            <DataPagination
            page={filters.page}
            totalPages = {data.totalPages}
            onPageChange = {(page) => setFilters({page}) }
            />
            {data.items.length == 0 && (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants in the call."
                />
            )}
        </div>
    )
};

export const AgentsViewLoading = ()=>{
    return (
    <LoadingState 
        title="Loading agents"
        description="Ths may take up some moment"
    />
);    
};

export const AgentsViewError = ()=>{
    return (
    <ErrorState 
        title="Error Loading agents"
        description="Something went wrong"
    />
);    
};