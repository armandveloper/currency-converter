const API_USERNAME = process.env.REACT_APP_API_ID;
const API_PASSWORD = process.env.REACT_APP_API_KEY;

const Authorization = `Basic ${window.btoa(`${API_USERNAME}:${API_PASSWORD}`)}`;

const get = (url: string): Promise<any> => {
	return window.fetch(url).then((res) => res.json());
};

const getAuth = (url: string): Promise<any> => {
	return window
		.fetch(url, {
			method: 'GET',
			headers: {
				Authorization,
			},
		})
		.then((res) => res.json());
};

const api = {
	currencies: {
		get: getAuth,
	},
	countries: {
		get,
	},
};

export default api;
