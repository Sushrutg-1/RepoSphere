import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import logoWithName from "../../../public/assets/reposphere-logo-primary.svg";
import { useRepo } from "../../context/RepoContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useAuth();

  const {
    suggestedRepositories,
    searchQuery,
    setSearchQuery,
    serachedResult,
    setSerachedResult,
  } = useRepo();

  useEffect(() => {
    if (searchQuery === "") {
      setSerachedResult([]);
    } else {
      let filteredRepo = suggestedRepositories.filter((repo) => {
        return repo?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSerachedResult(filteredRepo);
    }
  }, [searchQuery, suggestedRepositories]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navbar_left}>
            <img
              src={logoWithName}
              alt=""
              className={styles.logoWithName}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className={styles.navbar_center}>
            <input
              type="text"
              placeholder="Search for repos"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              style={{
                display: location.pathname === "/profile" ? "none" : "",
              }}
            />
          </div>
          <div className={styles.navbar_right}>
            <Link to="/repo/create" className={styles.navIteam}>
              Create New Repo
            </Link>
            <Link to="/profile" className={styles.navIteam}>
              My Profile
            </Link>

            <div
              className={styles.navIteam}
              style={{ background: "red", color: "white" }}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
