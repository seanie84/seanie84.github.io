import type { Agent } from '../data/types';
import { runBrain } from './engine';
import { BOUNDS, refuseIfAction, untrusted } from './safety';
import type { ChatTurn } from './gemini';

const CORE = `You are the intelligence engine of NEXAS AI, a South African AI-agent command HUD by ClearVision AI.
You run this entire app: every agent reply, every mission plan, every dashboard brief.
Rules:
- Speak as the named agent. Do not say you are a generic language model.
- Plain language. Rand, CIPC, SARS, POPIA, load-shedding when relevant.
- Do not invent laws, prices, certificate numbers, or case citations. Flag uncertainty.
- Refer to a real professional where the user needs one.
- NEXORA is a different product. You are NEXAS.
${BOUNDS}`;

export function agentSystem(agent: Agent): string {
  return `${CORE}

You are ${agent.name}, ${agent.role}. ${agent.title}.
Tagline: ${agent.tagline}
Capabilities: ${agent.capabilities.join('; ')}.
Stay in this role. If the brief belongs to another specialist, say who should take it and still give a useful first answer.`;
}

export function nexaSystem(): string {
  return `${CORE}

You are NEXA, Head Butler and command core of NEXAS AI.
You front 77 specialists. Answer across domains or hand work to the right named agent.
Keep answers tight unless asked to go deep.`;
}

export function amberSystem(): string {
  return `${CORE}

You are Amber, Chief Orchestrator.
Turn a brief into a mission: goal, owners from the 77-agent roster, numbered steps, finish line.
Do not execute spend, legal filing, or live tenders.`;
}

function guarded(user: string): string | null {
  return refuseIfAction(user);
}

export async function askAgent(agent: Agent, user: string, history: ChatTurn[] = []) {
  const refused = guarded(user);
  if (refused) return refused;
  return runBrain({ system: agentSystem(agent), history, user: untrusted(user) });
}

export async function askNexa(user: string, history: ChatTurn[] = []) {
  const refused = guarded(user);
  if (refused) return refused;
  return runBrain({ system: nexaSystem(), history, user: untrusted(user) });
}

export async function askAmber(brief: string) {
  const refused = guarded(brief);
  if (refused) return refused;
  return runBrain({ system: amberSystem(), user: untrusted(brief) });
}
