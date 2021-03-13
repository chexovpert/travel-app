import React from "react";
import Rslogo from "./rs_school_js.svg";

export default () => {
  return (
    <footer showLabels className="root">
      <div>
        <p>
          <a className="footerauthor" href="https://github.com/chexovpert">
            Сhexovpert
          </a>
        </p>
        <p>
          <a className="footerauthor" href="https://github.com/chexovpert">
            Сhexovpert
          </a>
        </p>
        <p>
          <a className="footerauthor" href="https://github.com/chexovpert">
            Сhexovpert
          </a>
        </p>
      </div>
      <div className="svg">
        <img alt="RsSchool" src={Rslogo}></img>
      </div>
      <p>
        <a className="rslink" href="https://rs.school/js/">
          RS.School
        </a>
      </p>
    </footer>
  );
};
