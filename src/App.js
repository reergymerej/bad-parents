import React from 'react';
import './App.css';

const canDelete = (readOnly, isAdmin, isColors) => {
  return readOnly
    ? isAdmin && isColors
    : isAdmin
}

const canPromote = (admin, promoter, pendingVerification) => {
  return admin
    || (promoter && !pendingVerification)
}

const DataRow = (props) => {
  const {
    isColors,
    onDelete,
    onPromote,
    onSelect,
    readOnly,
    text,
    user = {},
  } = props
  const { promoter, pendingVerification, admin } = user
  return (
    <div className="DataRow">
      <div className="Text">{text}</div>
      <div className="Controls">
        { !readOnly
            && <button onClick={onSelect}>Select</button>
        }
        { !readOnly
            && canPromote(admin, promoter, pendingVerification)
            && <button onClick={onPromote}>Promote</button>
        }
        { canDelete(readOnly, admin, isColors)
            && <button onClick={onDelete}>Delete</button>
        }
      </div>
    </div>
  )
}

const List = (props) => (
  <div className="List">
    { props.items.map((item) => (
      <DataRow
        key={item.id}
        {...item}
        {...props}
      />
    ))}
  </div>
)

const ReadOnlyList = (props) => (
  <List
    {...props}
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
    pendingVerification: true,
  }
  return (
    <div className="App">
      <List
        items={items}
        user={user}
      />
      <ReadOnlyList
        isColors
        items={colors}
        user={user}
      />
    </div>
  )
}

export default App
