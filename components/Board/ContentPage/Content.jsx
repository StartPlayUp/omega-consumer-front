import React from "react";
import ReactHtmlParser from 'react-html-parser'
const Content = ({ content }) => {
  
  return <div>{ReactHtmlParser(content)}</div>;
}

export default Content