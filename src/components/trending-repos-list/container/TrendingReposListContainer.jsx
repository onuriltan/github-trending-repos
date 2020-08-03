import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import TrendingReposListComponent from "../component/repo-list/TrendingReposListComponent";
import RepoFilter from "../component/repo-filter/RepoFilter";

const TrendingReposListContainer = () => {
  const aWeekBefore = moment().subtract(7, "d").format("YYYY-MM-DD");
  const githubRepositoriesApiUrl = "https://api.github.com/search/repositories";

  const getTrendingRepos = async () => {
    let query = `created:>${aWeekBefore}`;
    if (language) {
      query = `created:>${aWeekBefore}+language:${language}`;
    }
    try {
      const response = await axios.get(
        `${githubRepositoriesApiUrl}?q=${query}`,
        {
          params: {
            sort: "stars",
            order: "desc",
          },
        }
      );
      const theStarredRepos = {};
      for (const repo of response.data.items) {
        if (window.localStorage.getItem(repo.full_name) === null) {
          window.localStorage.setItem(repo.full_name, "false");
        }
      }
      for (const repo of response.data.items) {
        theStarredRepos[repo.full_name] = window.localStorage.getItem(
          repo.full_name
        );
      }
      setStarredRepos(theStarredRepos);
      if (filterStarredRepos) {
        const starredRepos = response.data.items.filter((repo) => {
          return window.localStorage.getItem(repo.full_name) === "true"
        })
        console.log(starredRepos)
        setTrendingRepos(starredRepos);
      } else {
        setTrendingRepos(response.data.items);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [trendingRepos, setTrendingRepos] = useState(null);
  const [starredRepos, setStarredRepos] = useState({});
  const [language, setLanguage] = useState("");
  const [filterStarredRepos, setFilterStarredRepos] = useState(false);

  useEffect(() => {
    setTrendingRepos(null);
    setStarredRepos({});
    getTrendingRepos();
    //eslint-disable-next-line
  }, [language, filterStarredRepos]);

  const onStarClick = (projectName) => {
    const isStarred = window.localStorage.getItem(projectName);
    if (isStarred === "false") {
      window.localStorage.setItem(projectName, "true");
    } else if (isStarred === "true") {
      window.localStorage.setItem(projectName, "false");
    }
    const starredReposClone = { ...starredRepos };
    for (const trendingRepo of trendingRepos) {
      starredReposClone[trendingRepo.full_name] = window.localStorage.getItem(
        trendingRepo.full_name
      );
    }
    setStarredRepos(starredReposClone);
  };

  const onSetLanguage = (selectedLang) => {
    setLanguage(selectedLang);
  };
  const onIsStarredChecked = (isStarred) => {
    setFilterStarredRepos(isStarred);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <RepoFilter
        onSetLanguage={onSetLanguage}
        onIsStarredChecked={onIsStarredChecked}
      />
      {!trendingRepos ? (
        <Spinner animation="border" />
      ) : (
        <TrendingReposListComponent
          trendingRepos={trendingRepos}
          onStarClick={onStarClick}
          starredRepos={starredRepos}
        />
      )}
    </div>
  );
};

export default TrendingReposListContainer;
