import React from 'react';
import './App.css';

const DataRow = (props) => (
  <div className="DataRow">
    <div className="Text">{props.text}</div>
    <div className="Controls">
      <button onClick={props.onSelect}>Select</button>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  </div>
)

const List = (props) => (
  <div className="List">
    { props.items.map((item) => (
      <DataRow
        key={item.id}
        {...item}
      />
    ))}
  </div>
)

const items = [
  { id: 'a', text: 'Foo' },
  { id: 'b', text: 'Bar' },
  { id: 'c', text: 'Baz' },
]

function App() {
  return (
    <div className="App">
      <List items={items} />
    </div>
  )
}

export default App
