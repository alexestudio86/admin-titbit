import { useState } from "react";
import { DishesListEditor } from "./DishesList.Editor";
import { DishesListEditModal } from "./DishesList.EditModal"

export function DishesList ( ) {

  const [modal, setModal] = useState({
    dishID:   null,
    type:     null
  });


  return (
    <>
      <DishesListEditor setModal={setModal} />

      { modal.type === 'edit' &&
        <DishesListEditModal modal={modal} setModal={setModal} />
      }

    </>
  );
}