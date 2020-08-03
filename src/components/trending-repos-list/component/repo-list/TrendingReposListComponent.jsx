import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import EmptyStar from "../../../../assets/star-empty.svg";
import FullStar from "../../../../assets/star-full.svg";
import './TrendingReposListComponent.scss'

const TrendingRepoListComponent = ({ trendingRepos, onStarClick, starredRepos }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Stars</th>
          <th>Name</th>
          <th>Created</th>
          <th>Language</th>
          <th>Starred</th>
        </tr>
      </thead>
      <tbody>
        {trendingRepos.map(
          ({ created_at, name, stargazers_count, html_url, full_name, language }) => (
            <tr key={name} className="table-row">
              <td>{stargazers_count}</td>
              <td className="project-name">
                <a href={`${html_url}`}>
                  {name}
                </a>
              </td>
              <td>{moment(created_at).format("YYYY-MM-DD")}</td>
              <td>{language}</td>
              <td>
                <img
                  className='star'
                  onClick={() => onStarClick(full_name)}
                  src={
                    !starredRepos[full_name]
                      ? EmptyStar
                      : FullStar
                  }
                  alt="star"
                  style={{ width: 30 }}
                />
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TrendingRepoListComponent;
