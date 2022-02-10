import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

window.__MathJax_State__ = {
  isReady: false,
  promise: new Promise((resolve) => {
    window.MathJax = {
      // MathJax can be configured as desired in addition to these options.
      startup: {
        // Don't perform an initial typeset of the page when MathJax loads.
        // Our React components will trigger typsetting as needed.
        typeset: false,
        ready: () => {
          // Do whatever MathJax would normally do at this point.
          window.MathJax.startup.defaultReady();
          // Set the flag and resolve the promise.
          window.__MathJax_State__.isReady = true;
          resolve();
        },
      },
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
      },
      svg: {
        fontCache: "global",
      },
    };
  }),
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
