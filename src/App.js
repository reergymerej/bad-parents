import React from 'react';
import './App.css';

const canDelete = (readOnly, isAdmin, isColors) => {
  return readOnly
    ? isAdmin && isColors
    : isAdmin
}

const canPromote = (readOnly, admin, promoter, pendingVerification) => {
  return !readOnly
    && (admin
    || (promoter && !pendingVerification)
    )
}

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


const List = (props) => {
  const { user: { admin, promoter, pendingVerification }} = props
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
          canPromote={canPromote(
            props.readOnly,
            admin,
            promoter,
            pendingVerification
          )}
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
        isColors
        items={colors}
        user={user}
      />
    </div>
  )
}

export default App
