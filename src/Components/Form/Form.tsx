import React from "react";

interface IProps {
  submitFn?: any;
  className?: string;
}



const Form: React.SFC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    // tslint:disable-next-line jsx-no-lambda
    onSubmit={e => {
        e.preventDefault();
        submitFn();
      }}
  >
    {children}
  </form>
);

export default Form;