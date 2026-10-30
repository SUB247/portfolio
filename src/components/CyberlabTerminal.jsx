import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CyberlabTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: '[+] CYBERLAB Virtual Sandbox v1.2 initialized.' },
    { type: 'system', text: '[+] Target: sandbox.uit.local [10.0.4.12]' },
    { type: 'cmd', text: 'scan --ports 22,80,443' },
    { type: 'output', text: 'Port 22/tcp: Open (SSH)\nPort 80/tcp: Open (Nginx)\nPort 443/tcp: Open (HTTPS)' },
    { type: 'system', text: '[!] Mission: Detect authorization token leakage.' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const executeCommand = (cmdText) => {
    const trimmed = (cmdText || inputVal).trim().toLowerCase();
    if (!trimmed) return;

    let response = '';
    if (trimmed === 'help') {
      response = 'Available commands: scan, decrypt, status, clear, flag, hint';
    } else if (trimmed.startsWith('scan')) {
      response = '[+] SCAN COMPLETE: Found misconfigured /api/v1/auth endpoint with debug mode enabled.';
    } else if (trimmed.startsWith('decrypt')) {
      response = '[+] HASH MATCH: sha256_token decrypted -> FLAG{cyberlab_packet_inspected_successfully}';
    } else if (trimmed === 'status') {
      response = '[*] Progress: 3 of 5 missions completed. Score: 850 PTS.';
    } else if (trimmed === 'hint') {
      response = '[i] Hint: Check the HTTP headers for x-debug-session token.';
    } else if (trimmed === 'clear') {
      setHistory([{ type: 'system', text: '[+] Screen cleared.' }]);
      setInputVal('');
      return;
    } else {
      response = `Command not recognized: "${trimmed}". Type "help" for options.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'cmd', text: trimmed },
      { type: 'output', text: response }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  const resetTerminal = () => {
    setHistory([
      { type: 'system', text: '[+] CYBERLAB Sandbox reset.' },
      { type: 'cmd', text: 'status' },
      { type: 'output', text: '[*] Sandbox ready for interactive testing.' },
    ]);
  };

  return (
    <div className="w-full rounded-2xl bg-[#080808] border border-white/10 overflow-hidden font-mono text-xs shadow-inner">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#121212] border-b border-white/10">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-[11px] text-muted font-mono flex items-center gap-1">
            <TerminalIcon className="w-3 h-3 text-[#89AACC]" /> cyberlab-shell
          </span>
        </div>
        <button
          onClick={resetTerminal}
          className="text-muted hover:text-white transition-colors p-1"
          title="Reset Sandbox"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-3.5 max-h-48 overflow-y-auto space-y-1.5 text-text/90">
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'system' && (
              <span className="text-[#89AACC]">{item.text}</span>
            )}
            {item.type === 'cmd' && (
              <div className="flex items-center gap-1.5 text-white">
                <span className="text-emerald-400">user@cyberlab:~$</span>
                <span>{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-muted pl-4 whitespace-pre-wrap font-sans text-[11px] bg-white/[0.02] p-1.5 rounded border border-white/5 my-1">
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Command Suggestion Chips */}
      <div className="px-3.5 py-1.5 bg-[#0e0e0e] border-t border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-muted uppercase font-mono mr-1">Try:</span>
        {['scan', 'decrypt', 'status', 'hint', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#89AACC] border border-white/10 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <div className="flex items-center px-3.5 py-2 bg-[#0c0c0c] border-t border-white/10">
        <span className="text-emerald-400 mr-2">user@cyberlab:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. scan, decrypt)..."
          className="bg-transparent flex-1 text-white focus:outline-none text-xs font-mono placeholder:text-muted/40"
        />
        <button
          onClick={() => executeCommand()}
          className="text-muted hover:text-white p-1"
        >
          <Play className="w-3 h-3 text-[#89AACC]" />
        </button>
      </div>
    </div>
  );
}
