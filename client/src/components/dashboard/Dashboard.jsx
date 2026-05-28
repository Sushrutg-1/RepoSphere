import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";

import "./Dashboard.css";
import UserLayout from "../../layout/UserLayout/UserLayout.jsx";
import { useRepo } from "../../context/RepoContext.jsx";

function Dashboard() {
  const [loading, setLoading] = useState(false);

  // const [myRepositories, setMyRepositories] = useState([]);
  // const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [serachedResult, setSerachedResult] = useState(suggestedRepositories);

  const {
    myRepositories,
    setMyRepositories,
    suggestedRepositories,
    setSuggestedRepositories,
    searchQuery,
    setSearchQuery,
    serachedResult,
    setSerachedResult,
  } = useRepo();

  useEffect(() => {
    console.log("ren");
    const userId = localStorage.getItem("userId");

    const fetchMyRepositories = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/repo/user/${userId}`);
        console.log(response.data.allRepositories);
        setMyRepositories(response.data.allRepositories);
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/repo`);
        console.log(response.data.allRepositories);
        setSuggestedRepositories(response.data.allRepositories);
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRepositories();
    fetchSuggestedRepositories();

    //OR Proffetional way
    // const [myRepositoriesResponse , suggestedRepositoriesResponse] = await Promise.all([ api.get(`/repo/user/${userId}`), api.get("/repo")]);
    // setMyRepositories(myRepositoriesResponse.data.allRepositories)
    // setSuggestedRepositories(suggestedRepositoriesResponse.data.allRepositories)
  }, []);

  return (
    <>
      <UserLayout>
        <div className="container">
          <div className="mainContainer">
            <div className="mainContainer_left">
              <h2>My Repo</h2>
              {myRepositories &&
                myRepositories.map((repo, idx) => {
                  return (
                    <div className="singleRepoCard" key={idx}>
                      <h2>{repo.name}</h2>
                      <p>{repo.description}</p>
                    </div>
                  );
                })}
            </div>
            <div className="mainContainer_center">
              <h2>All Repos</h2>

              {searchQuery.length === 0
                ? suggestedRepositories &&
                  suggestedRepositories.map((repo, idx) => {
                    return (
                      <div className="singleRepoCard" key={idx}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                        <h3>{repo.owner.username}</h3>
                      </div>
                    );
                  })
                : serachedResult &&
                  serachedResult.map((repo, idx) => {
                    return (
                      <div className="singleRepoCard" key={idx}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                        <h3>{repo.owner.username}</h3>
                      </div>
                    );
                  })}
            </div>
            <div className="mainContainer_right">
              <h2>New Events and Notification</h2>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}

export default Dashboard;
