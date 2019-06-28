import React from 'react';
import './App.css';

const DataRow = (props) => (
  <div className="DataRow">
    <div className="Text">{props.text}</div>
    <div className="Controls">
      { !props.readOnly
        && <button onClick={props.onSelect}>Select</button>
      }
      { !props.readOnly
          && (props.user
            && (props.user.admin
              || (props.user.promoter && !props.user.pendingVerification)
            ))
          && <button onClick={props.onPromote}>Promote</button>
      }
      { !props.readOnly
        && (props.user && props.user.admin)
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
        readOnly={props.readOnly}
      />
    ))}
  </div>
)

const ReadOnlyList = (props) => (
  <List
    items={props.items}
    user={props.user}
    readOnly
  />
)

const items = [
  { id: 'a', text: 'Foo' },
  { id: 'b', text: 'Bar' },
  { id: 'c', text: 'Baz' },
]

const colors = [
  { id: 'red', text: 'red' },
  { id: 'orange', text: 'orange' },
  { id: 'yellow', text: 'yellow' },
  { id: 'green', text: 'green' },
  { id: 'blue', text: 'blue' },
  { id: 'indigo', text: 'indigo' },
  { id: 'violet', text: 'violet' },
]

function App() {
  const user = {
    admin: true,
    promoter: true,
    pendingVerification: false,
  }
  return (
    <div className="App">
      <List
        items={items}
        user={user}
      />
      <ReadOnlyList
        items={colors}
        user={user}
      />
    </div>
  )
}

export default App
