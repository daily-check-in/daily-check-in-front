const hasOwnProperty = (object: {}, propertyName: string) => {
	return !!(
		object &&
		(typeof object == 'object' || typeof object == 'function') &&
		Object.prototype.hasOwnProperty.call(object, propertyName)
	);
};

export { hasOwnProperty };
