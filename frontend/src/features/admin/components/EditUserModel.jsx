// src/features/admin/components/EditUserModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

const EditUserModal = ({ isOpen, onClose, user, onUserUpdated }) => {
  const [role, setRole] = useState("user");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setIsPaid(user.isPaid);
    }
  }, [user]);

  const handleSubmit = () => {
    onUserUpdated({ role, isPaid });
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <label>
            Role:
            <select
              className="border p-2 w-full rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
            Paid
          </label>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Update User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
