import { RichDesk } from '../components/RichDesk';

export function Admin() {
  return <RichDesk kicker="DESK" title="Admin" lead="Operator notes. No user is created from this desk." prompt="List the admin checks for the brief. Do not claim a user was created." tools={['Checks', 'Gaps', 'No create']} />;
}
export function AgentsRoom() {
  return <RichDesk kicker="DESK" title="Agents room" lead="Who is on duty and who should take the brief." prompt="Name the specialists who should take this and why." tools={['On duty', 'Handoff', 'Why']} />;
}
export function AiPrompts() {
  return <RichDesk kicker="DESK" title="Prompts" lead="A prompt you can reuse. It stays a draft." prompt="Write a reusable prompt for the brief. Mark the parts the operator must fill." tools={['Prompt', 'Fill-ins', 'Bounds']} />;
}
export function Apex() {
  return <RichDesk kicker="LEAD" title="Apex" lead="The top-line view. No figure is invented." prompt="Write the apex view: what is moving, what is stuck, what needs you." tools={['Moving', 'Stuck', 'Needs you']} />;
}
export function ApiPage() {
  return <RichDesk kicker="DESK" title="API" lead="What an API would need. No key is issued." prompt="List the endpoints the brief needs. Do not invent a key." tools={['Endpoints', 'Auth', 'No key']} />;
}
export function Ascension() {
  return <RichDesk kicker="SME" title="Ascension" lead="A growth step for an SME. No funding is claimed." prompt="Draft the next growth step. Do not claim funding." tools={['Step', 'Owner', 'No funding']} />;
}
export function Classic() {
  return <RichDesk kicker="DESK" title="Classic" lead="The same desk, plain. No extra chrome." prompt="Answer the brief in the plainest form." tools={['Plain', 'Short', 'Next']} />;
}
export function CommandDeck() {
  return <RichDesk kicker="LEAD" title="Command deck" lead="One screen: tenders, leads, drafts, what needs you." prompt="Write the command deck for today. Draft only." tools={['Tenders', 'Leads', 'Needs you']} />;
}
export function Company() {
  return <RichDesk kicker="SELL" title="Company" lead="A company card. Do not invent a registration number." prompt="Write a company card. Leave CIPC blank if not given." tools={['Name', 'What they do', 'Open']} />;
}
export function Connections() {
  return <RichDesk kicker="DESK" title="Connections" lead="What is connected and what is not. HubSpot is the only CRM." prompt="List connections. HubSpot only for CRM. Nothing sends." tools={['Connected', 'Missing', 'HubSpot']} />;
}
export function DataServers() {
  return <RichDesk kicker="DESK" title="Data servers" lead="Where data lives. This desk keeps it in the browser." prompt="Say where each kind of data lives. Do not claim a server was provisioned." tools={['Browser', 'Server', 'No provision']} />;
}
export function DatabaseUpload() {
  return <RichDesk kicker="DESK" title="Database upload" lead="A plan to import. Nothing is uploaded." prompt="Plan the import: columns, gaps, what not to import." tools={['Columns', 'Gaps', 'No upload']} />;
}
export function Ecosystems() {
  return <RichDesk kicker="SME" title="Ecosystems" lead="Who is in the ecosystem and what each does." prompt="Map the ecosystem. Do not invent partners." tools={['Who', 'Role', 'Gap']} />;
}
export function FirstRun() {
  return <RichDesk kicker="DESK" title="First run" lead="The first hour. No payment." prompt="Write the first-hour checklist. No payment step." tools={['Name', 'Connect', 'First draft']} />;
}
export function FullDesk() {
  return <RichDesk kicker="LEAD" title="Full desk" lead="Every desk that should be open for this brief." prompt="List the desks to open and the order." tools={['Order', 'Why', 'Skip']} />;
}
export function Install() {
  return <RichDesk kicker="DESK" title="Install" lead="How to put the desk on a phone. No store listing is claimed." prompt="Write the install steps for a phone. Do not claim a store listing." tools={['Phone', 'Home screen', 'No store']} />;
}
export function Jarvis() {
  return <RichDesk kicker="DESK" title="Butler" lead="What the butler would say. Text only." prompt="Write the butler line. Short. No send." tools={['Line', 'Short', 'No send']} />;
}
export function MasterAgent() {
  return <RichDesk kicker="DESK" title="Master agent" lead="One agent that routes the brief." prompt="Route the brief to the right specialist and give a first answer." tools={['Route', 'First answer', 'Bounds']} />;
}
export function Pos() {
  return <RichDesk kicker="STORE" title="Point of sale" lead="A till note. No payment is taken." prompt="Draft a till note. No payment, no card." tools={['Items', 'Total unknown', 'No payment']} />;
}
export function Quantum() {
  return <RichDesk kicker="DESK" title="Quantum" lead="A research note. Not a product claim." prompt="Write a short research note. Do not claim a product." tools={['Note', 'Unknown', 'No claim']} />;
}
export function Rooms() {
  return <RichDesk kicker="DESK" title="Rooms" lead="A room for a piece of work." prompt="Name the room, who is in it, and the first task." tools={['Room', 'Who', 'First task']} />;
}
export function SovereignBrain() {
  return <RichDesk kicker="DESK" title="Sovereign brain" lead="A local model on this machine. Keys stay here." prompt="Explain how to run the desk on a local model. No cloud key required." tools={['Local', 'No key', 'Steps']} />;
}
export function Startup() {
  return <RichDesk kicker="SME" title="Startup" lead="A startup one-pager. No funding is claimed." prompt="Draft a one-pager. Do not invent a valuation or claim funding." tools={['Problem', 'Offer', 'No funding']} />;
}
export function Status() {
  return <RichDesk kicker="DESK" title="Status" lead="What is up and what is not." prompt="Write a status line for the brief." tools={['Up', 'Down', 'Next']} />;
}
export function Supervisor() {
  return <RichDesk kicker="SECURITY" title="Supervisor" lead="A supervised check. No camera is opened." prompt="Draft a supervisor check. Cameras stay supervised." tools={['Check', 'Owner', 'No feed']} />;
}
export function Terms() {
  return <RichDesk kicker="LEGAL" title="Terms" lead="A plain-language terms note. Not a signed contract." prompt="Draft plain-language terms. Say this is not a signed contract." tools={['Plain', 'Not signed', 'Open']} />;
}
export function Upload() {
  return <RichDesk kicker="OPS" title="Upload" lead="What to upload and where. Nothing leaves this browser." prompt="List what to upload and the checks first." tools={['What', 'Checks', 'Stays here']} />;
}
export function UsersAdmin() {
  return <RichDesk kicker="DESK" title="Users" lead="A user note. No account is created." prompt="Draft a user note. Do not claim an account was created." tools={['Who', 'Role', 'No create']} />;
}
export function Vote() {
  return <RichDesk kicker="DESK" title="Vote" lead="A decision between options. You still decide." prompt="Set out the options and the trade-off. Do not pick for the operator." tools={['Options', 'Trade-off', 'You decide']} />;
}
export function Welcome() {
  return <RichDesk kicker="DESK" title="Welcome" lead="The door. Greet by name. No payment." prompt="Write a short welcome. No payment step." tools={['Name', 'First desk', 'No payment']} />;
}
export function Get() {
  return <RichDesk kicker="DESK" title="Get" lead="How to get the desk. No store, no payment." prompt="Write how to open the desk. No payment." tools={['Open', 'Free', 'No payment']} />;
}
