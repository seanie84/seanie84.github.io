import { RichDesk } from '../components/RichDesk';

export function Calendar() {
  return <RichDesk kicker="TIME" title="Calendar" lead="Day plan, clashes, and what to move. Draft only — nothing is booked." prompt="Build a day plan from the brief. Flag clashes. Do not claim a meeting was booked." tools={['Day plan', 'Clash check', 'Prep notes']} />;
}
export function Diary() {
  return <RichDesk kicker="TIME" title="Diary" lead="A private note for the day. Stays in this browser." prompt="Turn the brief into a short diary entry: what happened, what is open, what is next." tools={['Daily note', 'Open loops', 'Next']} />;
}
export function Decisions() {
  return <RichDesk kicker="OPS" title="Decisions" lead="Record a decision with the reason and the owner. Draft only." prompt="Write a decision record: decision, reason, owner, date, and what would reverse it." tools={['Decision record', 'Owner', 'Reversal']} />;
}
export function Files() {
  return <RichDesk kicker="OPS" title="Files" lead="Name, file, and find a document. No upload leaves this browser." prompt="Propose a file name, folder, and a one-line summary for the brief. Do not claim it was uploaded." tools={['Naming', 'Folder', 'Summary']} />;
}
export function Emails() {
  return <RichDesk kicker="COMMS" title="Emails" lead="Draft the reply. Nothing is sent." prompt="Draft the email. Mark it DRAFT. Do not claim it was sent." tools={['Reply draft', 'Subject', 'DRAFT mark']} />;
}
export function Projects() {
  return <RichDesk kicker="OPS" title="Projects" lead="Scope, owners, and the next three steps." prompt="Turn the brief into a project card: goal, owners, next three steps, risks." tools={['Scope', 'Owners', 'Risks']} />;
}
export function Helpdesk() {
  return <RichDesk kicker="OPS" title="Helpdesk" lead="Triage a ticket. Draft the reply. Do not close it." prompt="Triage the ticket: severity, owner, draft reply. Do not claim it was closed." tools={['Severity', 'Owner', 'Reply']} />;
}
export function Leads() {
  return <RichDesk kicker="SELL" title="Leads" lead="Qualify a lead. First-touch stays a draft." prompt="Qualify the lead: fit, next question, draft first-touch. Draft only." tools={['Qualify', 'Next question', 'First-touch draft']} />;
}
export function Clients() {
  return <RichDesk kicker="SELL" title="Clients" lead="A client card: who they are, what they bought, what is open." prompt="Write a client card from the brief. Do not invent contract values." tools={['Card', 'Open items', 'Next']} />;
}
export function Budgets() {
  return <RichDesk kicker="MONEY" title="Budgets" lead="A budget from the brief. Figures you did not give are marked unknown." prompt="Draft a budget. Mark unknown figures as unknown. Do not invent prices." tools={['Lines', 'Unknowns', 'Total']} />;
}
export function Billing() {
  return <RichDesk kicker="MONEY" title="Billing" lead="A draft invoice outline. Nothing is issued." prompt="Draft an invoice outline. Do not invent a tax number or claim it was issued." tools={['Outline', 'DRAFT', 'No issue']} />;
}
export function Accounting() {
  return <RichDesk kicker="MONEY" title="Accounting" lead="A plain read of the numbers. Not a filed return." prompt="Explain the numbers in plain language. Do not claim a return was filed." tools={['Plain read', 'Gaps', 'Next']} />;
}
export function Banking() {
  return <RichDesk kicker="MONEY" title="Banking" lead="A banking brief. No payment is made." prompt="Draft a banking brief. Do not claim a payment was made." tools={['Brief', 'No payment', 'Questions']} />;
}
export function Payroll() {
  return <RichDesk kicker="MONEY" title="Payroll" lead="A payroll checklist. No pay run is executed." prompt="Draft a payroll checklist. Do not claim a pay run was executed." tools={['Checklist', 'Gaps', 'No pay run']} />;
}
export function Inventory() {
  return <RichDesk kicker="STORE" title="Inventory" lead="What to count, what is low, what to reorder. No order is placed." prompt="Draft an inventory note. Do not claim an order was placed." tools={['Count', 'Low', 'Reorder draft']} />;
}
export function Contracts() {
  return <RichDesk kicker="LEGAL" title="Contracts" lead="A clause outline. Not legal advice, not a signed contract." prompt="Outline the clauses. Say this is not legal advice. Do not claim it was signed." tools={['Clauses', 'Not advice', 'Open points']} />;
}
export function JobHunter() {
  return <RichDesk kicker="PEOPLE" title="Job hunter" lead="A CV line and a cover note from the brief." prompt="Draft a CV bullet and a short cover note. Do not invent employers." tools={['CV bullet', 'Cover note', 'Gaps']} />;
}
export function ImageStudio() {
  return <RichDesk kicker="DESIGN" title="Image studio" lead="A shot list and a prompt. No image is published." prompt="Write a shot list and an image prompt for the brief. Do not claim an image was published." tools={['Shot list', 'Prompt', 'Use']} />;
}
export function Presentation() {
  return <RichDesk kicker="DESIGN" title="Presentation builder" lead="A slide outline with titles and the one point each slide must make." prompt="Draft a slide outline: title and one point per slide. Do not invent client figures." tools={['Slides', 'One point', 'Close']} />;
}
export function Voice() {
  return <RichDesk kicker="DESK" title="Voice butler" lead="What NEXA would say out loud. Text only on this desk." prompt="Write the spoken line NEXA would say. Short. Plain. No send." tools={['Spoken line', 'Short', 'Plain']} />;
}
export function WhatsApp() {
  return <RichDesk kicker="COMMS" title="WhatsApp" lead="A message draft. Nothing is sent." prompt="Draft the WhatsApp message. Mark it DRAFT. Do not claim it was sent." tools={['Message', 'DRAFT', 'No send']} />;
}
export function ScamScanner() {
  return <RichDesk kicker="SECURITY" title="Scam scanner" lead="Check a message or link description. No live lookup from this desk." prompt="Assess the brief for scam signs. Say what you cannot verify from text alone." tools={['Signs', 'Cannot verify', 'Next']} />;
}
