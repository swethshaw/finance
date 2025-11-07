// JavaScript code for handling the bank form submission and transaction history
document.addEventListener('DOMContentLoaded', function() {
  // Load saved bank details and transaction history
  loadBankDetails();
  loadTransactionHistory();

  // Form submission event listener
  document.getElementById('bankForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Get the values from the form inputs
      var accountName = document.getElementById('accountName').value;
      var accountNumber = document.getElementById('accountNumber').value;
      var bankName = document.getElementById('bankName').value;
      var ifscCode = document.getElementById('ifscCode').value;

      // Save the bank details to localStorage
      saveBankDetails(accountName, accountNumber, bankName, ifscCode);

      // Display the account details
      displayBankDetails();
  });
});

// Save bank details to localStorage
function saveBankDetails(accountName, accountNumber, bankName, ifscCode) {
  localStorage.setItem('bankDetails', JSON.stringify({
      accountName: accountName,
      accountNumber: accountNumber,
      bankName: bankName,
      ifscCode: ifscCode
  }));
}

// Load and display bank details from localStorage
function loadBankDetails() {
  var bankDetails = JSON.parse(localStorage.getItem('bankDetails'));
  if (bankDetails) {
      document.getElementById('accountName').value = bankDetails.accountName;
      document.getElementById('accountNumber').value = bankDetails.accountNumber;
      document.getElementById('bankName').value = bankDetails.bankName;
      document.getElementById('ifscCode').value = bankDetails.ifscCode;
      displayBankDetails();
  }
}

// Display bank details
function displayBankDetails() {
  var bankDetails = JSON.parse(localStorage.getItem('bankDetails'));
  if (bankDetails) {
      document.getElementById('accountDetails').innerHTML = `
          <p>Account Name: <strong>${bankDetails.accountName}</strong></p>
          <p>Account Number: <strong>${bankDetails.accountNumber}</strong></p>
          <p>Bank Name: <strong>${bankDetails.bankName}</strong></p>
          <p>IFSC Code: <strong>${bankDetails.ifscCode}</strong></p>
      `;
  }
}

// Load and display transaction history from localStorage
function loadTransactionHistory() {
  var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  var transactionHistoryDiv = document.getElementById('transactionHistory');
  transactionHistoryDiv.innerHTML = '';
  transactions.forEach(function(transaction) {
      transactionHistoryDiv.innerHTML += `
          <p>Transaction ID: <strong>${transaction.id}</strong> - Amount: <strong>${transaction.amount}</strong></p>
      `;
  });
}

// Add a transaction to the transaction history
function addTransaction(id, amount) {
  var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.push({ id: id, amount: amount });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  loadTransactionHistory();
}

function addTransaction(type, details, amount) {
  var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  var transactionDetails = {
      type: type,
      details: details,
      amount: amount
  };
  // Check if additional details are provided for bank transfers
  if (type === 'Bank Transfer') {
      transactionDetails.bank = details.bank;
      transactionDetails.account = details.account;
  }
  transactions.push(transactionDetails);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load and display transaction history from localStorage
function loadTransactionHistory() {
  var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  var transactionHistoryDiv = document.getElementById('transactionHistory');
  transactionHistoryDiv.innerHTML = '';
  transactions.forEach(function(transaction) {
      var transactionInfo = transaction.type + ': <strong>' + transaction.amount + '</strong>';
      if (transaction.type === 'Bank Transfer') {
          transactionInfo += ' to account <strong>' + transaction.account + '</strong> at <strong>' + transaction.bank + '</strong>';
      } else if (transaction.type === 'UPI') {
          transactionInfo += ' to UPI ID <strong>' + transaction.details + '</strong>';
      }
      transactionHistoryDiv.innerHTML += '<p>' + transactionInfo + '</p>';
  });
}

// Process UPI payment
function processUPIPayment() {
  var upiId = document.getElementById('upiId').value;
  var upiAmount = document.getElementById('upiAmount').value;
  addTransaction('UPI', upiId, upiAmount);
  loadTransactionHistory();
}

// Process bank transfer
function processBankTransfer() {
  var transferAccountNumber = document.getElementById('transferAccountNumber').value;
  var transferBankName = document.getElementById('transferBankName').value;
  var transferAmount = document.getElementById('transferAmount').value;
  addTransaction('Bank Transfer', { account: transferAccountNumber, bank: transferBankName }, transferAmount);
  loadTransactionHistory();
}