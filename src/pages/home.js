import React from "react";
import Posts from "../components/posts";

export default function Home() {
    return (
        <div className="container pt-3">
            <div className="row">
                <div className="col">
                    <Posts />
                </div>
            </div>
        </div>
    )
}
