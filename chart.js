var ctx = document.getElementById('myChart').getContext('2d');
var ctx1 = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nồng độ CO2 (PPM)',
            data: [],
            backgroundColor: [
                'rgb(255, 148, 40)'
            ],
            borderColor: [
                'rgb(255, 148, 40)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15
                    }
                }
            }
        },
        showLines: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero:true,
              }
            }]
        }
    }
});
var myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nồng độ NO (PPM)',
            data: [],
            backgroundColor: [
                'rgb(61, 229, 123)'
            ],
            borderColor: [
                'rgb(61, 229, 123)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15
                    }
                }
            }
        },
        showLines: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero:true,
              }
            }]
        }
    }
});
var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nồng độ CO2 (PPM)',
            data: [],
            backgroundColor: [
                'rgb(66, 202, 255)'
            ],
            borderColor: [
                'rgb(66, 202, 255)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15
                    }
                }
            }
        },
        showLines: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero:true,
              }
            }]
        }
    }
});
var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nồng độ NO (PPM)',
            data: [],
            backgroundColor: [
                'rgb(255, 124, 235)'
            ],
            borderColor: [
                'rgb(255, 124, 235)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15
                    }
                }
            }
        },
        showLines: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero:true,
              }
            }]
        }
    }
});

var count=0;
function addData(chart, label, data) {
    chart.data.labels.push(label);
    if (count==80) chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach((dataset) => {
        if (count==80) dataset.data.splice(0, 1);
        dataset.data.push(data);
    });
    chart.update();
    count++;
    if (count>80) count=80;
}

var config = {
    apiKey: "AIzaSyCW2YVWkFDMEPNScEiXDDfgfQNKYWUJ98k",
    authDomain: "ledled-f9cb6.firebaseapp.com",
    databaseURL: "https://ledled-f9cb6-default-rtdb.firebaseio.com",
    projectId: "ledled-f9cb6",
    storageBucket: "ledled-f9cb6.appspot.com",
    messagingSenderId: "632580574927",
    appId: "1:632580574927:web:deaba724cc6d6652ae71ba",
    measurementId: "G-66MWERGC51"
};

firebase.initializeApp(config);
var value1Ref = firebase.database().ref('/Station/Station_1/NO');
var value2Ref = firebase.database().ref('/Station/Station_1/CO2');
var value3Ref = firebase.database().ref('/Station/Station_2/NO');
var value4Ref = firebase.database().ref('/Station/Station_2/CO2');
var data1;
var data2;
var data3;
var data4;

// data1 = giá trị của value của CO2 trạm 1
value1Ref.on('value', function(snapshot) {
    var datetime=new Date();
    var time=datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
    data1=snapshot.val();
    addData(myChart, time, data1);
    document.getElementById('valco2_1').innerHTML=data1+" PPM";
    if (data1>1000){
    document.getElementById('warning_co2_1').style.backgroundColor = "red";
                    }
    else{
    document.getElementById('warning_co2_1').style.backgroundColor = "green";
                    }
});

// data2 = giá trị của value của NO trạm 1
value2Ref.on('value', function(snapshot) {
    var datetime=new Date();
    var time=datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
    data2=snapshot.val();
    addData(myChart1, time, data2);
    document.getElementById('valno_1').innerHTML=data2+" PPM";
    if (data2>1000){
    document.getElementById('warning_no_1').style.backgroundColor = "red";
                    }
    else{
    document.getElementById('warning_no_1').style.backgroundColor = "green";
                    }
});
// data3 = giá trị của value của CO2 trạm 2
value3Ref.on('value', function(snapshot) {
    var datetime=new Date();
    var time=datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
    data3=snapshot.val();
    addData(myChart2, time, data3);
    document.getElementById('valco2_2').innerHTML=data3+" PPM";
    if (data3>1000){
    document.getElementById('warning_co2_2').style.backgroundColor = "red";
                    }
    else{
    document.getElementById('warning_co2_2').style.backgroundColor = "green";
                    }
});
// data4 = giá trị của value của NO trạm 2
value4Ref.on('value', function(snapshot) {
    var datetime=new Date();
    var timeday=datetime.getDate()+"-"+(datetime.getMonth()+1)+"-"+datetime.getFullYear();
    var time=datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
    data4=snapshot.val();
    addData(myChart3, time, data4);
    document.getElementById('valno_2').innerHTML=data4+" PPM";
    if (data4>1000){
    document.getElementById('warning_no_2').style.backgroundColor = "red";
                    }
    else{
    document.getElementById('warning_no_2').style.backgroundColor = "green";
                    }
});



