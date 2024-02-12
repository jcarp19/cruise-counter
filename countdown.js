const retDate = new Date("2023/04/23 16:30");

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var _year = _day * 365;
var timer;

function showRemaining() {
  var now = new Date();
  var distance = retDate - now;
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "YOU'RE RETIRED!";

    return;
  }
  var years = Math.floor(distance / _year);
  var days = Math.floor((distance % _year) / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);
  //   if (seconds < 10) {
  //     var alt = "0" + seconds;
  //     console.log(alt);
  //   }

  document.getElementById("countdown").innerHTML = years + " Years, ";
  document.getElementById("countdown").innerHTML += days + " Days, ";
  //   document.getElementById("countdown").innerHTML += hours + " hrs ";
  //   document.getElementById("countdown").innerHTML += minutes + " mins ";
  //   document.getElementById("countdown").innerHTML += seconds + " secs";
  //   document.getElementById("countdown").innerHTML +=
  //     hours + ":hh " + minutes + ":mm " + seconds + ":ss ";
  document.getElementById("countdown").innerHTML +=
    "and " + hours + ":" + minutes + ":" + seconds + " hh:mm:ss";
}

timer = setInterval(showRemaining, 1000);
