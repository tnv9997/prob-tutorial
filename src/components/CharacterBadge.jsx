import React from 'react';

export default function CharacterBadge({ character }) {
  if (!character) return null;

  return (
    <div className="character-badge" style={{ borderColor: character.color }}>
      <span className="character-emoji">{character.emoji}</span>
      <div>
        <div className="character-name" style={{ color: character.color }}>{character.name}</div>
        <div className="character-personality">{character.personality}</div>
      </div>
    </div>
  );
}
