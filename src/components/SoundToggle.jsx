import { useState, useCallback } from 'react';
import { soundEngine } from '../utils/soundEngine';

export function SoundToggle() {
  const [on, setOn] = useState(false);

  const toggle = useCallback(() => {
    const enabled = soundEngine.toggle();
    setOn(enabled);
    if (enabled) soundEngine.play('click');
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Mute sound' : 'Enable sound'}
      className={`relative p-1.5 transition-all duration-300 rounded-full ${on ? 'text-[#c4a35a]' : 'opacity-40 hover:opacity-80'}`}
      title={on ? 'Sound on' : 'Sound off'}
    >
      {on ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
      {on && (
        <span className="absolute inset-0 rounded-full border border-[#c4a35a] animate-ping opacity-30" />
      )}
    </button>
  );
}
