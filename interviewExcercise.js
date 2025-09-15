class BankAccount {
    constructor(owner, initialBalance = 0, owners =[]){
            if(initialBalance<0)
                throw new Error ('Initial balance must be greater then 0')
            this.owners = owners.length? owners: [owner]
            this.balance = initialBalance;
            this.id = BankAccount.    generateId()
    }

    static generateId(){
        BankAccount._idCounter = (BankAccount._idCounter)||1
        return(BankAccount._idCounter++ ).toString();
    }


    getBalance (){
        return this.balance;

    }
    getOwners(){
        return this.owners.join(',')

    }
    deposit(amount){
        if(amount<=0)
            throw new Error ('Deposit greater then 0')
        this.balance+= amount
    }

    withdraw(amount){
        if (amount <=0 || amount>this.balance)
            throw new Error ('Invalid withdraw amount')
        this.balance-= amount
    }
}

    class Bank {
        constructor (){
            this.accounts  = [];
            this.ledger = [];
        }

        createAccount(owner, initialBalance=0, jointOwners = [] ){
            const account = new BankAccount(owner, initialBalance, jointOwners)
            this.accounts.push(account)
            return account;
        }

        printAllBalances (){
            this.accounts.forEach(a =>{
                console.log(`Account Id: ${a.id}, owners: ${a.getOwners()}, Balance: ${a.getBalance()} `)
            })
        }
        getTotalBalance(){
            return this.accounts.reduce((sum, a)=> sum + a.getBalance(), 0)
        }

        transferFunds(source, target, amount){
            if(source.id=== target.id)
                throw new Error ('Cant transfer to the same account')
            if(amount<=0)
                throw new Error ('Amount must be positive')
            if(source.getBalance()<amount)
                throw new Error ('Insufficient funda available')


            source.withdraw(amount);
            target.deposit(amount)
            this.ledger.push({
                source_account: source.id,
                target_account: target.id,
                amount_transferred: amount
            })

        }
        printLedger(){
            this.ledger.forEach(entry =>{
                console.log(
                    entry.source_account, entry.target_account, amount
                )

            })
        }

    }

    const bank = new Bank()
    const acc1 = bank.createAccount('Ankit', 500);
    const acc2 = bank.createAccount('Alcie', 1000);

    //joint account
    const acc = bank.createAccount(null, 750, ['person1', 'person2'])


    bank.printAllBalances();
    bank.transferFunds(acc1, acc2, 10);
    bank.printAllBalances( )






//id,
//get owner
//get balance
// deposit
//withdraw
