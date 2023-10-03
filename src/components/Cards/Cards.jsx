import React from 'react';
import Card from '../Card/Card';
import styledCards from './Cards.module.css';

export default function Cards(props) {
  const { characters, onClose } = props;

  return (
    
    <div className={styledCards.cardsContainer}>
      <div className={styledCards.cards}>
        {characters.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            status={item.status}
            species={item.species}
            gender={item.gender}
            origin={item.origin}
            image={item.image}
            onClose={() => onClose(item.id)}
          />
        ))}
      </div>
    </div>
  );
}