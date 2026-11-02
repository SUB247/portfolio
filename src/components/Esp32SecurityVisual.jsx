import React, { useState } from 'react';
import { Radio, ShieldAlert, Cpu, Activity, CheckCircle2, Lock } from 'lucide-react';

export default function Esp32SecurityVisual() {
  const [activeChannel, setActiveChannel] = useState(37);
  const [isScanning, setIsScanning] = useState(false);

  const channels = [
    { num: 37, freq: "2402 MHz", desc: "Primary Advertising Channel A" },
    { num: 38, freq: "2426 MHz", desc: "Primary Advertising Channel B" },
    { num: 39, freq: "2480 MHz", desc: "Primary Advertising Channel C" }
  ];

  const packetLog = [
    { time: "00:01.24", type: "ADV_IND", rssi: "-54 dBm", payload: "0x02 0x01 0x06 (Flags)" },
    { time: "00:01.38", type: "SCAN_RSP", rssi: "-52 dBm", payload: "Local Name: 'LAB_TEST_ESP32'" },
    { time: "00:01.55", type: "BLE_BEACON", rssi: "-59 dBm", payload: "UUID: 0xFD6F (Telemetry)" }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#080808] border border-white/10 overflow-hidden font-mono text-xs shadow-inner">
      {/* Top Hardware Telemetry Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#121212] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-[#4E85BF]/20 border border-[#89AACC]/30 flex items-center justify-center">
            <Cpu className="w-3 h-3 text-[#89AACC]" />
          </div>
          <span className="font-semibold text-white text-xs">ESP32-WROOM-32D</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Isolated Lab
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-[#89AACC]">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">2.4 GHz ISM</span>
        </div>
      </div>

      {/* BLE Channel Selector */}
      <div className="p-3 sm:p-4 bg-black/40 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] text-muted uppercase">BLE Channels:</span>
          {channels.map((ch) => (
            <button
              key={ch.num}
              onClick={() => setActiveChannel(ch.num)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                activeChannel === ch.num
                  ? 'bg-[#89AACC]/20 border-[#89AACC]/60 text-white font-semibold'
                  : 'bg-white/[0.03] border-white/10 text-muted hover:text-white'
              }`}
            >
              CH {ch.num}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-[#89AACC] flex items-center gap-1.5">
          <Activity className="w-3 h-3" />
          <span>{channels.find((c) => c.num === activeChannel)?.desc}</span>
        </div>
      </div>

      {/* Captured Frames Telemetry View */}
      <div className="p-3 sm:p-4 space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
        <div className="text-[11px] text-muted flex items-center justify-between pb-1 border-b border-white/5">
          <span>FRAME LOG</span>
          <span>PACKET PAYLOAD DUMP</span>
        </div>
        {packetLog.map((pkt, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-text/90"
          >
            <div className="flex items-center space-x-2">
              <span className="text-[#89AACC] font-semibold">{pkt.type}</span>
              <span className="text-muted text-[10px]">{pkt.rssi}</span>
            </div>
            <span className="text-muted/90 truncate max-w-[190px] sm:max-w-xs">{pkt.payload}</span>
          </div>
        ))}
      </div>

      {/* Lab Safety Assurance Footnote */}
      <div className="px-3.5 py-2 bg-[#0c0c0c] border-t border-white/10 flex items-center justify-between text-[11px] text-muted">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Controlled Educational Research</span>
        </div>
        <span className="text-muted/60">Strictly Non-Disruptive Scope</span>
      </div>
    </div>
  );
}
