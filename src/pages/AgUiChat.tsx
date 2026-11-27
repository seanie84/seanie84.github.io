import { useState, type CSSProperties, type FormEvent } from "react";
import { getAgUiEndpoint, isAgUiEnabled, parseAgUiSse } from "../lib/nexa-ag-ui";

export default function AgUiChat() {
  const enabled = isAgUiEnabled();
  const endpoint = getAgUiEndpoint();
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(event: FormEvent) {
    event.preventDefault();
    const current = getAgUiEndpoint();
    if (!isAgUiEnabled()) {
      setStatus("AG-UI is off. Enable it in Settings or add ?agui=1.");
      return;
    }
    if (!current) {
      setStatus("No AG-UI endpoint configured. This site does not share the NEXORA database. Set an endpoint in Settings first.");
      return;
    }
    setBusy(true);
    setStatus("Streaming...");
    setOutput("");
    try {
      const response = await fetch(current, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: "nexa-site",
          runId: "run-" + Date.now(),
          messages: [{ id: "u1", role: "user", content: message }],
        }),
      });
      if (!response.ok) throw new Error("Request failed (" + response.status + ")");
      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split("\n\n");
        buffer = frames.pop() || "";
        for (const frame of frames) {
          for (const eventItem of parseAgUiSse(frame)) {
            if (eventItem.type === "TEXT_MESSAGE_CONTENT" && eventItem.delta) {
              text += eventItem.delta;
              setOutput(text);
            }
            if (eventItem.type === "RUN_ERROR") {
              throw new Error(eventItem.message || "AG-UI run failed");
            }
            if (eventItem.type === "RUN_FINISHED" && eventItem.outcome?.type === "interrupt") {
              setStatus("Approval required. Draft only. Nothing was sent from this site.");
            }
          }
        }
      }
      if (text && !status.startsWith("Approval")) setStatus("Done.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">AG-UI chat</h1>
      <p className="page-sub">Optional client only. Flag is off by default and the endpoint starts empty so this site never talks to NEXORA unless you set a URL.</p>
      <form onSubmit={send} style={{ display: "grid", gap: 12, maxWidth: 720 }}>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} style={field} placeholder="Ask a draft question" />
        <button type="submit" disabled={busy || !message.trim()} style={btn}>{busy ? "Streaming..." : "Send"}</button>
      </form>
      {status && <p style={{ marginTop: 16, color: "var(--ink-2)" }}>{status}</p>}
      {output && <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{output}</pre>}
      {!enabled && <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 13 }}>AG-UI is off. Enable it in Settings.</p>}
      {enabled && !endpoint && <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 13 }}>No endpoint set. Add one in Settings.</p>}
    </div>
  );
}

const field: CSSProperties = {
  width: "100%", padding: "12px 14px",
  background: "var(--void)", border: "1px solid var(--line)", borderRadius: 12,
  color: "var(--ink)", fontSize: 14, outline: "none",
};
const btn: CSSProperties = {
  padding: "10px 16px", borderRadius: 12, border: "none", width: "fit-content",
  background: "var(--cyan)", color: "#042f2e", fontWeight: 700, cursor: "pointer",
};
