export type RepoEntry = {
  name: string;
  url: string;
  blurb: string;
  kind: 'NEXAS' | 'NEXORA' | 'SME' | 'Other';
};

export type ModuleEntry = {
  to: string;
  name: string;
  group: string;
  blurb: string;
  source: 'NEXAS' | 'Previous' | 'NEXORA';
};

export const REPOS: RepoEntry[] = [
  { name: 'seanie84.github.io', url: 'https://github.com/seanie84/seanie84.github.io', blurb: 'NEXAS AI — this app. 77 agents, business hub, light HUD.', kind: 'NEXAS' },
  { name: 'nexa-command-center', url: 'https://github.com/seanie84/nexa-command-center', blurb: 'Earlier NEXA command center (React 19, glass deck).', kind: 'NEXAS' },
  { name: 'nexora-app', url: 'https://github.com/seanie84/nexora-app', blurb: 'NEXORA app: tenders, scout, CRM, campaigns, hologram face.', kind: 'NEXORA' },
  { name: 'nexora-command-desk', url: 'https://github.com/seanie84/nexora-command-desk', blurb: 'NEXORA command desk, camera layout, 24/7 HITL pack.', kind: 'NEXORA' },
  { name: 'NexisSME', url: 'https://github.com/seanie84/NexisSME', blurb: 'NEXISME — SME product shell.', kind: 'SME' },
  { name: 'ubunturise-core', url: 'https://github.com/seanie84/ubunturise-core', blurb: 'UbuntuRise Connected Core — SA SME Growth OS.', kind: 'SME' },
  { name: 'ai-business-platform-4', url: 'https://github.com/seanie84/ai-business-platform-4', blurb: 'Earlier AI business platform.', kind: 'Other' },
  { name: 'arch-cactus-sapphire-apple', url: 'https://github.com/seanie84/arch-cactus-sapphire-apple', blurb: 'Earlier experiment.', kind: 'Other' },
  { name: 'breeze-brick-glade-brave', url: 'https://github.com/seanie84/breeze-brick-glade-brave', blurb: 'Earlier experiment.', kind: 'Other' },
  { name: 'desktop-tutorial', url: 'https://github.com/seanie84/desktop-tutorial', blurb: 'GitHub Desktop tutorial repo.', kind: 'Other' },
];

export const MODULES: ModuleEntry[] = [
  { to: '/dashboard', name: 'Home', group: 'NEXAS', blurb: 'Greeting, hubs, agents on duty.', source: 'NEXAS' },
  { to: '/hub', name: 'Business Hub', group: 'Business', blurb: 'Operations snapshot and doors into centers.', source: 'NEXAS' },
  { to: '/sme', name: 'SME', group: 'Business', blurb: 'SA small-business plans: CIPC, SARS, B-BBEE, hiring.', source: 'NEXAS' },
  { to: '/centers', name: 'Centers', group: 'Business', blurb: 'Sales, legal, finance, marketing, people, security.', source: 'NEXAS' },
  { to: '/watch', name: 'Tender watch', group: 'AI', blurb: 'Draft a watch. Does not fetch live tenders.', source: 'NEXAS' },
  { to: '/handoff', name: 'Handoff', group: 'AI', blurb: 'Amber routes a brief to the right specialist.', source: 'NEXAS' },
  { to: '/integrity', name: 'Integrity', group: 'AI', blurb: 'Checks keys, watches, and the log.', source: 'NEXAS' },
  { to: '/data', name: 'Data desk', group: 'Development', blurb: 'Export, import, role, and audit log.', source: 'NEXAS' },
  { to: '/repos', name: 'All repos', group: 'Command', blurb: 'Every repository on the account.', source: 'NEXAS' },
  { to: '/catalog', name: 'Full catalog', group: 'Command', blurb: 'Every module from this app and the previous version.', source: 'NEXAS' },
  { to: '/agents', name: 'Agents', group: 'NEXAS', blurb: '77 specialists.', source: 'NEXAS' },
  { to: '/missions', name: 'Missions', group: 'NEXAS', blurb: 'Amber turns a brief into a plan.', source: 'NEXAS' },
  { to: '/warroom', name: 'War Room', group: 'NEXAS', blurb: 'Ops board.', source: 'NEXAS' },
  { to: '/crm', name: 'CRM', group: 'NEXAS', blurb: 'Local contacts and follow-up drafts.', source: 'NEXAS' },
  { to: '/documents', name: 'Documents', group: 'NEXAS', blurb: 'Files and records.', source: 'NEXAS' },
  { to: '/analytics', name: 'Analytics', group: 'NEXAS', blurb: 'Numbers.', source: 'NEXAS' },
  { to: '/classroom', name: 'Classroom', group: 'NEXAS', blurb: 'Learning desk.', source: 'NEXAS' },
  { to: '/memory', name: 'Memory', group: 'NEXAS', blurb: 'Notes kept in this browser.', source: 'NEXAS' },
  { to: '/plugins', name: 'Plugins', group: 'NEXAS', blurb: 'Free engines.', source: 'NEXAS' },
  { to: '/quotes', name: 'Quotes', group: 'NEXAS', blurb: 'Draft quotes from a brief.', source: 'NEXAS' },
  { to: '/profile', name: 'Profile', group: 'NEXAS', blurb: 'Operator profile.', source: 'NEXAS' },
  { to: '/settings', name: 'Settings', group: 'NEXAS', blurb: 'Engine, keys, password. Ollama and LM Studio are already here.', source: 'NEXAS' },
  { to: '/ag-ui', name: 'AG-UI', group: 'NEXAS', blurb: 'Optional client. Off by default.', source: 'NEXAS' },
  { to: '/studio', name: 'Theme', group: 'NEXAS', blurb: 'HUD tokens.', source: 'NEXAS' },
  { to: '/tenders', name: 'Tender Desk', group: 'Previous', blurb: 'Open packs, gates, ranking. Draft only.', source: 'Previous' },
  { to: '/scout', name: 'Scout', group: 'Previous', blurb: 'Tender agent. Never submits.', source: 'Previous' },
  { to: '/procurement', name: 'Procurement', group: 'Previous', blurb: 'PPPFA, 80/20 or 90/10. Draft only.', source: 'Previous' },
  { to: '/campaigns', name: 'Campaigns', group: 'Previous', blurb: 'Ad and social drafts. Never auto-post.', source: 'Previous' },
  { to: '/government', name: 'Government', group: 'Previous', blurb: 'National, provinces, metros, SARS, tenders.', source: 'Previous' },
  { to: '/education', name: 'Education', group: 'Previous', blurb: 'Foundation through TVET and coding.', source: 'Previous' },
  { to: '/security', name: 'Security', group: 'Previous', blurb: 'Overlay, audit, scam scanner. No unsupervised cameras.', source: 'Previous' },
  { to: '/architect', name: 'Architect', group: 'Previous', blurb: 'Site layout, BOM, camera plan.', source: 'Previous' },
  { to: '/trading', name: 'Trading', group: 'Previous', blurb: 'Research watchlist only. No live brokerage.', source: 'Previous' },
  { to: '/sell', name: 'Sell', group: 'Previous', blurb: 'SME retainer offer, scripts, lead tracker.', source: 'Previous' },
  { to: '/store', name: 'Store', group: 'Previous', blurb: 'Quote-only product list.', source: 'Previous' },
  { to: '/operator', name: 'Operator', group: 'Previous', blurb: 'Draft loops. Nothing leaves without you.', source: 'Previous' },
  { to: '/knowledge', name: 'Knowledge', group: 'Previous', blurb: 'Boards, import and export.', source: 'Previous' },
];
