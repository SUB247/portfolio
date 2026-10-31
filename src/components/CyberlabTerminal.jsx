import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw } from 'lucide-react';

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
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#121212] border-b border-white/10">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-[11px] sm:text-xs text-muted font-mono flex items-center gap-1">
            <TerminalIcon className="w-3.5 h-3.5 text-[#89AACC]" /> cyberlab-shell
          </span>
        </div>
        <button
          onClick={resetTerminal}
          className="text-muted hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
          title="Reset Sandbox"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-3 sm:p-4 max-h-44 sm:max-h-52 overflow-y-auto space-y-2 text-text/90">
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'system' && (
              <span className="text-[#89AACC]">{item.text}</span>
            )}
            {item.type === 'cmd' && (
              <div className="flex items-center gap-1 text-white">
                <span className="text-emerald-400 shrink-0">
                  <span className="hidden sm:inline">user@cyberlab:</span>~$
                </span>
                <span>{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-text/80 pl-3 sm:pl-4 whitespace-pre-wrap font-sans text-xs sm:text-[11px] bg-white/[0.03] p-2 rounded-lg border border-white/5 my-1 leading-relaxed">
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Command Suggestion Chips */}
      <div className="px-3 sm:px-4 py-2 bg-[#0e0e0e] border-t border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] sm:text-[10px] text-muted uppercase font-mono mr-1">Try:</span>
        {['scan', 'decrypt', 'status', 'hint', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 active:bg-white/20 text-xs sm:text-[10px] font-mono text-[#89AACC] border border-white/10 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <div className="flex items-center px-3 sm:px-4 py-2.5 bg-[#0c0c0c] border-t border-white/10">
        <span className="text-emerald-400 mr-2 shrink-0 text-xs sm:text-xs font-mono">
          <span className="hidden sm:inline">user@cyberlab:</span>~$
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. scan, decrypt)..."
          className="bg-transparent flex-1 text-white focus:outline-none text-sm sm:text-xs font-mono placeholder:text-muted/40 min-w-0"
        />
        <button
          onClick={() => executeCommand()}
          className="text-muted hover:text-white p-1.5 ml-1 rounded hover:bg-white/5 shrink-0"
          aria-label="Run command"
        >
          <Play className="w-3.5 h-3.5 text-[#89AACC]" />
        </button>
      </div>
    </div>
  );
}
