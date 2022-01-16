import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import { useState, useRef } from "react";
export const ErrorPopup = ({ title, text, setIsOpen, isOpen }) => {
  //   const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{text}</AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
