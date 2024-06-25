import { useState } from "react";
import { useDishesContext } from "../../context/DataProvider";
import { DishesListEditor } from "./DishesList.Editor";
import { DishesListEditModal } from "./DishesList.EditModal"

export function DishesList ( ) {

  const [modal, setModal] = useState({
    dishID:   null,
    type:     null
  });

  const {dishLoader} = useDishesContext();

  return (
    <>
      <DishesListEditor setModal={setModal} />

      { modal.type === 'edit' &&
        ( dishLoader
          ?
          <DishesListEditModal>
            <div className="loader"></div>
          </DishesListEditModal>
          :
          <DishesListEditModal modal={modal} setModal={setModal} />
        )
      }

    </>
  );
}