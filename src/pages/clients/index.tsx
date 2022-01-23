import CardTable from "@/components/Card/CardTable";
import Layout from "@/Layout/Index";
import React from "react";

// components

// layout for page

function DistributerTables() {
    return (
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
                <CardTable />
            </div>
        </div>
    );
}
DistributerTables.PageLayout = Layout;
export default DistributerTables;
