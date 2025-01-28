# Roamio
*Plan, Explore, Enjoy!* <br>
*Where Adventure Meets Simplicity!* <br>

<br>

## Developers
**Eric Warren**<br>
LinkedIn: https://www.linkedin.com/in/eric-warren-b-s-9074b661/ <br>
GitLab: https://gitlab.com/eswarren18<br>

**David Iukuridze**<br>
LinkedIn: https://www.linkedin.com/in/david-iukuridze/ <br>
GitLab: https://gitlab.com/davidiukuridze <br>

**Gregory Reinis** <br>
LinkedIn: https://www.linkedin.com/in/gregoryreinis/ <br>
GitLab: https://gitlab.com/GReinis <br>
Email: Reinis.Gregory@gmail.com <br>

---

<br>

## Project Description <br>
Roamio is your simple solution for planning your next trip! With a beautiful interface and simple GUI, users will find Roamio to be both functional and light-weight.
On a technical level, <br>
Roamio utilizes FastAPI endpoints, with a PostgreSQL database. The frontend is constructed with React.js with TailwindCSS styling throughout.





## Tech Stack
![A collage of various tech logos](./techstack_collage_438.png) <br>
**FastAPI** <br>
**Vite** <br>
**Docker** <br>
**React.js** <br>
**PostgreSQL** <br>
**JavaScript** <br>
**TailwindCSS** <br>
**Python** <br>
**HTML5** <br>
**CSS**<br>

## "Building the App" Enter Wireframing + general history

## How To Run This App - "Getting Started?"
 *Downloading The Roamio Repository* <br>
In the directory where you want Roamio to live, run:<br>
```
git clone https://gitlab.com/man-down/roamio.git
```
<br>
You now have your own Roamio! Navigate to your new Roamio directory:<br>

```bash
cd Roamio
```

<br>

**Start Docker Desktop**  <br>
Make sure Docker Desktop is installed and running on your machine before proceeding.<br>
    *If you’re on Windows or macOS, launch Docker Desktop from <br>
      your applications. On Linux, ensure the Docker daemon is running.*<br>
<br>
Now run:
```
docker volume create beta-data
docker-compose build
docker-compose up
```

<br>

Finally, <br>
Navigate to http://localhost:5173/ in your web browser <br>

### Congrations! You're free to now experience Roamio!

<br>

## Usage & Features
Roamio provides a streamlined way to plan and manage your trips!

**Features include:**
- **User Accounts**: Create a new account or sign in to an existing one.
- **Trip Management**: Set up and organize multiple trips, each containing its own itinerary.
- **Event Scheduling**: Add and manage events, flights, and lodging details for each trip.
- **Interactive Map**: Explore points of interest via an integrated Google Maps API, right inside the application.

<br>

## FastAPI API Endpoints
### Authentication
#### Signup
---
Submit a POST request to localhost:8000/api/auth/signup <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "username": "string"
}
```
---
#### Signin
---
Submit a POST request to localhost:8000/api/auth/signin <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "username": "string"
}
```
---


### Trips <br>
#### Create Trip
---
Submit a POST request to localhost:8000/api/trips <br>
*A successful call will return the following:*
```
{
  {
  "id": 0,
  "title": "string",
  "country": "string",
  "city": "string",
  "start_date": "2025-01-25",
  "end_date": "2025-01-25",
  "trip_image": "string",
  "user_id": 0
}
}
```
---
#### Get Trips
---
Submit a GET request to localhost:8000/api/trips <br>
*A successful call will return the following:*
```
[
  {
    "id": 0,
    "title": "string",
    "country": "string",
    "city": "string",
    "start_date": "2025-01-25",
    "end_date": "2025-01-25",
    "trip_image": "string",
    "user_id": 0
  }
]
```
---
#### Update Trip
---
Submit a PUT request to localhost:8000/api/trips/{trip_id} <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "title": "string",
  "country": "string",
  "city": "string",
  "start_date": "2025-01-25",
  "end_date": "2025-01-25",
  "trip_image": "string",
  "user_id": 0
}
```
---
#### Get A Single Trip
---
Submit a GET request to localhost:8000/api/trips/{trip_id} <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "title": "string",
  "country": "string",
  "city": "string",
  "start_date": "2025-01-25",
  "end_date": "2025-01-25",
  "trip_image": "string",
  "user_id": 0
}
```
---
#### Delete A Trip
---
Submit a DELETE request to localhost:8000/api/trips/{trip_id} <br>
*A successful call will return the following:*
```
true
```


