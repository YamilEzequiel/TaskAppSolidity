App = {

    contracts: [],
    web3Provier: '',
    web3: '',

    init: () => {
        console.log('Load App 🚀')
        //App.loadEtherum();
        App.loadContracts();
    },

    loadEtherum: async () => {
        // Metamask
        if(window.ethereum){
            App.web3Provier = window.ethereum;
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Web3
        }else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        }else{
            console.log('No tienes metamasks')
        }
    },

    loadContracts: async () =>{
        const res = await fetch("/TasksContract.json");
        const TasksContractJSON = await res.json();

        App.contracts.taskContract = TruffleContract(TasksContractJSON)

        console.log(App.contracts.taskContract)
    }

}

App.init()