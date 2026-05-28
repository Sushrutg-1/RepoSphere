import React, { createContext, useContext, useState } from "react";

const RepoContext = createContext();

export const useRepo = () => {
  return useContext(RepoContext);
};

const RepoProvider = ({ children }) => {
  const [myRepositories, setMyRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [serachedResult, setSerachedResult] = useState(suggestedRepositories);

  const value = {
    myRepositories,
    setMyRepositories,
    suggestedRepositories,
    setSuggestedRepositories,
    searchQuery,
    setSearchQuery,
    serachedResult,
    setSerachedResult,
  };

  return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
};

export default RepoProvider;
