// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    };
    return employeeRecord;
}
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord);
}
function createTimeInEvent(record, date){
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(date.slice(11,date.length)),
        date: date.slice(0,10)
    };
    record.timeInEvents.push(timeInEvent);
    return record;
}
function createTimeOutEvent(record, date){
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(date.slice(11,date.length)),
        date: date.slice(0,10)
    };
    record.timeOutEvents.push(timeOutEvent);
    return record;
}
function hoursWorkedOnDate(record, date){
    const events = record.timeInEvents
    let hours = [];
    for(let i = 0; i < events.length; i++){
        if(events[i].date == date){
            hours.push(record.timeOutEvents[i].hour*.01);
            hours.push(events[i].hour*.01);
        }
    }
    const reducer = (prev, current) => prev-current;
    return hours.reduce(reducer);
}
function wagesEarnedOnDate(record, date){
    return record.payPerHour * hoursWorkedOnDate(record, date);
}
function allWagesFor(record){
    let result = [];
    for(let i = 0; i < record.timeInEvents.length; i++){
        result.push(wagesEarnedOnDate(record, record.timeInEvents[i].date));
    }
    const reducer = (prev, current) => prev+current;
    return result.reduce(reducer);
}
function calculatePayroll(recordArray){
    let result = 0;
    for(let i = 0; i < recordArray.length; i++){
        result += allWagesFor(recordArray[i]);
    }
    return result;
}