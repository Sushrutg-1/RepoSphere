import React, { useState } from "react";
import logo from "../../../public/assets/reposphere-logo-primary.svg";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import styles from "./AuthPage.module.css";

function AuthPage() {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useAuth();
  const [loginMethod, setLoginMethod] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });
      const { userId, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);

      setUsername("");
      setPassword("");
      setEmail("");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.post("/user/login", {
        email,
        password,
      });

      const { userId, token } = response.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      setCurrentUser(userId);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.headingContainer}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="" className={styles.logoImage} />
            </div>
            <div className={styles.contentContainer}>
              {!loginMethod ? (
                <>
                  {" "}
                  <h3>Create an account </h3>
                  <p>Start your free trial today</p>
                </>
              ) : (
                <>
                  {" "}
                  <h3>Welcome Back </h3>
                  <p>Sign in to your account.</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            {!loginMethod ? (
              <div className={styles.inputRow}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="myusername"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            <div className={styles.inputRow}>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className={styles.inputRow}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="***********"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className={styles.wrapper}>
              <div className={styles.submitBtnContainer}>
                <button
                  disabled={loading}
                  onClick={() => {
                    if (!loginMethod) {
                      handleRegister();
                    } else {
                      handleLogin();
                    }
                  }}
                  className={styles.submitBtn}
                >
                  {loading ? (
                    <>Loading..</>
                  ) : !loginMethod ? (
                    <> Register </>
                  ) : (
                    <> Login</>
                  )}
                </button>
              </div>
              <div className={styles.loginMethod}>
                {!loginMethod ? (
                  <>
                    {" "}
                    <p>
                      Already have an account ?{" "}
                      <span
                        onClick={() => {
                          setLoginMethod(!loginMethod);
                        }}
                      >
                        Login{" "}
                      </span>{" "}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Don't have account ?{" "}
                      <span
                        onClick={() => {
                          setLoginMethod(!loginMethod);
                        }}
                      >
                        Register{" "}
                      </span>{" "}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
