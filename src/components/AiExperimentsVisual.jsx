import React, { useState } from 'react';
import { Cpu, Network, Zap, Binary, Sliders } from 'lucide-react';

export default function AiExperimentsVisual() {
  const [activePipeline, setActivePipeline] = useState('rag');

  const pipelines = [
    {
      id: 'rag',
      name: 'RAG Pipeline',
      tokens: '4,096 ctx',
      latency: '240ms',
      desc: 'Retrieval Augmented Generation with cosine vector indexing.',
    },
    {
      id: 'agent',
      name: 'ReAct Agent Loop',
      tokens: '8,192 ctx',
      latency: '510ms',
      desc: 'Reasoning + Acting iterative tool orchestration loop.',
    },
    {
      id: 'eval',
      name: 'Prompt Benchmarker',
      tokens: '16,384 ctx',
      latency: '780ms',
      desc: 'Automated temperature & top-p response variance scoring.',
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#090909] border border-white/10 p-4 font-mono text-xs flex flex-col justify-between space-y-3 shadow-inner">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Network className="w-3.5 h-3.5 text-[#89AACC]" />
          <span className="text-white font-medium">Neural Architecture Inspector</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live Model Weights
        </span>
      </div>

      {/* Abstract Neural Nodes Grid */}
      <div className="relative h-20 bg-black/40 rounded-xl border border-white/5 p-3 flex items-center justify-around overflow-hidden">
        <div className="absolute inset-0 bg-dots-subtle opacity-40" />

        {/* Layer 1 Nodes */}
        <div className="flex flex-col gap-2 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#89AACC] animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#89AACC]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#89AACC]/80 animate-pulse [animation-delay:0.3s]" />
        </div>

        {/* Synapse Lines */}
        <div className="flex-1 px-4 flex items-center justify-center text-[10px] text-muted/60">
          <div className="w-full h-[1px] bg-gradient-to-r from-[#89AACC]/30 via-white/40 to-[#4E85BF]/30 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[#161616] text-[9px] border border-white/10 text-[#89AACC]">
              Softmax Attention
            </div>
          </div>
        </div>

        {/* Layer 2 Nodes */}
        <div className="flex flex-col gap-2 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4E85BF] animate-pulse [animation-delay:0.5s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4E85BF]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4E85BF]/50" />
        </div>
      </div>

      {/* Interactive Pipeline Tabs */}
      <div className="grid grid-cols-3 gap-1.5">
        {pipelines.map((p) => {
          const isSelected = activePipeline === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePipeline(p.id)}
              className={`p-2 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? 'bg-white/10 border-[#89AACC]/50 text-white'
                  : 'bg-white/[0.02] border-white/5 text-muted hover:border-white/15'
              }`}
            >
              <div className="text-[10px] font-semibold truncate">{p.name}</div>
              <div className="text-[9px] text-[#89AACC] mt-0.5">{p.latency}</div>
            </button>
          );
        })}
      </div>

      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-sans text-muted">
        {pipelines.find((p) => p.id === activePipeline)?.desc}
      </div>
    </div>
  );
}
