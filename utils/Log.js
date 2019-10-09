export default class Log {

	className = "Log";

	constructor(className) {
		this.className = className;
	}

	log = (...args) => {
		args = [this.className].concat(args);
		console.log.apply(this, args);
	};

	error = (...args) => {
		args = [this.className].concat(args);
		console.error.apply(this, args);
	}
}
