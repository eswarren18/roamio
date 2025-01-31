<!-- Roamio: A Project by Eric Warren, Gregory Reinis & David Iukuridze MMXXV-->
<h2 style="display: inline; font-size: 3em;">Roamio</h2>
<span style="font-size: 1.2em; font-style: italic; padding-left: 30px;">Where Adventure Meets Simplicity!</span>

<br><br>

<h3 style="display: inline; font-size: 2em; margin-bottom: 0.3em;">Developers</h3>

---

<div style="margin-left: 20px;">

  <div style="margin-bottom: 15px;">
    <strong style="font-size:1.2em;">Eric Warren</strong><br>
    <a href="https://www.linkedin.com/in/eric-warren-b-s-9074b661/" style="color:#0077b5; text-decoration: none;">LinkedIn</a> |
    <a href="https://gitlab.com/eswarren18" style="color:#fc6d26; text-decoration: none;">GitLab</a>
  </div>

  <div style="margin-bottom: 15px;">
    <strong style="font-size:1.2em;">David Iukuridze</strong><br>
    <a href="https://www.linkedin.com/in/david-iukuridze/" style="color:#0077b5; text-decoration: none;">LinkedIn</a> |
    <a href="https://gitlab.com/davidiukuridze" style="color:#fc6d26; text-decoration: none;">GitLab</a>
  </div>

  <div style="margin-bottom: 15px;">
    <strong style="font-size:1.2em;">Gregory Reinis</strong><br>
    <a href="https://www.linkedin.com/in/gregoryreinis/" style="color:#0077b5; text-decoration: none;">LinkedIn</a> |
    <a href="https://gitlab.com/GReinis" style="color:#fc6d26; text-decoration: none;">GitLab</a> |
    <a href="mailto:Reinis.Gregory@gmail.com" style="color:#D44638; text-decoration: none;">Email</a>
  </div>

</div>

<br>

## Project Description <br>
Roamio is your simple solution for planning your next trip! With a beautiful interface and simple GUI, users will find Roamio to be both functional and light-weight!  Designed with a sleek and intuitive interface, Roamio offers travelers a seamless experience for organizing trips, exploring destinations, and managing itineraries. Whether you're a casual traveler or a seasoned explorer, Roamio provides the tools you need to create memorable journeys effortlessly. <br>

**Key Features**
---
   - Trip Planning: Create and customize detailed trip itineraries, including destinations, activities, and schedules.
   - Destination Explorer: Discover new places with comprehensive information, images, and user reviews.
   - User Authentication: Secure sign-up and login functionalities to protect user data and personalize experiences.
   - Real-time Updates: Receive timely notifications and updates about your trips and bookings.
   - Responsive Design: Enjoy a consistent and optimized experience across desktop and mobile devices.


**Technical Overview**
---
*Roamio is built with a modern and scalable technology stack, ensuring high performance and maintainability*:
  - **Frontend**: Developed using React.js with Vite for fast bundling and optimized performance. The user interface is styled with TailwindCSS, providing a flexible and aesthetically pleasing design.
  - **Backend**: Powered by FastAPI, delivering high-performance RESTful API endpoints that facilitate efficient communication between the frontend and backend services.
  - **Database**: Utilizes PostgreSQL for reliable and scalable data storage, supporting complex queries and ensuring data integrity.
  - **Containerization**: The entire application is containerized using Docker, enabling consistent environments across development, testing, and production. This facilitates easy deployment and scalability.

## Tech Stack
<div align="center" style="background-color: #f9f9f9; color: black; padding: 20px; border-radius: 5px;">
  <strong>FastAPI</strong> | <strong>Vite</strong> | <strong>Docker</strong> | <strong>React.js</strong> |
  <strong>PostgreSQL</strong> | <strong>JavaScript</strong> | <strong>TailwindCSS</strong> |
  <strong>Python</strong> | <strong>HTML5</strong> | <strong>CSS</strong> <br>
  <img src="./techstack_collage_438.png" alt="Tech Stack Image" style="margin-top: 15px; max-width: 100%; height: auto;" />
</div>
<br>
<br>

# Getting Started with Roamio

<div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; color: black;">

<p>Welcome to <strong>Roamio</strong>! Follow the steps below to set up and run the application on your local machine.</p>

<h3>1. Clone the Repository</h3>

<p>First, clone the Roamio repository to your desired directory:</p>

<pre><code class="bash">git clone https://gitlab.com/man-down/roamio.git</code></pre>

