import React from "react";
// Chakra imports
// Custom components

// Assets
import IndexLayout from "@/Layout/Index";
import CardSettings from "@/components/Card/CardSettings";

function Settings() {
    return (
        <IndexLayout>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings />
                </div>
            </div>
        </IndexLayout>
    );
}

export default Settings;
