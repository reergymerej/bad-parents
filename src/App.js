import React from 'react';
import './App.css';

const DataRow = (props) => (
  <div className="DataRow">
    <div className="Text">{props.text}</div>
    <div className="Controls">
      <button onClick={props.onSelect}>Select</button>
      { props.user && props.user.admin
        && <button onClick={props.onPromote}>Promote</button>
      }
      { props.user && props.user.admin
        && <button onClick={props.onDelete}>Delete</button>
      }
    </div>
  </div>
)

const List = (props) => (
  <div className="List">
    { props.items.map((item) => (
      <DataRow
        key={item.id}
        {...item}
        user={props.user}
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
  const user = {
    admin: true,
  }
  return (
    <div className="App">
      <List
        items={items}
        user={user}
      />
    </div>
  )
}

export default App
