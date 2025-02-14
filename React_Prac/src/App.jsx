import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const itemsNum = items.length;
  const packedNum = items.reduce(
    (total, curr) => (total += curr.packed ? 1 : 0),
    0
  );

  function handleDelete(id) {
    // update items Array
    setItems(items.filter((item) => item.id != id));
  }

  function handlePacked(id) {
    // using map to update certain element's property
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleSort(e) {
    // e.preventDefault();
    const method = e.currentTarget.value;
    if (method === "input") {
      setItems((items) => [...items].sort((a, b) => a.id - b.id));
    } else if (method === "description") {
      // console.log(items);
      setItems((items) =>
        [...items].sort((a, b) => a.description.localeCompare(b.description))
      );
      // console.log(items);
    } else if (method === "packed") {
      setItems((items) =>
        [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
      );
    }
  }

  function hanldeClear() {
    setItems(() => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onPacked={handlePacked}
        onSorting={handleSort}
        onClear={hanldeClear}
      />
      <Stats itemsNum={itemsNum} packedNum={packedNum} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ items, setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    setItems((items) => [
      ...items,
      {
        description: description,
        quantity: quantity,
        packed: false,
        id: Date.now(),
      },
    ]);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onPacked, onSorting, onClear }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onPacked={onPacked}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select onChange={onSorting}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPacked }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onPacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ itemsNum, packedNum }) {
  return (
    <footer className="stats">
      <em>
        You have {itemsNum} items on your list, and you packed {packedNum} (
        {packedNum ? Math.round((packedNum / itemsNum) * 100, 2) : 0}%)
      </em>
    </footer>
  );
}
