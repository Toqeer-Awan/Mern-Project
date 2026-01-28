import React from "react";

const Cards = () => {
  const cardsData = [
    {
      id: 1,
      title: "Card 1",
      description:
        "This is dummy card. To check responsiveness of this project for all screens.",
    },
    {
      id: 2,
      title: "Card 2",
      description:
        "This is dummy card. To check responsiveness of this project for all screens.",
    },
    {
      id: 3,
      title: "Card 3",
      description:
        "This is dummy card. To check responsiveness of this project for all screens.",
    },
    {
      id: 4,
      title: "Card 4",
      description:
        "This is dummy card. To check responsiveness of this project for all screens.",
    },
  ];
  
  return (
    <div className="p-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {cardsData.map((card) => (
          <div 
            key={card.id} 
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;