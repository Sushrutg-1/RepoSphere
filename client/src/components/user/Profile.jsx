import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../layout/UserLayout/UserLayout.jsx";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [userRepoDetails, setUserRepoDetails] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await api.get(`/user/${userId}`);
          console.log(response.data);
          const { user } = response.data;

          setUserDetails(user);
        } catch (error) {
          console.error(error.message);
        }
      }
      if (!userId) {
        navigate("/auth");
      }
    };

    const fetchUserRepoDetails = async () => {
      if (userId) {
        try {
          const response = await api.get(`/repo/user/${userId}`);
          console.log(response.data);
          const { allRepositories } = response.data;

          setUserRepoDetails(allRepositories);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchUserDetails();
    fetchUserRepoDetails();
  }, []);

  return (
    <>
      <UserLayout>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <div className={styles.userDetails}>
              {userDetails ? (
                <>
                  {" "}
                  {
                    <div className={styles.userDetailsCard}>
                      <div className={styles.userProfile_container}>
                        <img
                          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                          alt=""
                          className={styles.userProfile}
                        />
                      </div>
                      <h2>Username : {userDetails.username}</h2>
                      <h3>Email : {userDetails.email}</h3>
                    </div>
                  }{" "}
                </>
              ) : (
                <>fetching User data</>
              )}
            </div>
          </div>
          <div className={styles.mainContainer_right}>
            <h1>All repos of User</h1>
            {userRepoDetails && userRepoDetails.length !== 0 ? (
              <>
                {userRepoDetails.map((repo, idx) => {
                  return (
                    <div className={styles.repoCard}>
                      <div className="repoDetails">
                        <h2>Repo Name : {repo.name}</h2>
                        <p>Description : {repo.description}</p>
                      </div>
                      <div className="repoIssueContainer">
                        {repo.issues.lenght !== 0 ? (
                          <>
                            {repo.issues.map((issue, idx) => {
                              return (
                                <div className="issueCard">
                                  <h3>Issue Title : {issue.title}</h3>
                                  <p>Description : {issue.desscription}</p>
                                  <p>Status : {issue.status}</p>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            {" "}
                            <h3> No Issues for repository </h3>{" "}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>NO Repositories of user</>
            )}
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default Profile;
