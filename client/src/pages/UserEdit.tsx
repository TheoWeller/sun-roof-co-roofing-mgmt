import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

import UserForm from "../components/forms/UserForm";
import { userActions, store } from "../store";
import { User } from "../types/User";

function UserEdit() {
  const { id } = useParams();
  const { selectedUser } = useSnapshot(store);

  useEffect(() => {
    const loadUser = async () => {
      if (!selectedUser && id) {
        try {
          await userActions.setSelectedUser(id);
        } catch (error) {
          console.error("Failed to load user", error);
        }
      }
    };

    loadUser();
  }, [id, selectedUser]);

  if (!selectedUser) {
    return <div>User not found</div>;
  }

  return (
    <UserForm
      isCreate={false}
      title="Update User"
      user={selectedUser as User}
    />
  );
}

export default UserEdit;
