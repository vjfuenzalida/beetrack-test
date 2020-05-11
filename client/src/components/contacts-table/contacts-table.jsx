import React, { createContext, useContext, useState } from 'react';
import "./contacts-table.scss";
import ContactCard from "../contact-card";

const TableContext = createContext();

const TableHeader = (props) => {
  return (
    <div className="table-headers">
      <div className="header-name">
        <span className="text-w-bold text-c-gray">Nombre</span>
      </div>
      <div className="header-description">
        <span className="text-w-bold text-c-gray">Descripción</span>
      </div>
    </div>
  );
};

// The TableRow component renders a user card and a text block next to it
// with the user's description.
const TableRow = (props) => {
  const { id, name, photo, description, onClickDelete } = props;
  const { currentRow, setCurrentRow } = useContext(TableContext);
  
  const isHovered = currentRow === id;

  return (
    <div key={id} className="table-row" onMouseEnter={() => setCurrentRow(id)} onMouseLeave={() => setCurrentRow(null)}>
      <div className="row-element row-user">
        <ContactCard
          name={name}
          photo={photo}
          showAction={isHovered}
          onClickDelete={() => onClickDelete(id)}
        ></ContactCard>
      </div>
      <div className="row-element row-description">
        <span className="text-c-gray">{description}</span>
      </div>
    </div>
  );
};

// The TableRows component renders a TableRow component for every user in
// the rows array. If no data is available, a message is shown instead.
const TableRows = (props) => {
  const { rows, onClickDelete } = props;
  if (!rows || rows.length === 0) {
    return (
      <div className="no-registries">
        <h3 className="text-c-gray">No hay registros disponibles</h3>
      </div>
    )
  }
  return rows.map((row) => {
    const data = {...row, onClickDelete}
    return (
      <TableRow key={row.id} {...data}></TableRow>
    );
  });
};

// The ContactsTable component receives an array with users data and a method
// for user deletion. It then renders a header and all the rows, passing down the method
// to its children (with added behavior).
const ContactsTable = (props) => {
  const { rows, onClickDelete } = props;
  const [currentRow, setCurrentRow] = useState({currentRow: null});
  const wrappedDelete = (...params) => {
    setCurrentRow(null);
    onClickDelete(...params);
  }
  return (
    <TableContext.Provider value={{currentRow, setCurrentRow}}>
      <div className="table-container">
        <TableHeader />
        <TableRows rows={rows} onClickDelete={wrappedDelete} />
      </div>
    </TableContext.Provider>
  );
};

export default ContactsTable;
