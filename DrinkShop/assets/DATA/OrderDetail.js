import { useState } from "react";
import Drinks from "./Drinks";

export const useDrinks = () => {
	const drink = Drinks();
	const [drinks, setDrinks] = useState(drink);
	const [totalChoice, setTotalChoice] = useState(0);

	return { drinks, setDrinks, totalChoice, setTotalChoice };
};
