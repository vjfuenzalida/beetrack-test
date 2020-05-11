import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../store/actions";
import NewUserModal from "../../components/new-user-modal";
import IconButton from "../../components/icon-button";
import TablePagination from "../../components/table-pagination";
import SearchInput from "../../components/search-input";
import ContactsTable from "../../components/contacts-table";
import "./users.scss";

const Users = () => {
  const dispatch = useDispatch();

  // Retrieve Users from Redux
  const usersState = useSelector((state) => state.users);

  // Generate a local state using Hooks
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { users, pagination } = usersState;
  const { limit, prev, next } = pagination;

  const stableDispatch = useCallback(dispatch, []);

  // Shows/hides the new user modal
  const toggleModal = (modalState) => {
    setShowModal(modalState);
  };

  // Stores the debounced query into local state
  const saveQuery = (newValue) => {
    if (newValue && newValue !== "") {
      setCurrentPage(1);
    }
    setQuery(newValue);
  };

  // Dispatch index action for users and handles pagination on response
  const getContacts = useCallback(() => {
    const action = actions.users.index({ page: currentPage, limit, query });
    stableDispatch(action).then(({payload}) => {
      const {data = []} = payload;
      const noUsers = data.length === 0;
      if (noUsers && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    })
  }, [stableDispatch, currentPage, limit, query]);

  // Dispatch delete action for the selected user and then refreshes the users table
  const deleteContact = useCallback(
    (id) => {
      const deleteAction = actions.users.delete({ id });
      stableDispatch(deleteAction).then(() => {
        getContacts();
      });
    },
    [getContacts, stableDispatch]
  );

  // Dispatch create action based on the modal form data and then refreshes the users table
  const createContact = useCallback(
    (form) => {
      const createAction = actions.users.create(form);
      return stableDispatch(createAction).then(() => {
        const refreshAction = actions.users.index({ page: currentPage, limit });
        stableDispatch(refreshAction);
      });
    },
    [stableDispatch, currentPage, limit]
  );

  // Hook that refreshes data when the query or pagination changes
  useEffect(() => {
    getContacts(currentPage);
  }, [getContacts, query, currentPage]);

  return (
    <div className="container container-users">
      <div className="row view-title-wrapper">
        <div className="col-12">
          <h1 className="view-title-text">
            <span className="text-w-normal text-c-light-gray">Test</span>
            <span> </span>
            <span className="text-w-bold text-c-gray">Beetrack</span>
          </h1>
        </div>
      </div>
      <div></div>
      <div className="row">
        <div className="col-12">
          <div className="grid">
            <div className="search-input-wrapper">
              <SearchInput
                placeholder="Buscar contacto..."
                onChange={saveQuery}
              ></SearchInput>
            </div>
            <div className="new-user-button-wrapper">
              <IconButton
                text="Nuevo contacto"
                icon="plus-circle"
                onClick={() => toggleModal(true)}
              />
            </div>
            <div className="table-wrapper">
              <ContactsTable
                rows={users.value}
                onClickDelete={deleteContact}
              ></ContactsTable>
            </div>
            <div className="pagination-wrapper">
              <TablePagination
                prev={prev}
                next={next}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <NewUserModal
        show={showModal}
        onSubmit={createContact}
        onHide={() => toggleModal(false)}
      ></NewUserModal>
    </div>
  );
};

export default Users;
