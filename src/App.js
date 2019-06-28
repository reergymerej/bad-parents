import React from 'react';
import './App.css';


const DataRow = (props) => (
  <div className="DataRow">
    <div className="Text">{props.text}</div>
    <div className="Controls">
      { props.canSelect
          && <button onClick={props.onSelect}>Select</button>
      }
      { props.canPromote
          && <button onClick={props.onPromote}>Promote</button>
      }
      { props.canDelete
          && <button onClick={props.onDelete}>Delete</button>
      }
    </div>
  </div>
)

DataRow.defaultProps = {
  canDelete: false,
  canPromote: true,
  canSelect: true,
}


const List = (props) => (
  <div className="List">
    { props.items.map((item) => (
      <DataRow
        canDelete={props.canDelete}
        canPromote={props.canPromote}
        canSelect={props.canSelect}
        key={item.id}
        text={item.text}
      />
    ))}
  </div>
)


const canDelete = (admin, isColors, isNames) => {
  return admin && (isColors || isNames)
}

const ReadOnlyList = (props) => (
  <List
    items={props.items}
    canSelect={false}
    canPromote={false}
    canDelete={props.canDelete}
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

const names = [
  { id: 'john', text: 'john' },
  { id: 'jacob', text: 'jacob' },
  { id: 'jingle', text: 'jingle' },
  { id: 'heimer', text: 'heimer' },
  { id: 'schmidt', text: 'schmidt' },
]

const canPromote = (admin, promoter, pendingVerification) => {
  return admin
    || (promoter && !pendingVerification)
}

function App() {
  const user = {
    admin: true,
    promoter: true,
    pendingVerification: false,
  }
  const userCanPromote = canPromote(
    user.admin,
    user.promoter,
    user.pendingVerification
  )
  return (
    <div className="App">
      <List
        items={items}
        user={user}
        canPromote={userCanPromote}
        canDelete={user.admin}
      />
      <ReadOnlyList
        isColors
        items={colors}
        user={user}
        canDelete={canDelete(
          user.admin,
          true,
          false
        )}
      />

      <ReadOnlyList
        isNames
        items={names}
        user={user}
        canDelete={canDelete(
          user.admin,
          false,
          true
        )}
      />
    </div>
  )
}

export default App