### Flights <br>
#### Create Flight
---
Submit a POST request to localhost:8000/api/flights <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "flight_number": "string",
  "departure_time": "2025-01-25T21:22:27.093Z",
  "arrival_time": "2025-01-25T21:22:27.093Z",
  "trip_id": 0
}
```
---
#### Get Flights
---
Submit a PUT request to localhost:8000/api/trips/{trip_id}/flights <br>
*A successful call will return the following:*
```
[
  {
    "id": 0,
    "flight_number": "string",
    "departure_time": "2025-01-25T21:27:32.089Z",
    "arrival_time": "2025-01-25T21:27:32.089Z",
    "trip_id": 0
  }
]
```
---
#### Update Flight
---
Submit a PUT request to localhost:8000/api/flights/{flight_id} <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "flight_number": "string",
  "departure_time": "2025-01-25T21:23:10.407Z",
  "arrival_time": "2025-01-25T21:23:10.407Z",
  "trip_id": 0
}
```
---
#### Get Flight
---
Submit a PUT request to localhost:8000/api/flights/{flight_id} <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "flight_number": "string",
  "departure_time": "2025-01-25T21:23:10.407Z",
  "arrival_time": "2025-01-25T21:23:10.407Z",
  "trip_id": 0
}
```
---
#### Delete Flight
---
Submit a PUT request to localhost:8000/api/flights/{flight_id} <br>
*A successful call will return the following:*
```
true
```
---

### Events
#### Create Event
---
Submit a POST request to localhost:8000/api/events <br>
*A successful call will return the following:*
```
{
  "name": "string",
  "start_date_time": "2025-01-25T21:30:46.605Z",
  "end_date_time": "2025-01-25T21:30:46.605Z",
  "address": "string",
  "description": "string",
  "trip_id": 0
}
```
---
#### Get Events
---
Submit a POST request to localhost:8000/api/trips/{trip_id}/events <br>
*A successful call will return the following:*
```
[
  {
    "id": 0,
    "name": "string",
    "start_date_time": "2025-01-25T21:31:44.983Z",
    "end_date_time": "2025-01-25T21:31:44.983Z",
    "address": "string",
    "description": "string",
    "trip_id": 0
  }
]
```
---
#### Update Event
---
Submit a PUT request to localhost:8000/api/events/{event_id}
*A successful call will return the following:*
```
{
  "id": 0,
  "name": "string",
  "start_date_time": "2025-01-25T21:36:20.592Z",
  "end_date_time": "2025-01-25T21:36:20.592Z",
  "address": "string",
  "description": "string",
  "trip_id": 0
}
```
---
#### Get Event
---
Submit a PUT request to localhost:8000/api/events/{event_id}
*A successful call will return the following:*
```
{
  "id": 0,
  "name": "string",
  "start_date_time": "2025-01-25T21:43:10.062Z",
  "end_date_time": "2025-01-25T21:43:10.062Z",
  "address": "string",
  "description": "string",
  "trip_id": 0
}
```
---
#### Delete Event
---
Submit a PUT request to localhost:8000/api/events/{event_id}
*A successful call will return the following:*
```
true
```
---
### Lodgings
#### Create Lodging
---
Submit a POST request to localhost:8000/api/lodgings <br>
*A successful call will return the following:*
```
{
  "id": 0,
  "name": "string",
  "address": "string",
  "check_in": "2025-01-25T21:45:14.864Z",
  "check_out": "2025-01-25T21:45:14.864Z",
  "trip_id": 0
}
```
---
#### Get Lodgings
---
Submit a GET request to localhost:8000/api/trips/{trip_id}/lodgings <br>
*A successful call will return the following:*
```
[
  {
    "id": 0,
    "name": "string",
    "address": "string",
    "check_in": "2025-01-25T21:47:00.771Z",
    "check_out": "2025-01-25T21:47:00.771Z",
    "trip_id": 0
  }
]
```
---
#### Update Lodging
---
Submit a PUT request to localhost:8000/api/lodgings/{lodging_id}
*A successful call will return the following:*
```
{
  "id": 0,
  "name": "string",
  "address": "string",
  "check_in": "2025-01-25T21:48:24.973Z",
  "check_out": "2025-01-25T21:48:24.973Z",
  "trip_id": 0
}
```
---
#### Get Lodging
---
Submit a GET request to localhost:8000/api/lodgings/{lodging_id}
*A successful call will return the following:*
```
{
  "id": 0,
  "name": "string",
  "start_date_time": "2025-01-25T21:43:10.062Z",
  "end_date_time": "2025-01-25T21:43:10.062Z",
  "location": "string",
  "description": "string",
  "trip_id": 0
}
```
---
#### Delete Lodging
---
Submit a PUT request to localhost:8000/api/lodgings/{lodging_id}
*A successful call will return the following:*
```
true
```
---

## Roadmap / Future Improvements
**Features to be added include:**
- **Expanded User Account Functionality**:
Create an account profile, complete with capability for users to upload custom profile pictures!
- **Expanded Map Functionality**: Adding new features to our maps that include driving directions, air quality, weather, driving directions, ability to detect user location, and more!
- **Social Media Functionality**: Ability for users to message one another in an instant messanger, as well as capability to add other users to project, share comments on other user's events, and more!
- **Secure Login with 0Auth**: Expanding our users' ability to log into Roamio with greater ease!



<br> <br> <br> <br> <br> <br>
Documentation: 5%

The README.md file for the project and associated files in your docs directory should accurately represent what the application is, what it does, how it's built, what the future of the application would be, have correct spelling and grammar. This is also something that hiring managers will look at, so do it right for them (and for this grade). Here's an example of a very nice README.md

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

-   [ ] Wire-frame diagrams
-   [ ] API documentation
-   [ ] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
-   [ ] GitLab issue board is setup and in use (or project management tool of choice)
-   [ ] Journals


### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.


-   `.gitlab-ci.yml`: This is your "ci/cd" file where you will
    configure automated unit tests, code quality checks, and
    the building and deployment of your production system.
    Currently, all it does is deploy an "under construction"
    page to your production UI on GitLab and a sample backend
    to CapRover. We will learn much more about this file.

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

### Setup GitLab repo/project

-   make sure this project is in a group. If it isn't, stop
    now and move it to a GitLab group
-   remove the fork relationship: In GitLab go to:

    Settings -> General -> Advanced -> Remove fork relationship

-   add these GitLab CI/CD variables:
    -   PUBLIC_URL : this is your gitlab pages URL
    -   VITE_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME
