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


const canDelete = (readOnly, isAdmin, isColors) => {
  return readOnly
    ? isAdmin && isColors
    : isAdmin
}

const List = (props) => {
  const { user: { admin}} = props
  return (
    <div className="List">
      { props.items.map((item) => (
        <DataRow
          key={item.id}
          {...{
            canDelete: props.canDelete,
            canPromote: props.canPromote,
            canSelect: props.canSelect,
          }}
          canDelete={canDelete(
            props.readOnly,
            admin,
            props.isColors
          )}
          text={item.text}
        />
      ))}
    </div>
  )
}

const ReadOnlyList = (props) => (
  <List
    {...props}
    canSelect={false}
    canPromote={false}
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

const canPromote = (admin, promoter, pendingVerification) => {
  return admin
    || (promoter && !pendingVerification)
}

function App() {
  const user = {
    admin: false,
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
