import { useDishesContext } from "../../context/DataProvider";
import { DishesShowListPlaceholder } from "../../components/dishesComponents/DishesShowList.Placeholder";
import { DishesShowList } from "../../components/dishesComponents/DishesShow.List";

export function DishesMainLayout () {

    const {dishesLoader} = useDishesContext();

    return (
        <>
            {
                dishesLoader
                ?
                <DishesShowListPlaceholder />
                :
                <DishesShowList />
            }
        </>
    )
}