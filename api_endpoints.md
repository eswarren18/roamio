# **API Endpoints** - Roam.io
-------------------------------------------------------------------------------------------
### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```
----------------------------------------------------------------------------------------------------------
### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
---------------------------------------------------------------------------------------------------------------

### Signup

* Endpoint path: /api/users
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        first_name*: str,
        last_name*: str,
        email*: str,
        password*: str,
        confirm_password*: str,
    }
    ```

* Response: "Account was created!"
* Response shape (JSON):
    ```json
    {
        id: int,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        profile_picture: str(null=True),
    }
    ```

------------------------------------------------------------------------------------------------------
 ### Update User

* Endpoint path: /api/user/<id:int>
* Endpoint method: PUT
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        profile_picture: str,
    }
    ```

* Response: "User account has been updated!"
* Response shape (JSON):
    ```json
    {
        id: int,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        profile_picture: str,
    }
    ```
-----------------------------------------------------------------------------------------------------------
### Get User

* Endpoint path: /api/user/<id:int>/
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Gets details of individual user
* Response shape (JSON):
    ```json
    {
        id: int,
        first_name: str,
        last_name: str,
        email: str,
        profile_picture: str,
    }
    ```
------------------------------------------------------------------------------------------------
### Create Trip

* Endpoint path: /api/trips/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        title*: str,
        country*: str,
        city*: str,
        photo: str,
    }
    ```
* Response: "Your trip has been created!"
* Response shape (JSON):
    ```json
    {
        id: int,
        title: str,
        country: str,
        city: str,
        photo: str,
    }
    ```
------------------------------------------------------------------------------------------------------
### Get Trip

* Endpoint path: /api/trip/<id:int>
* Endpoint method: GET
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Response: Displays individual trip details
* Response shape (JSON):
    ```json
    {
      id: int,
      title: str,
      country: str,
      city: str,
      photo: str,
    }
    ```
 --------------------------------------------------------------------------------------------------
### Update Trip

* Endpoint path: /api/trip/<id:int>/
* Endpoint method: PUT
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      title: str,
      country: str,
      city: str,
      photo: str,
    }
    ```

* Response: "Trip has been updated!"
* Response shape (JSON):
    ```json
    {
      id: int,
      title: str,
      country: str,
      city: str,
      photo: str,
    }
    ```
---------------------------------------------------------------------------
### Delete Trip

* Endpoint path: /api/trip/<id:int>/
* Endpoint method: DELETE
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Response: "Trip has been deleted!"
* Response shape (JSON):
    ```json
    {deleted : true}
    ```
-----------------------------------------------------------------------------------
### Get Trips

* Endpoint path: /api/trips/
* Endpoint method: GET
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Response: A list of all trips
* Response shape (JSON):
    ```json
    {
      "trips": [
    {
      id: int,
      title: str,
      country: str,
      city: str,
      photo: str,
    },
    {
      id: int,
      title: str,
      country: str,
      city: str,
      photo: str,
    }
      ]
    }
    ```
--------------------------------------------------------------------------------------
### List Events

* Endpoint path: /api/trips/<trips_id:int>/events/
* Endpoint method: GET
* Query parameters:
  * q: *filter*

* Headers:
  * Authorization: Bearer token

* Response: A list of all events
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      date: datefield,
      time: timefield,
      location: str,
      description: textfield,
    }
    ```
-------------------------------------------------------------------------------------------------------
### Create Event

* Endpoint path: /api/events/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      name: str,
      date: datefield,
      time: timefield,
      location: str,
      description: textfield,
    }
    ```
* Response: "Event has been created!"
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      date: datefield,
      time: timefield,
      location: str,
      description: textfield,
    }
    ```
------------------------------------------------------------------------------------------------------------------------------------
### Update Event

* Endpoint path: /api/event/<id:int>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      name: str,
      date: datefield,
      time: timefield,
      location: str,
      description: textfield,
    }
    ```
* Response: "Event has been updated!"
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      date: datefield,
      time: timefield,
      location: str,
      description: textfield,
    }
    ```
----------------------------------------------------------------------------------------------------------
### Delete Event

* Endpoint path: /api/event/<id:int>/
* Endpoint method: DELETE
* Headers:
  * Authorization: Bearer token

* Response: "Event has been deleted!"
* Response shape (JSON):
    ```json
    {deleted: true}
    ```
-----------------------------------------------------------------------------------------------------
### Get Flights

* Endpoint path: /api/trips/<trips_id:int>/flights/
* Endpoint method: GET
* Query parameters:
  * q?: filter

* Headers:
  * Authorization: Bearer token

* Response: A list of all flights
* Response shape (JSON):
    ```json
    {
      id: int,
      flight_number: str,
      departure: datetime,
      arrival: datetime,
    }
    ```
---------------------------------------------------------------------------------------------------------
### Create Flight

* Endpoint path: /api/trips/<trips_id:int>/flights/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      flight_number: str,
      departure: datetime,
      arrival: datetime,
    }
    ```
* Response: "Flight has been created!"
* Response shape (JSON):
    ```json
    {
      id: int,
      flight_number: str,
      departure: datetime,
      arrival: datetime,
    }
    ```
-------------------------------------------------------------------------------------------------------------
### Update Flight

* Endpoint path: /api/trips/<trips_id:int>/flight/<id:int>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      flight_number: str,
      departure: datetime,
      arrival: datetime,
    }
    ```
* Response: "Flight updated!"
* Response shape (JSON):
    ```json
    {
      id: int,
      flight_number: str,
      departure: datetime,
      arrival: datetime,
    }
    ```
--------------------------------------------------------------------------------------------------------------------------------------------------
### Delete Flight

* Endpoint path: /api/trips/<trips_id:int>/flight/<id:int>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: "Flight has been deleted!"
* Response shape (JSON):
    ```json
    {deleted: true}
    ```
-------------------------------------------------------------------------------------------------------------------------------------------------------
### Get Lodgings

* Endpoint path: /api/trips/<trips_id:int>/lodgings/
* Endpoint method: GET
* Query parameters:
  * q?: filter

* Headers:
  * Authorization: Bearer token

* Response: A list of all lodgings
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      address: str,
      check_in: date,
      check_out: date,
    }
-------------------------------------------------------------------------------------------------
### Create Lodging

* Endpoint path: /api/trips/<trips_id:int>/lodgings/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      name: str,
      address: str,
      check_in: date,
      check_out: date,
    }
    ```
* Response: "Lodging has been created!"
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      address: str,
      check_in: date,
      check_out: date,
    }
    ```
------------------------------------------------------------------------------------------------
### Update Lodging

* Endpoint path: /api/trips/<trips_id:int>/lodging/<id:int>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
      name: str,
      address: str,
      check_in: date,
      check_out: date,
    }
    ```
* Response: "Lodging updated!"
* Response shape (JSON):
    ```json
    {
      id: int,
      name: str,
      address: str,
      check_in: date,
      check_out: date,
    }
    ```
----------------------------------------------------------------------------------------------------
### Delete Lodging

* Endpoint path: /api/trips/<trips_id:int>/lodging/<id:int>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: "Lodging details have been deleted!"
* Response shape (JSON):
    ```json
    {deleted: true}
    ```
--------------------------------------------------------------------------------------------------
