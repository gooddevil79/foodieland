import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './BreadCrumbs.module.css';
const BreadCrumbs = function () {
  const location = useLocation();
  let currentLink = '';
  let crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;
      return (
        <div key={crumb} className={classes.crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });
  console.log(currentLink);
  return <div className={classes.breadCrumbs}>{crumbs}</div>;
};

export default BreadCrumbs;
