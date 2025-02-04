"use strict";

module.exports = function (app) {
  const { v4: uuidv4 } = require("uuid");

  let issues = [];

  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
  
      let projectIssues = issues.filter(issue => issue.project === project);
    
      if (Object.keys(req.query).length === 0) {
        res.json(projectIssues);
        return;
      }
    
      let filteredIssues = projectIssues.filter((issue) => {
        return Object.keys(req.query).every((key) => {
          if (key === "open") {
            return issue[key] === (req.query[key] === "true");
          }
          return issue[key] === req.query[key];
        });
      });
    
      res.json(filteredIssues);
    })

    .post(function (req, res) {
      let project = req.params.project;

      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;
      if (!issue_title || !issue_text || !created_by) {
        res.json({ error: "required field(s) missing" });
        return;
      }
      const newIssue = {
        project: project,
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        open: true,
        _id: uuidv4(),
        issue_title,
        issue_text,
        created_by,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
      };
      issues.push(newIssue);
      return res.json(newIssue);
    })

    .put(function (req, res) {
      let project = req.params.project;

      let projectIssues = issues.filter(issue => issue.project === project);

      const { _id, ...update } = req.body;
      if (!_id) {
        res.json({ error: "missing _id" });
        return;
      }
      if (Object.keys(update).length === 0) {
        res.json({ error: "no update field(s) sent", _id });
        return;
      }
      const issue = projectIssues.find((issue) => issue._id === _id);
      if (!issue) {
        res.json({ error: "could not update", _id });
        return;
      }
      Object.assign(issue, update, { updated_on: new Date().toISOString() });
      res.json({ result: "successfully updated", _id });
    })

    .delete(function (req, res) {
      let project = req.params.project;

      let projectIssues = issues.filter(issue => issue.project === project);

      const { _id } = req.body;
      if (!_id) {
        res.json({ error: "missing _id" });
        return;
      }
      const index = projectIssues.findIndex((issue) => issue._id === _id);
      if (index === -1) {
        res.json({ error: "could not delete", _id });
        return;
      }
      issues.splice(index, 1);
      res.json({ result: "successfully deleted", _id });
    });
};
