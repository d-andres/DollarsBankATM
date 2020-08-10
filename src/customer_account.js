
class Account {
	constructor(pin, balance) {
		this.pin = pin;
		this.balance = balance;

		this.history = new Array();
		let d = new Date();
		this.history.push('+ $' + balance + ' on ' + d);
	}

	get apin() { return this.pin; }
	set apin(pin) { this.pin = pin; }
	
	get abalance() { return this.balance; }
	set abalance(balance) { this.balance = balance; }

	get ahistory() { return this.history }
	set ahistory(history) { this.history = history; }
}

module.exports = Account;