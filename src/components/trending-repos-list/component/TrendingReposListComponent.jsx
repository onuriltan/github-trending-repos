import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import EmptyStar from "../../../assets/star-empty.svg";
import FullStar from "../../../assets/star-full.svg";

const TrendingRepoListComponent = ({ trendingRepos }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Stars</th>
          <th>Name</th>
          <th>Created</th>
          <th>Starred</th>
        </tr>
      </thead>
      <tbody>
        {trendingRepos.map(
          ({ created_at, name, stargazers_count, html_url, full_name }) => (
            <tr key={name} className="table-row">
              <td>{stargazers_count}</td>
              <td className="project-name">
                <a href={`${html_url}`}>
                  {name}
                </a>
              </td>
              <td>{moment(created_at).format("YYYY-MM-DD")}</td>
              <td>
                <img
                  src={
                    !window.localStorage.getItem(full_name)
                      ? FullStar
                      : EmptyStar
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
