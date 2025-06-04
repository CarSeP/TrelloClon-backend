export const generateID = (length: number) => {
	const characters =
		"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

	let id = "";

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * characters.length);

		id += characters[random];
	}

	return id;
};

export const getMaxID = (list: { id: number }[]): number => {
	return list.reduce((accumulator: number, currentValue) => {
		return currentValue.id > accumulator ? currentValue.id : accumulator;
	}, 0);
};
