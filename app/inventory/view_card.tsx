"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import BransonCard from "./card";

interface ViewCardProps {
  show: boolean;
}

export function CardModal(props: ViewCardProps) {
  const [openModal, setOpenModal] = useState(props.show);

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
