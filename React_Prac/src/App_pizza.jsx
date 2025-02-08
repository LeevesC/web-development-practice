import { useState } from "react";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
];

export default function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return <header>Fast React Pizza Co.</header>;
}

function Menu() {
  return (
    <div>
      <h2>Our menu</h2>
      {pizzaData.map((pizza) => (
        <Pizza
          key={pizza.name}
          name={pizza.name}
          ingredients={pizza.ingredients}
          price={pizza.price}
        />
      ))}
    </div>
  );
}

function Pizza(promp) {
  return (
    <div>
      <img src="/" alt="xxx" />
      <h4>{promp.name}</h4>
      <p>{promp.ingredients}</p>
      <span>{promp.price}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer> {new Date().toLocaleTimeString()}We are currently open!</footer>
  );
}
