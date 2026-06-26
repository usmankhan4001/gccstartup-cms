import React from 'react';

interface RequirementListProps {
  items: string[];
}

export default function RequirementList({ items }: RequirementListProps) {
  return (
    <ul className="req-list reveal">
      {items.map((item, i) => (
        <li key={i}>
          <span className="req-ic">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
