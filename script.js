const filesizeField = document.getElementById('file-size');
const bandwidthField = document.getElementById('bandwidth-speed');
const radios = Array.from(document.getElementsByClassName('selected'));
const fileKilobytes = document.getElementById('kilobytes');
const fileMegabytes = document.getElementById('megabytes');
const fileGigabytes = document.getElementById('gigabytes');
const speedKilobits = document.getElementById('kilobits-a-second');
const speedMegabits = document.getElementById('megabits-a-second');
const speedGigabits = document.getElementById('gigabits-a-second');
const calcButton = document.getElementById('calc');
const outcome = document.getElementById('outcome');

calcButton.addEventListener('click', () => {
    //Checking if both radios selected, else return
    let allSelected = 0;
    radios.map(item => {
        if(item.checked) allSelected++;
    })
    if(allSelected < 2) return;
    //Calculating file size to bytes
    let muliplier = 0;
    if(fileKilobytes.checked) muliplier = 1000;
    else if(fileMegabytes.checked) muliplier = 1000000;
    else if(fileGigabytes.checked) muliplier = 1000000000;
    let fileSizeInBytes = parseFloat(filesizeField.value) * muliplier;
    //Adding(assuming) ~1.3% protocol overhead
    fileSizeInBytes = fileSizeInBytes + 0.013 * fileSizeInBytes;
    //Calculatig speed to bites per second
    let speed = 0;
    if(speedKilobits.checked) speed = 1000;
    else if(speedMegabits.checked) speed = 1000000;
    else if(speedGigabits.checked) speed = 1000000000;
    let bandSpeed = parseFloat(bandwidthField.value) * speed;
    let bandSpeedBytes = parseFloat(bandSpeed/8);
    //Calculating seconds to download and displaying the formatted time
    let seconds = fileSizeInBytes/bandSpeedBytes;
    let minutes = 0;
    let hours = 0;
    while(seconds > 59){
        minutes++;
        seconds = seconds - 60;
    }
    while(minutes > 59){
        hours++;
        minutes = minutes - 60;
    }
    seconds = Math.round(seconds);
    if(seconds < 10) seconds = '0' + seconds;
    if(minutes < 10) minutes = '0' + minutes; 
    if(hours < 10) hours = '0' + hours;
    outcome.innerText = hours + ':' + minutes + ':' + seconds;
});