function nl2br(value = '') {
	return value.replace(/\r\n|\n/g, '<br />');
}

export { nl2br };