<p>Navigate to the newly cloned directory:</p>

<pre><code class="bash">cd Roamio</code></pre>

<h3>2. Install and Start Docker</h3>

<p>Ensure that <strong>Docker Desktop</strong> is installed and running on your machine before proceeding.</p>

<ul>
  <li><strong>Windows/macOS:</strong> Launch Docker Desktop from your applications menu.</li>
  <li><strong>Linux:</strong> Make sure the Docker daemon is running. You can start it using:</li>
</ul>

<pre><code class="bash">sudo systemctl start docker</code></pre>

<h3>3. Build and Run the Application</h3>

<p>Create a Docker volume:</p>

<pre><code class="bash">docker volume create beta-data</code></pre>

<p>Build the Docker containers:</p>

<pre><code class="bash">docker-compose build</code></pre>

<p>Start the application:</p>

<pre><code class="bash">docker-compose up</code></pre>

<h3>4. Access the Application</h3>

<p>Once the containers are up and running, open your web browser and navigate to:</p>

<p><a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a></p>

<h3>🎉 Congratulations!</h3>

<p>You're all set! Enjoy exploring and using <strong>Roamio</strong>.</p>

</div>

---


## Usage & Features
Roamio provides a streamlined way to plan and manage your trips!

**Features include:**
- **User Accounts**: Create a new account or sign in to an existing one.
- **Trip Management**: Set up and organize multiple trips, each containing its own itinerary.
- **Event Scheduling**: Add and manage Events, Flights, and Lodging details for each trip.
- **Interactive Map**: Explore points of interest via an integrated Google Maps API, right inside the application!
<br>

## FastAPI API Endpoints
### Authentication
#### Signup
---
Submit a POST request to `localhost:8000/api/auth/signup` <br>
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
Submit a POST request to `localhost:8000/api/auth/signin` <br>
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
Submit a POST request to `localhost:8000/api/trips` <br>
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
Submit a GET request to `localhost:8000/api/trips` <br>
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
Submit a PUT request to `localhost:8000/api/trips/{trip_id}` <br>
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
Submit a GET request to `localhost:8000/api/trips/{trip_id}` <br>
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
Submit a DELETE request to `localhost:8000/api/trips/{trip_id}` <br>
*A successful call will return the following:*
```
true
```


### Flights <br>
#### Create Flight
---
Submit a POST request to `localhost:8000/api/flights` <br>
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
Submit a PUT request to `localhost:8000/api/trips/{trip_id}/flights` <br>
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
Submit a PUT request to `localhost:8000/api/flights/{flight_id}` <br>
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
Submit a PUT request to `localhost:8000/api/flights/{flight_id}` <br>
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
Submit a PUT request to `localhost:8000/api/flights/{flight_id}` <br>
*A successful call will return the following:*
```
true
```
---

### Events
#### Create Event
---
Submit a POST request to `localhost:8000/api/events` <br>
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
Submit a POST request to `localhost:8000/api/trips/{trip_id}/events` <br>
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
Submit a PUT request to `localhost:8000/api/events/{event_id}` <br>
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
Submit a PUT request to `localhost:8000/api/events/{event_id}` <br>
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
Submit a PUT request to `localhost:8000/api/events/{event_id}` <br>
*A successful call will return the following:*
```
true
```
---
### Lodgings
#### Create Lodging
---
Submit a POST request to `localhost:8000/api/lodgings` <br>
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
Submit a GET request to `localhost:8000/api/trips/{trip_id}/lodgings` <br>
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
Submit a PUT request to `localhost:8000/api/lodgings/{lodging_id}` <br>
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
Submit a GET request to `localhost:8000/api/lodgings/{lodging_id}` <br>
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
Submit a PUT request to `localhost:8000/api/lodgings/{lodging_id}` <br>
*A successful call will return the following:*
```
true
```
---
<br>


## Development Roadmap
**Features to be added include:**
- **Expanded User Account Functionality**:
Create an account profile, complete with capability for users to upload custom profile pictures!
- **Expanded Map Functionality**: Adding new features to our maps that include driving directions, air quality, weather, the ability to detect user location and more!
- **Social Media Functionality**: Ability for users to message one another in an instant messanger, as well as capability to add other users to project, share comments on other users' events, and more!
- **Secure Login with 0Auth**: Expanding our users' ease in logging into Roamio!
- **User Reviews and Ratings**: Allow users to rate and to review events and locations!
- **AI-Powered Chat Assitant**: Integrating a useful AI chat agent to help users plan their next vacation!
