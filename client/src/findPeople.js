// client/src/findPeople.js
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

// The argument is the initial value you want the state property to have. The array it returns contains two things: the current value of the state property and a function that can be called to change the value of the state property.

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState([]);
    const [userQuery, setUserQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);

    useEffect(() => {
        axios
            .get("/api/new-users")
            .then(({ data }) => {
                setNewUsers(data);
            })
            .catch((err) => {
                console.error("error on axios.get (/api/new-users): ", err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`/api/find-users/${userQuery}`)
            .then(({ data }) => {
                setQueryResults(data);
                console.log(`axios.get(/api/find-users data:`, data);
            })
            .catch((err) => {
                console.error("error on axios.get (/api/find-users): ", err);
            });
    }, [userQuery]);

    return (
        <div>
            <div className="search-user-container">
                <h3>Looking for your friends?</h3>
                <input
                    onChange={(evt) => setUserQuery(evt.target.value)}
                    type="text"
                    placeholder="search for friends here..."
                />
            </div>

            {!userQuery && (
                <div className="recently-joined-container">
                    <h3>Recently joined:</h3>
                    <ul>
                        {newUsers.map((user, idx) => (
                            <li className="recently-joined-list" key={idx}>
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <img src={user.profile_pic} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {queryResults > 0 && (
                <div className="search-result-container">
                    <h2>Find members</h2>
                    <ul>
                        {queryResults.map((user, idx) => (
                            <li key={idx}>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.profile_pic} />
                                    <p>
                                        {user.first} {user.last}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {userQuery && !queryResults.length && (
                <p>There are no results matching your search criteria</p>
            )}
        </div>
    );
}
