// Add text streaming support via react-native-fetch-api
global.fetch = (url, options): Promise<Response> => {
	return global.fetch(url, {
		...options,
		reactNative: { textStreaming: true },
	});
};

export default global.fetch;
