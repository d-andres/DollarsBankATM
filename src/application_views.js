const prompt = require('prompt-sync')({sigint: true});
const Account = require('./customer_account');

var view = {}

//Print Welcome Menu
view.welcome = function() {
	console.log('\n\x1b[32m','DOLLARSBANK ATM Welcomes You!!');
	console.log('Enter a valid Choice (1. Transaction 2. Open New Account): ', '\x1b[0m');
}

//Login to an Account
view.login = function () {
	console.log('\x1b[32m', 'Enter Security PIN: \x1b[0m');
}

//Create new Account
view.newAccount = function() {
	let deposit = prompt(console.log('\x1b[32m', 'Enter Intitial Deposit (0.00) : \x1b[0m'));
	deposit = Number(deposit);
	let regex = /\d+(\.\d{1,2})?/;
	if (regex.test(deposit)) {
		deposit = deposit.toFixed(2);

		let isNotPIN = true;
		let pin = '';
		while(isNotPIN) {
			pin = prompt(console.log('\x1b[32m', 'Secure pin 4 digit number: \x1b[0m'));
			let reg = /^[0-9]{4,4}$/;
			if (reg.test(pin)) {
				isNotPIN = false;
			} else {
				console.log('\x1b[31m', 'Invalid PIN.');
			}
		}

		let check = prompt(console.log('\x1b[32m', 'Verify pin: \x1b[0m'));
		if (pin === check) {
			console.log('\x1b[34m', 'Account has been created.');
			return new Account(pin, deposit);
		} else {
			console.log('\x1b[31m', 'PINs did not match. Please Try Again.');
			return null;
		}
	} else {
		console.log('\x1b[31m', 'Invalid Amount. Please Try Again.');
	}
}

view.transaction = {}

//Print Transaction Menu
view.transaction.menu = function(acct) {
	console.log('\n\x1b[32m', 'Transaction Menu: ');
	console.log('1. Account Balance Check');
	console.log('2. Print Transactions');
	console.log('3. Update PIN');
	console.log('4. Withdraw Amount');
	console.log('5. Deposit Amount');
	console.log('Enter your choice: ', '\x1b[0m');
}

//Check Account Balance
view.transaction.checkBalance = function(acct) {
	console.log('\x1b[36m', 'Your account balance is: $' + acct.abalance + '\n');
}

//Print Transaction History
view.transaction.printHistory = function(acct) {
	history = acct.ahistory;
	console.log('\x1b[36m', '------------------ Transaction History -----------------');
	for(let j = 0; j < history.length; j++) {
		console.log(history[j]);
	}
}

//Update Account PIN
view.transaction.updatePIN = function(acct) {
	let oldP = prompt(console.log('\x1b[32m', 'Enter old PIN: '));
	if (oldP === acct.apin) {
		let newP = prompt(console.log('\x1b[32m', 'Enter new PIN: '));
		let reg = /^[0-9]{4,4}$/;
		if (reg.test(newP)) {
			acct.apin = newP;
			console.log('\x1b[34m', 'Your PIN has been changed.');
		} else {
			console.log('\x1b[31m', 'Invalid PIN. Please Try Again.');
		}
	} else {
		console.log('\x1b[31m', 'Incorrect PIN');
	}
	
}

//Withdraw from Account
view.transaction.withdraw = function(acct) {
	let withdraw = prompt(console.log('\x1b[32m', 'Enter Withdraw Amount (0.00) : \x1b[0m'));
	withdraw = Number(withdraw);
	let regex = /\d+(\.\d{1,2})?/;
	if (regex.test(withdraw)) {
		let balance = Number(acct.abalance);
		balance -= withdraw;
		if (balance < 0)
		{
			console.log('\x1b[31m', 'Insufficient funds');
		} else {
			balance = balance.toFixed(2);
			acct.abalance = balance;
			withdraw = withdraw.toFixed(2);

			let d = new Date();
			acct.ahistory.push('- $' + withdraw + ' on ' + d);
			console.log('\x1b[34m', 'Withdraw Successful');
		}
	} else {
		console.log('\x1b[31m', 'Invalid Amount. Please Try Again.');
	}
}

//Deposit to Account
view.transaction.deposit = function(acct) {
	let deposit = prompt(console.log('\x1b[32m', 'Enter Deposit Amount (0.00) : \x1b[0m'));
	deposit = Number(deposit);
	let regex = /\d+(\.\d{1,2})?/;
	if (regex.test(deposit)) {
		balance = Number(acct.abalance);
		balance += deposit;
		balance = balance.toFixed(2);
		acct.abalance = balance;
		deposit = deposit.toFixed(2);

		let d = new Date();
		acct.ahistory.push('+ $' + deposit + ' on ' + d);
		console.log('\x1b[34m', 'Deposit Successful');
	} else {
		console.log('\x1b[31m', 'Invalid Amount. Please Try Again.');
	}
	
}

//Repeat menu
view.transaction.again = function() {
	console.log('\n\x1b[32m', 'Perform another transaction?(y/n) \x1b[0m');
}

module.exports = view;