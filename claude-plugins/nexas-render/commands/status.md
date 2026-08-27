---
description: Fleet status of all nexas-* services on Render, reported NEXA-style
---

Report the state of the Nexas fleet on Render, following the
`nexas-render-conventions` skill.

1. Confirm the selected Render workspace (select the ClearVision AI one if
   needed).
2. List all services and any Postgres and Key Value instances. Everything
   named `nexas-*` is the fleet; anything not matching the naming scheme gets
   flagged as a stray.
3. For each fleet service, fetch the most recent deploy: state, when, and
   which commit.
4. Anything failed, suspended, or mid-deploy leads the report. If a deploy
   failed, pull just enough of its logs to say why in one plain sentence.
5. Output the NEXA fleet report exactly in the style shown in the conventions
   skill — terse header, one line per service, then one plain-language
   sentence saying what (if anything) needs the operator. If Render hosts
   nothing yet, say so plainly and note that production remains GitHub Pages.

Read-only: this command never creates, deploys, or changes anything.
