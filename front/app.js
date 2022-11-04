class InitApp{

    constructor(){
        console.log('Load APP 🚀');
        this.contracts = {};
        this.web3Provider = '';
        this.web3 = '';
        this.account = '';
        this.taskContract = '';

        this.loadWallet();
        this.loadAccount();
        this.loadContract();
    }

    async loadWallet(){
        if(window.ethereum){
            this.web3Provider = window.ethereum;
            await window.ethereum.request({ method: "eth_requestAccounts"});
        }else if(this.web3){
            this.web3 = new Web3(window.web3.currentProvider);
        }else{
            console.log('Al parecer no tienes una wallet instalada')
        }
    }

    async loadAccount(){
        const account = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        this.account = account[0];

        document.getElementById('account').innerText = `Wallet: ${this.account}`;
    }

    async loadContract(){
        try{
            const res = await fetch("/TasksContract.json");
            const taskContractJSON = await res.json();
            this.contracts.TasksContract  = TruffleContract(taskContractJSON); 
            this.contracts.TasksContract.setProvider(this.web3Provider);
    
            this.taskContract = await this.contracts.TasksContract.deployed();

            this.renderTasks();
        }catch{
            console.log('Error al leer el json')
        }
    }

    async createTask(title,desc){
        const result = await this.taskContract.createTask(title,desc, { from: this.account });
    }

    async toggleDone(e){
        const taskId = e.dataset.id;
        await this.taskContract.toogleDone(taskId, {from: this.account} );
    }

    async renderTasks(){
        const taskCounter = await this.taskContract.counter();

        console.log(taskCounter)

        if(taskCounter){
            const taskCounterNumber = taskCounter.toNumber();

            let html = '';

            for(let i=1;i<=taskCounterNumber;i++){
                const task = await this.taskContract.task(i);
                const taskId = task[0].toNumber();
                const taskTitle = task[1];
                const taskDescription = task[2];
                const taskDone = task[3];
                const taskCreatedAt = task[4];

                let taskElement = `<div>
                    <span>${taskTitle}</span>
                </div>`

                html+=taskElement;
            }

            document.querySelector('#taskList').innerHTML = html;
        }

    }

} 

const APP = new InitApp();
