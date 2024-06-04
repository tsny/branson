"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import BransonCard from "./card";

export function CardModal() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <BransonCard></BransonCard>
        </Modal.Body>
      </Modal>
    </>
  );
}
