type Script = 'hindi' | 'roman';

interface ScriptToggleProps {
  onScriptChange: (script: Script) => void;
  currentScript: Script;
}

export function ScriptToggle({ onScriptChange, currentScript }: ScriptToggleProps) {
  const toggleScript = () => {
    const newScript = currentScript === 'hindi' ? 'roman' : 'hindi';
    onScriptChange(newScript);
  };

  return (
    <button
      onClick={toggleScript}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 sans-text font-medium transition-colors text-sm"
      aria-label="Toggle script"
      title={currentScript === 'hindi' ? 'Switch to Roman' : 'हिंदी में बदलें'}
    >
      <span className={`text-xs font-medium ${currentScript === 'hindi' ? 'text-rose-900' : 'text-stone-500'}`}>
        देव
      </span>
      <span className="text-xs opacity-40">|</span>
      <span className={`text-xs font-medium ${currentScript === 'roman' ? 'text-rose-900' : 'text-stone-500'}`}>
        ROM
      </span>
    </button>
  );
}

