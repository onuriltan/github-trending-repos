import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import TrendingReposListComponent from "../component/repo-list/TrendingReposListComponent";
import LanguageFilter from "../component/language-filter/LanguageFilter";

const TrendingReposListContainer = () => {
  const aWeekBefore = moment().subtract(7, "d").format("YYYY-MM-DD");
  const githubRepositoriesApiUrl = "https://api.github.com/search/repositories";

  const getTrendingRepos = async () => {
    try {
      const response = await axios.get(githubRepositoriesApiUrl, {
        params: {
          q: `created:>${aWeekBefore}`,
          sort: "stars",
          order: "desc",
        },
      });
      const theStarredrepos = {};
      for (const repo of response.data.items) {
        if(window.localStorage.getItem(repo.full_name) === undefined) {
          window.localStorage.setItem(repo.full_name, 'false');
        }
      }
      for (const repo of response.data.items) {
        theStarredrepos[repo.full_name] = eval(
          window.localStorage.getItem(repo.full_name)
        );
      }
      setStarredRepos(theStarredrepos);
      setTrendingRepos(response.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const [trendingRepos, setTrendingRepos] = useState(null);
  const [starredRepos, setStarredRepos] = useState({});

  useEffect(() => {
    getTrendingRepos();
    //eslint-disable-next-line
  }, []);

  const onStarClick = (projectName) => {
    const isStarred = eval(window.localStorage.getItem(projectName));
    window.localStorage.setItem(projectName, !isStarred);
    const starredReposClone = { ...starredRepos };
    for (const trendingRepo of trendingRepos) {
      starredReposClone[trendingRepo.full_name] = eval(
        window.localStorage.getItem(trendingRepo.full_name)
      );
    }
    setStarredRepos(starredReposClone);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <LanguageFilter />
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
