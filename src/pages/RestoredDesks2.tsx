import { RichDesk } from '../components/RichDesk';

export function Contacts() {
  return <RichDesk kicker="SELL" title="Contacts" lead="A contact card. Nothing is emailed." prompt="Write a contact card from the brief. Do not claim a message was sent." tools={['Card', 'Next', 'No send']} />;
}
export function Products() {
  return <RichDesk kicker="STORE" title="Products" lead="A product line for a quote. No checkout." prompt="Draft a product line. Mark price unknown if not given. No checkout." tools={['Line', 'Spec', 'No checkout']} />;
}
export function FixedAssets() {
  return <RichDesk kicker="MONEY" title="Fixed assets" lead="An asset register line. No depreciation is posted." prompt="Draft an asset register line. Do not invent a book value." tools={['Asset', 'Location', 'Unknowns']} />;
}
export function Recruitment() {
  return <RichDesk kicker="PEOPLE" title="Recruitment" lead="A role brief and a shortlist note. No offer is sent." prompt="Draft a role brief. Do not claim an offer was sent." tools={['Role', 'Must-haves', 'No offer']} />;
}
export function Jobs() {
  return <RichDesk kicker="PEOPLE" title="Jobs" lead="A job card from the brief." prompt="Turn the brief into a job card: title, duties, location." tools={['Title', 'Duties', 'Location']} />;
}
export function Reports() {
  return <RichDesk kicker="OPS" title="Reports" lead="A one-page report. Figures you did not give stay unknown." prompt="Draft a one-page report. Do not invent numbers." tools={['Headline', 'Unknowns', 'Next']} />;
}
export function Timesheets() {
  return <RichDesk kicker="PEOPLE" title="Timesheets" lead="A timesheet outline. Nothing is submitted." prompt="Draft a timesheet outline. Do not claim it was submitted." tools={['Hours', 'Job', 'No submit']} />;
}
export function Reminders() {
  return <RichDesk kicker="TIME" title="Reminders" lead="A reminder list. Nothing is scheduled on a server." prompt="Turn the brief into reminders with a when. Do not claim they were set." tools={['When', 'What', 'Owner']} />;
}
export function BrandStudio() {
  return <RichDesk kicker="DESIGN" title="Brand studio" lead="A brand note: name, line, colours. Warm paper, ink, rose." prompt="Draft a brand note. Use warm paper, ink, and rose. Do not invent a trademark." tools={['Name', 'Line', 'Colours']} />;
}
export function DesignAgent() {
  return <RichDesk kicker="DESIGN" title="Design agent" lead="A design brief for a page or a deck." prompt="Write a design brief: audience, sections, the one thing it must do." tools={['Audience', 'Sections', 'One thing']} />;
}
export function AppStudio() {
  return <RichDesk kicker="DESIGN" title="App design studio" lead="A screen list for an app. No code is deployed." prompt="List the screens and what each does. Do not claim a deploy." tools={['Screens', 'Flow', 'No deploy']} />;
}
export function CampaignStudio() {
  return <RichDesk kicker="COMMS" title="Campaign studio" lead="A campaign outline. Nothing is posted." prompt="Draft a campaign outline. Draft only. Do not claim it was posted." tools={['Audience', 'Hook', 'No post']} />;
}
export function Canvas() {
  return <RichDesk kicker="DESIGN" title="Canvas" lead="A board of notes from the brief." prompt="Turn the brief into a canvas: facts, gaps, next." tools={['Facts', 'Gaps', 'Next']} />;
}
export function Chains() {
  return <RichDesk kicker="DESK" title="Chains" lead="A chain of steps. Nothing runs on its own." prompt="Write the chain as numbered steps. Mark the step that needs you." tools={['Steps', 'Needs you', 'Stop']} />;
}
export function Workspaces() {
  return <RichDesk kicker="DESK" title="Workspaces" lead="A workspace card: name, purpose, who is in it." prompt="Draft a workspace card. Do not claim people were invited." tools={['Name', 'Purpose', 'Who']} />;
}
export function Ideas() {
  return <RichDesk kicker="DESK" title="Ideas" lead="Capture an idea and the first test." prompt="Write the idea, who it is for, and the smallest test." tools={['Idea', 'Who', 'Test']} />;
}
export function Support() {
  return <RichDesk kicker="OPS" title="Support" lead="A support reply. Nothing is sent." prompt="Draft the support reply. Mark it DRAFT." tools={['Reply', 'DRAFT', 'Next']} />;
}
export function Teacher() {
  return <RichDesk kicker="LEARN" title="Teacher" lead="A lesson outline. CAPS or TVET if the brief says so." prompt="Draft a short lesson outline. Do not invent a curriculum code." tools={['Aim', 'Steps', 'Check']} />;
}
export function Tutor() {
  return <RichDesk kicker="LEARN" title="Tutor" lead="Explain the brief in plain language." prompt="Explain the brief simply. Flag what you are not sure of." tools={['Plain', 'Example', 'Check']} />;
}
export function Reader() {
  return <RichDesk kicker="LEARN" title="Reader" lead="A reading note from the brief." prompt="Summarise the brief in your own words. Do not invent quotes." tools={['Summary', 'Points', 'Question']} />;
}
export function Live() {
  return <RichDesk kicker="OPS" title="Live" lead="A live-ops note. No camera is opened." prompt="Draft a live-ops note. Cameras stay supervised. Do not claim a feed." tools={['Now', 'Blocked', 'Owner']} />;
}
export function AirportOps() {
  return <RichDesk kicker="OPS" title="Airport ops" lead="A ramp or terminal note. No flight is changed." prompt="Draft an ops note. Do not claim a flight was changed." tools={['Note', 'Owner', 'No change']} />;
}
export function ESD() {
  return <RichDesk kicker="SME" title="ESD" lead="An enterprise and supplier development note." prompt="Draft an ESD note for a South African SME. Do not invent a score." tools={['Aim', 'Gap', 'Next']} />;
}
export function Acceleration() {
  return <RichDesk kicker="SME" title="Acceleration" lead="A 90-day plan. No funding is claimed." prompt="Draft a 90-day plan. Do not claim funding was approved." tools={['90 days', 'Owners', 'No funding']} />;
}
export function Retail() {
  return <RichDesk kicker="STORE" title="Retail" lead="A retail note. No till is opened." prompt="Draft a retail note. No checkout." tools={['Offer', 'Stock', 'No till']} />;
}
export function Dropshipping() {
  return <RichDesk kicker="STORE" title="Dropshipping" lead="A supplier note. No order is placed." prompt="Draft a dropshipping note. Do not claim an order was placed." tools={['Supplier', 'Margin unknown', 'No order']} />;
}
export function Fitness() {
  return <RichDesk kicker="PEOPLE" title="Fitness" lead="A simple plan. Not medical advice." prompt="Draft a simple plan. Say this is not medical advice." tools={['Plan', 'Not advice', 'Check']} />;
}
export function Sabc() {
  return <RichDesk kicker="COMMS" title="SABC" lead="A broadcast or community note. Nothing is aired." prompt="Draft a short community note. Do not claim it was aired." tools={['Note', 'Audience', 'No air']} />;
}
export function MoneyLoop() {
  return <RichDesk kicker="MONEY" title="Money loop" lead="Where money comes in and goes out. No payment is made." prompt="Map the money loop. Do not invent figures. No payment." tools={['In', 'Out', 'Gap']} />;
}
export function Storefront() {
  return <RichDesk kicker="STORE" title="Storefront" lead="A shop outline. No payment gate." prompt="Draft a storefront outline. No payment, no checkout." tools={['Offer', 'Pages', 'No payment']} />;
}
export function Integrations() {
  return <RichDesk kicker="DESK" title="Integrations" lead="What to connect, and what stays draft." prompt="List the connections the brief needs. HubSpot is the only CRM. Nothing sends." tools={['Connect', 'HubSpot only', 'Draft']} />;
}
export function FreeRun() {
  return <RichDesk kicker="DESK" title="Free run" lead="How to run this desk without a paid seat." prompt="List the free way to run the desk: local model, free cloud key, what stays in the browser." tools={['Local', 'Free key', 'Browser']} />;
}
export function Skills() {
  return <RichDesk kicker="DESK" title="Skills" lead="A skill card for an agent." prompt="Write a skill card: when to use it, what it must not do." tools={['When', 'Does', 'Must not']} />;
}
export function AgentKit() {
  return <RichDesk kicker="DESK" title="Agent kit" lead="A kit for a new specialist." prompt="Draft an agent kit: name, role, bounds. Draft only." tools={['Name', 'Role', 'Bounds']} />;
}
export function Brain() {
  return <RichDesk kicker="DESK" title="Brain" lead="How the desk thinks. Engines stay in Settings." prompt="Explain the desk in plain language. Do not name the engine vendors." tools={['Plain', 'Bounds', 'Settings']} />;
}
export function Executive() {
  return <RichDesk kicker="LEAD" title="Executive" lead="A one-page brief for a decision." prompt="Write a one-page executive brief. Do not invent figures." tools={['Ask', 'Options', 'Ask of you']} />;
}
export function Downloads() {
  return <RichDesk kicker="OPS" title="Downloads" lead="What to export from this browser." prompt="List what can be exported from this desk and where it lives." tools={['Export', 'Browser', 'Audit']} />;
}
export function PrivacyCenter() {
  return <RichDesk kicker="LEGAL" title="Privacy" lead="A POPIA note. Not legal advice." prompt="Draft a POPIA note for the brief. Say this is not legal advice." tools={['Data', 'Purpose', 'Not advice']} />;
}
export function Social() {
  return <RichDesk kicker="COMMS" title="Social" lead="A post draft. Nothing is published." prompt="Draft the post. Mark it DRAFT. Do not claim it was published." tools={['Post', 'DRAFT', 'No publish']} />;
}
export function Onboarding() {
  return <RichDesk kicker="DESK" title="Onboarding" lead="The first three steps for a new operator." prompt="Write the first three steps. No payment." tools={['Name', 'Connect', 'First desk']} />;
}
export function Language() {
  return <RichDesk kicker="DESK" title="Language" lead="Reply in the language the brief asks for." prompt="Answer the brief in the language requested. Default to English if none is named." tools={['Language', 'Plain', 'Check']} />;
}
