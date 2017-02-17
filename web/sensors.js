require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = function(req, res) {
    fetch('http://localhost:8811/sensor/list').then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(sensorjson) {
        fetch('http://localhost:8811/temp/graph').then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(json) {


            res.send("<html><head><script type=\"text/javascript\" src=\"https://www.gstatic.com/charts/loader.js\"></script>    <script type=\"text/javascript\">      google.charts.load('current', {'packages':['corechart']});      google.charts.setOnLoadCallback(drawChart);        function drawChart() {  var sensorjson = " + JSON.stringify(sensorjson) + ";         var json = " + JSON.stringify(json) + ";          var arraydata = [];          var titleRow = ['Time'];           sensorjson.forEach(function(sensor) {            var sensorName = sensor.sensorId;            if (\"name\" in sensor) {		sensorName = sensor.name;            }            titleRow.push(sensorName);          });           arraydata.push(titleRow);           json.forEach(function (element)  {           var arrayRow = [new Date(element._id.minute)];            sensorjson.forEach(function(sensor) {  var tempData = null;           element.results.forEach(function(temp) {           if (sensor.sensorId == temp.sensorId) {	tempData = temp.tempInFarenheit;}	    });   arrayRow.push(tempData);         });             arraydata.push(arrayRow); });	      var data = google.visualization.arrayToDataTable(arraydata);		          var options = {            title: 'Temperatures',            curveType: 'function',            legend: { position: 'bottom' }          };		  var chartdiv = document.createElement(\"div\");			chartdiv.style=\"width: 900px; height: 500px\";          document.body.appendChild(chartdiv);			          var chart = new google.visualization.LineChart(chartdiv);          chart.draw(data, options);		  }    </script>  </head>  <body>  </body></html>");

        }).catch(function(err) {
            console.log(err);
        });


    }).catch(function(err) {
        console.log(err);
    });
}
