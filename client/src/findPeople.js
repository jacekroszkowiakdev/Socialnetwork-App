// client/src/findPeople.js
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState([]);
    const [userQuery, setUserQuery] = useState("");

    useEffect(() => {
        axios
            .get("/api/new-users")
            .then(({ data }) => {
                setNewUsers(data.newUsersArr);
            })
            .catch((err) => {
                console.error("error on axios.get (/api/new-users): ", err);
            });

        axios
            .get(`"/api/find-users/"${userQuery}`)
            .then(({ data }) => {
                setUserQuery(data.userQuery);
            })
            .catch((err) => {
                console.error("error on axios.get (/api/find-users): ", err);
            });
    }, [userQuery]);

    return (
        <div>
            <h2>Find members</h2>
            {/* conditional rendering */}
        </div>
    );
}
