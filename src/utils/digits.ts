// Agrega separadores de coma
export const formatNumber = (number: number) => {
	return (number + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
