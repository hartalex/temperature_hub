![Travis](https://travis-ci.org/hartalex/temperature_hub.svg?branch=master)

# Temperature_Hub

This project currently contains 3 pieces, these may be seperated into seperate projects in the future.

* API service.
  This web service intefaces the polling service and website with a mongo database.
  Allows for saving/reading data from/to the database.
  Runs on port 8811

* Polling Service Application
  This is node client program queries each raspberry pi service for the current temperatures and stores them in the database using the API service. https://github.com/hartalex/temperature_service
  This program is meant to be scheduled as a cron job to run every minute, hour, or however often you need.

  ![System](https://raw.githubusercontent.com/hartalex/temperature_hub/master/system.png)

* Web site
  Has two pages with graphs of historical temperature data.
  /sensors.html  - One graph containing all temperature data.
  /sensorgraphs.html - Multiple graphs, one for each temperature sensor.

  Runs on port 80

## API Service Documentation

### Services
 * GET /services/list
   Returns an array of json objects for each service the polling application should check for new temperatures.
   ```
         [{
          "_id":""                             // database id
          "name":"Raspberry Pi - Living Room"  // Unique name for the service
          "url":"http://192.168.0.1:8833"      // url to the temperature_service running on the raspberry pi.
         }]
   ```

 * POST /services/add
   Adds a new service to the system.
   ```
        {    
          "name":"Raspberry Pi - Living Room"  // Unique name for the service
          "url":"http://192.168.0.1:8833"      // url to the temperature_service running on the raspberry pi.
        }
   ```
 * POST /services/delete
   Removes the given service from the system
   ```
        {    
          "name":"Raspberry Pi - Living Room"  // Unique name for the service
          "url":"http://192.168.0.1:8833"      // url to the temperature_service running on the raspberry pi.
        }
   ```

### Sensors
 * GET /temp/sensor/list
   Returns an array of sensor objects.
   ```
       [{
          "sensorId":"28-01159010efff"         // Unique Id for this temperature sensor
          "name":"Living Room"                 // [Optional] Unique human readable name for the sensor if set using /sensor/add
       }]
   ```

   * GET /door/sensor/list
     Returns an array of sensor objects.
     ```
         [{
            "sensorId":"gd-0000004"              // Unique Id for this door sensor
            "name":"garage door"                 // [Optional] Unique human readable name for the sensor if set using /sensor/add
         }]
     ```

 * POST /sensor/add
   Sets a human readable name for a sensor
   ```
        [{
          "sensorId":"28-01159010efff"         // Unique Id for this temperature sensor
          "name":"Living Room"                 // Unique name for the sensor if set using /sensor/add
         }]
   ```

### Temperatures
 * GET /temp/list
  Gets every temperature piece of data ever
  ```
        [{
          "sensorId":"28-01159010efff"                // Unique Id for this temperature sensor
          "temperatureInFarenheit": 70.012            // a number representing the current temperature in degrees farenheit.
          "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // ISO date time string of temperature reading
         }]
   ```

 * GET /temp/{sensorId}/list
  Gets the temperatures for a given sensorId
  ```
        [{
          "sensorId":"28-01159010efff"                // Unique Id for this temperature sensor
          "temperatureInFarenheit": 70.012            // a number representing the current temperature in degrees farenheit.
          "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // ISO date time string of temperature reading
         }]
   ```
  * GET /temp/current
    Gets the last temperatures for all temperature sensors
    ```
          [{
            "sensorId":"28-01159010efff"                // Unique Id for this temperature sensor
            "sensorName":"Living Room"                  // Unique name for the sensor if set using /sensor/add
            "temperatureInFarenheit": 70.012            // a number representing the current temperature in degrees farenheit.
            "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // ISO date time string of temperature reading
           }]
     ```
 * GET /temp/graph
   Gets each temperature grouped by the minute
   ```
        [{
          "_id":{"minute":"YYYY-MM-DDTHH:mm"},
          "results: {
             [{ "sensorId":"28-01159010efff"                // Unique Id for this temperature sensor
                "temperatureInFarenheit": 70.012            // a number representing the current temperature in degrees farenheit.
             }]
          }
        }]
   ```

### Doors
    * GET /door/list
     Gets every piece of door data ever
     ```
           [{
             "sensorId":"gd-000000045"                   // Unique Id for this door sensor
             "isOpen": true                              // a bool representing the current status of the door
             "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // ISO date time string of door reading
            }]
      ```

    * GET /door/{sensorId}/list
     Gets the door data for a given sensorId
     ```
           [{
             "sensorId":"gd-000000045"                   // Unique Id for this door sensor
             "isOpen": true                              // a bool representing the current status of the door
             "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // ISO date time string of door reading
            }]
      ```

### Temp and Door
 * POST /data/add
  Adds a new temperature or door reading to the database
  ```
        // temperature
        {
          "id":"28-01159010efff"                      // Unique Id for this temperature sensor
          "t": 70.012                                 // a number representing the current temperature in degrees farenheit.
          "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // [Optional] ISO date time string of temperature reading
        }

        // door
        {
          "sensorId":"28-01159010efff"                // Unique Id for this temperature sensor
          "isOpen": true                              // a bool representing the current status of the door
          "utc_timestamp":"YYYY-MM-DDTHH:mm:ss.sssZ"  // [Optional] ISO date time string of temperature reading
         }
   ```
