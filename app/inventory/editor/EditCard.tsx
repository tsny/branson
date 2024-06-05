"use client";
import { createNewCard } from "@/app/actions";
import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { Card as BCard } from "@prisma/client";

interface EditCardModalProps {
  show: boolean;
  onClose: () => void;
  card?: BCard;
}

export function EditCardModal(props: EditCardModalProps) {
  return (
    <>
      <Modal onClose={props.onClose} show={props.show} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <Card className="max-w-sm">
            <form
              action={async (formData) => {
                if (props.card?.title) {
                  alert("should update");
                } else {
                  alert("Should submit");
                }
                await createNewCard(formData);
                props.onClose();
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Card title" />
                </div>
                <TextInput
                  defaultValue={props?.card?.title}
                  name="cardtitle"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="desc" value="Description" />
                </div>
                <TextInput
                  defaultValue={props.card?.desc}
                  name="desc"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="url" value="Image URL" />
                </div>
                <TextInput
                  defaultValue={props.card?.imageURL || ""}
                  type="url"
                  name="img"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quote" value="Quote" />
                </div>
                <TextInput
                  defaultValue={props.card?.quote || ""}
                  name="quote"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="rarity" value="Rarity" />
                </div>
                <TextInput
                  defaultValue={props.card?.rarity}
                  name="rarity"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Type" />
                </div>
                <TextInput
                  defaultValue={props.card?.type}
                  name="type"
                  required
                />
              </div>
              <Button type="submit">
                {props.card?.title === "" ? "Update" : "Submit"}{" "}
              </Button>
            </form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
