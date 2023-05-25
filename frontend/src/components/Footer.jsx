import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p><a href="https://github.com/ivannip/react-toDoList">Git Hub Source Here</a> - copyright {year} </p>
    </footer>
    );
};

export default Footer;