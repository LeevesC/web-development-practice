import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [friends, setFriends] = useState([...initialFriends]);
  const [selected, setSelected] = useState(null);

  function handleShowAdd() {
    setShowAdd((value) => !value);
  }
  function addNewFriend(newFriend) {
    setFriends((value) => [...value, newFriend]);
  }
  function handleSelected(id) {
    setSelected((selected) => (selected === id ? null : id));
    setShowAdd(false);
  }
  function updateBalance(newBalance) {
    setFriends((values) =>
      values.map((item) =>
        item.id === selected ? { ...item, balance: newBalance } : item
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelected={handleSelected}
          selected={selected}
        />
        {showAdd && <FormAddFriend addNewFriend={addNewFriend} />}
        <Button onClick={handleShowAdd}>
          {showAdd ? "Close Add" : "Add friend"}
        </Button>
      </div>
      {selected && (
        <FormSplitBill
          selected={selected}
          friends={friends}
          updateBalance={updateBalance}
          key={selected}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, handleSelected, selected }) {
  return (
    <ul>
      {friends.map((i) => (
        <Friend
          key={i.id}
          friend={i}
          handleSelected={handleSelected}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelected, selected }) {
  return (
    <li className={selected === friend.id ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance > 0
          ? `${friend.name} owes me $${Math.abs(friend.balance)}`
          : friend.balance < 0
          ? `I own ${friend.name} $${Math.abs(friend.balance)}`
          : "You are even"}
      </p>
      <Button onClick={() => handleSelected(friend.id)}>
        {selected === friend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ addNewFriend }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = Date.now() % 1000000;
    const newFriend = {
      id: id,
      name: name,
      image: `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };
    // add new friend
    addNewFriend(newFriend);
    setName(() => "");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>F friend name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>I image URL</label>
      <input type="text" disabled />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selected, friends, updateBalance }) {
  const theRole = friends.find((i) => i.id === selected);
  const [billValue, setValue] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [whoPay, setWhoPay] = useState("user");
  function handleSplit(e) {
    e.preventDefault();
    const balance = whoPay === "user" ? billValue - myExpense : -myExpense;
    console.log(balance);
    updateBalance(balance);
    setValue("");
    setMyExpense("");
    setWhoPay("user");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>Split a bill with {theRole.name}</h2>

      <label>Bill value</label>
      <input
        type="text"
        onChange={(e) => setValue(e.currentTarget.value)}
        value={billValue}
      />

      <label>Your expense</label>
      <input
        type="text"
        onChange={(e) => setMyExpense(e.currentTarget.value)}
        value={myExpense}
      />

      <label>{theRole.name}'s expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select onChange={(e) => setWhoPay(e.currentTarget.value)} value={whoPay}>
        <option value="user">Me</option>
        <option value="friend">{theRole.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
