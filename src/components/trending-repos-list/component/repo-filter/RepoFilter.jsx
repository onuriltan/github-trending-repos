import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const RepoFilter = ({ onSetLanguage, onIsStarredChecked }) => {
  const [language, setLanguage] = useState("");
  const [isStarredChecked, setIsStarredChecked] = useState(false);
  const onSubmit = event => {
    event.preventDefault()
    onSetLanguage(language)
    onIsStarredChecked(isStarredChecked)
  }

  return (
    <div className="mb-4">
      <Form
        inline
        onSubmit={onSubmit}
      >
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            className="mr-3"
            type="checkbox"
            label="Starred Repos"
            value={isStarredChecked}
            onChange={() => setIsStarredChecked(!isStarredChecked)}
          />
        </Form.Group>
        <FormControl
          type="text"
          placeholder="Enter language"
          value={language}
          className=" mr-sm-2"
          onChange={(e) => setLanguage(e.target.value)}
        />
        <Button type="submit">Filter</Button>
      </Form>
    </div>
  );
};

export default RepoFilter;
