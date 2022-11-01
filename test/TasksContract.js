const TasksContract = artifacts.require("TasksContract.sol")

contract("TasksContract", () => {

    before(async()=>{
        this.taskConctrat = await TasksContract.deployed();
    })

    it('Migrate deploy sucessfully', async() => {
        const address = this.taskConctrat.address;

        assert.notEqual(address,null);
        assert.notEqual(address,undefined);
        assert.notEqual(address,0x0);
        assert.notEqual(address,"");
    });

    it('Get tasks list', async () =>{
        const counter = await this.taskConctrat.counter();
        const task = await this.taskConctrat.task(counter);

        assert.equal(task.id.toNumber(), counter);
    });

    it("Task created successfully", async () => {
        const result = await this.taskConctrat.createTask("Two Task","Description two task");
        const taskEvent = result.logs[0].args;

        //Se comparara contra 2 ya que es la segunda tarea debido al constructor
        assert.equal(taskEvent.id.toNumber(),2);
        assert.equal(taskEvent.title,"Two Task");
        assert.equal(taskEvent.description,"Description two task");
    })

    it('task toogle done' , async () => {
        const result = await this.taskConctrat.toogleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.taskConctrat.task(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done,true);
        assert.equal(taskEvent.id,1);
    })

})