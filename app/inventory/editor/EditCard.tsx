"use client";
import { createOrUpdateCard } from "@/app/actions";
import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { Card as BCard } from "@prisma/client";

interface EditCardModalProps {
  show: boolean;
  onClose: () => void;
  card?: BCard;
}

export function EditCardModal(props: EditCardModalProps) {
  let card = props.card;

  return (
    <>
      <Modal onClose={props.onClose} show={props.show} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="max-w-sm">
            <form
              action={async (formData) => {
                await createOrUpdateCard(formData);
                props.onClose();
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email1" value="Card title" />
                </div>
                <input hidden name="cardid" value={card?.id} />
                <TextInput
                  defaultValue={card?.title}
                  name="cardtitle"
                  required
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="desc" value="Description" />
                </div>
                <TextInput defaultValue={card?.desc} name="desc" required />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="url" value="Image URL" />
                </div>
                <TextInput
                  defaultValue={card?.imageURL || ""}
                  type="url"
                  name="img"
                  required
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="quote" value="Quote" />
                </div>
                <TextInput defaultValue={card?.quote || ""} name="quote" />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="rarity" value="Rarity" />
                </div>
                <TextInput defaultValue={card?.rarity} name="rarity" required />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email1" value="Type" />
                </div>
                <TextInput defaultValue={card?.type} name="type" required />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="weight" value="Weight" />
                </div>
                <TextInput
                  min={1}
                  defaultValue={card?.weight}
                  name="weight"
                  type="number"
                  required
                />
              </div>
              <Button type="submit">
                {card?.title === "" ? "Update" : "Submit"}{" "}
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
