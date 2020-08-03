import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const LanguageFilter = () => {
  return (
    <div className="mb-4">
      <Form inline>
        <FormControl type="text" placeholder="Filter Language" className=" mr-sm-2" />
        <Button type="submit">Filter</Button>
      </Form>
    </div>
  );
};

export default LanguageFilter;
