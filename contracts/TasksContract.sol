// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TasksContract{

    uint public counter = 0;

    constructor(){
        createTask("Example task", "Example description");
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    struct Task{
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    mapping (uint256 => Task ) public task;

    function createTask(string memory _title,string memory _description) public {
        counter++;
        task[counter] = Task(counter, _title, _description,false, block.timestamp);
        emit TaskCreated(counter, _title, _description, false,  block.timestamp);
    }

    function toogleDone(uint _id) public{
        Task memory _task = task[_id];
        _task.done = !_task.done;
        task[_id] = _task;
    }

}