import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const LanguageFilter = ({ onSetLanguage }) => {
  const [language, setLanguage] = useState("");
  const onChange = (e) => {
    setLanguage(e.target.value);
  };
  
  return (
    <div className="mb-4">
      <Form inline onSubmit={(e) => {onSetLanguage(language); e.preventDefault();}}>
        <FormControl
          type="text"
          placeholder="Filter Language"
          value={language}
          className=" mr-sm-2"
          onChange={onChange}
        />
        <Button type="submit">Filter</Button>
      </Form>
    </div>
  );
};

export default LanguageFilter;
