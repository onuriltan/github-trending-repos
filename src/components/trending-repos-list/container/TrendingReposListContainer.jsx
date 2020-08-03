import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { Spinner } from "react-bootstrap";

const TrendingReposListContainer = () => {

  const aWeekBefore = moment().subtract(7,'d').format('YYYY-MM-DD');
  const githubRepositoriesApiUrl = 'https://api.github.com/search/repositories'
  
  const getTrendingRepos = async () => {
    try {
      const response = await axios.get(githubRepositoriesApiUrl, {
        params: {
          q: `created:>${aWeekBefore}`,
          sort: "stars",
          order: "desc",
        }
      });
      for(const repo of response.data.items) {
        window.localStorage.setItem(repo.full_name, false)
      }
      setTrendingRepos(response.data.items)
    } catch(e){
      console.log(e)
    }
  };

  const [trendingRepos, setTrendingRepos] = useState(null);

  useEffect(() => {
    getTrendingRepos()
    //eslint-disable-next-line
  }, [])
  

  return (
    <div className="d-flex justify-content-center mt-5">
      {
        !trendingRepos
          ?
          <Spinner animation="border"/>
          :
          <div />
      }
    </div>
  );
};

export default TrendingReposListContainer;
