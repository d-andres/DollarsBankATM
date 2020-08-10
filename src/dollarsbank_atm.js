const prompt = require('prompt-sync')({sigint: true});
const view = require('./application_views')

module.exports = function() {
  var listAccts = new Array();
  while (true) {
    // Get welcome menu and user input
    let input = prompt(view.welcome());
    // Convert the string input to a number
    input = Number(input);
  
    switch (input) {
      case 1: //Login to Transaction Menu
        let input1 = prompt(view.login());
        let foundAcct = false;
        for (let i = 0; i < listAccts.length; i++) {
          if(input1 === listAccts[i].apin) {
            var anotherTrans = true;
            while(anotherTrans) {
              let choice = prompt(view.transaction.menu());
              choice = Number(choice);
              switch (choice) {
                case 1: //Account balance
                  view.transaction.checkBalance(listAccts[i]);
                break;
                case 2: //Transaction history
                  view.transaction.printHistory(listAccts[i]);
                break;
                case 3: //Update pin
                  view.transaction.updatePIN(listAccts[i]);
                break;
                case 4: //Withdraw 
                  view.transaction.withdraw(listAccts[i]);
                break;
                case 5: //Deposit
                  view.transaction.deposit(listAccts[i]);
                break;
                default:
                  console.log('\x1b[31m', 'Invalid Input');
                break;
              }
              let again = prompt(view.transaction.again());
              again.toLowerCase();
              if (again != 'y')
                anotherTrans = false;
            }
            foundAcct = true;
            break;
          } 
        }
        if (!foundAcct)
          console.log('\x1b[31m', 'Account not found.');
        break;
      case 2: //New Account menu
        let acct = view.newAccount();
        if(acct != null) {
          listAccts.push(acct);
        }
        break;
      default: //Invalid Input
        console.log('\x1b[31m', 'Invalid Input');
        break;
    }
  }
}
