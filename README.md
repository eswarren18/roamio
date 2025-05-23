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
    <a href="https://gitlab.com/davidiukuridze" style="color:#fc6d26; text-decoration: none;">GitLab</a> |
    <a href="mailto:david.iukuridze@gmail.com" style="color:#D44638; text-decoration: none;">Email</a>
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

Roamio is your simple solution for planning your next trip! With a beautiful interface and simple GUI, users will find Roamio to be both functional and light-weight! Designed with a sleek and intuitive interface, Roamio offers travelers a seamless experience for organizing trips, exploring destinations, and managing itineraries. Whether you're a casual traveler or a seasoned explorer, Roamio provides the tools you need to create memorable journeys effortlessly. <br>

![Wireframe Diagram for Roamio](site_images/roamio_wireframes.png)

## **Key Features**

-   Trip Planning: Create and customize detailed trip itineraries, including destinations and activities.
-   Destination Explorer: Discover new places with comprehensive information, images, and user reviews.
-   User Authentication: Secure signup and login functionalities to protect user data and personalize experiences.
-   Responsive Design: Enjoy a consistent and optimized experience across desktop and mobile devices. <br>
    <br>

<p align="center"><i>Roamio's Homepage</i><br>
<img src="site_images/roamio_screenshot_005.jpeg" alt="Roamio's Homepage"></p>

---

<p align="center"><i>A User's Dashboard showcasing the "All" Trip Card Filter</i><br>
<img src="site_images/roamio_screenshot_004.jpeg" alt="A Google map"></p>

---

<p align="center"><i>
The 'Trip Page' For An Adventure To Rome</i><br>
<img src="site_images/roamio_screenshot_002.jpeg" alt="A Google map"></p>

---

<p align="center"><i>The 'Create Event" Modal Form</i><br>
<img src="site_images/roamio_screenshot_001.jpeg" alt="A Google map"></p>

## **Technical Overview**

_Roamio is built with a modern and scalable technology stack, ensuring high performance and maintainability_:

-   **Frontend**: Developed using React.js with Vite for fast bundling and optimized performance. The user interface is styled with TailwindCSS, providing a flexible and aesthetically pleasing design.
-   **Backend**: Powered by FastAPI, delivering high-performance RESTful API endpoints that facilitate efficient communication between the frontend and backend services.
-   **Database**: Utilizes PostgreSQL for reliable and scalable data storage, supporting complex queries and ensuring data integrity.
-   **Containerization**: The entire application is containerized using Docker, enabling consistent environments across development, testing, and production. This facilitates easy deployment and scalability.

## Tech Stack

<div align="center" style="background-color: #f9f9f9; color: black; padding: 20px; border-radius: 5px;">
  <strong>FastAPI</strong> | <strong>Vite</strong> | <strong>Docker</strong> | <strong>React.js</strong> |
  <strong>PostgreSQL</strong> | <strong>JavaScript</strong> | <strong>TailwindCSS</strong> |
  <strong>Python</strong> | <strong>HTML5</strong> | <strong>CSS</strong> <br>
  <img src="site_images/techstack_collage_438.png" alt="Tech Stack Image" style="margin-top: 15px; max-width: 100%; height: auto;" />
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

<pre><code class="bash">cd roamio</code></pre>

<h3>2. Obtain A Google API Key</h3>

<p>To access Google Maps, Google Geocoding and Google Autocomplete functionality, you'll need to obtain a Google API key:</p>

<ol>
  <li>Visit the <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a>.</li>
  <li>Create a new project or select an existing project.</li>
  <li>Navigate to the <strong>APIs & Services</strong> section and click on <strong>Credentials</strong>.</li>
  <li>Click the <strong>Create Credentials</strong> button and choose <strong>API Key</strong>.</li>
  <li>Copy the generated API Key and store it securely.</li>
  <li>Click on <strong>Library</strong> and Enable Maps JavaScript API, Geocoding API & Places API</li>
  <li>Optionally, you may restrict your API key to specific IP addresses or referrers for enhanced security.</li>
</ol>

<h3>3. Conceal API Key in Local Environment</h3>

<p>Use your favorite IDE or Text Editor to open Roamio's files. In the root directory of Roamio, create a new file called <code>.env</code> .</p>

<p> Add the following line to <code>.env</code>, with your new API key inserted:

<pre><code class="bash">GOOGLE_API_KEY="Insert Your Key Here"</code></pre>

<h3>4. Install and Start Docker</h3>

<p>Ensure that <strong>Docker Desktop</strong> is installed and running on your machine before proceeding.</p>

<ul>
  <li><strong>Windows/macOS:</strong> Launch Docker Desktop from your applications menu.</li>
  <li><strong>Linux:</strong> Make sure the Docker daemon is running. You can start it using:</li>
</ul>

<pre><code class="bash">sudo systemctl start docker</code></pre>

<h3>5. Build and Run the Application</h3>

<p>Create a Docker volume:</p>

<pre><code class="bash">docker volume create beta-data</code></pre>

<p>Build the Docker containers:</p>

<pre><code class="bash">docker-compose build</code></pre>

<p>Start the application:</p>

<pre><code class="bash">docker-compose up</code></pre>

<h3>6. Access the Application</h3>

<p>Once the containers are up and running, open your web browser and navigate to:</p>

<p><a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a></p>

<h3>🎉 Congratulations!</h3>

<p>You're all set! Enjoy exploring and using <strong>Roamio</strong>.</p>

<h3>💻 Roamio FastAPI Endpoint Docs</h3>

<p><a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a></p>

</div>

---

## Usage & Features

Roamio provides a streamlined way to plan and manage your trips!

**Features include:**

-   **User Accounts**: Create a new account or sign in to an existing one.
-   **Trip Management**: Set up and organize multiple trips, each containing its own itinerary.
-   **Event Scheduling**: Add and manage Events, Flights, and Lodging details for each trip.
-   **Interactive Map**: Explore points of interest via an integrated Google Maps API, right inside the application!
    <br>

## FastAPI API Endpoints

### Authentication

#### Signup

---

Submit a POST request to `localhost:8000/api/auth/signup` <br>
_A successful call will return the following:_

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
_A successful call will return the following:_

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
_A successful call will return the following:_

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

#### Get Trips

---

Submit a GET request to `localhost:8000/api/trips` <br>
_A successful call will return the following:_

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
_A successful call will return the following:_

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
_A successful call will return the following:_

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
_A successful call will return the following:_

```
true
```

### Flights <br>

#### Create Flight

---

Submit a POST request to `localhost:8000/api/flights` <br>
_A successful call will return the following:_

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

Submit a GET request to `localhost:8000/api/trips/{trip_id}/flights` <br>
_A successful call will return the following:_

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
_A successful call will return the following:_

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

Submit a GET request to `localhost:8000/api/flights/{flight_id}` <br>
_A successful call will return the following:_

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

Submit a DELETE request to `localhost:8000/api/flights/{flight_id}` <br>
_A successful call will return the following:_

```
true
```

---

### Events

#### Create Event

---

Submit a POST request to `localhost:8000/api/events` <br>
_A successful call will return the following:_

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

Submit a GET request to `localhost:8000/api/trips/{trip_id}/events` <br>
_A successful call will return the following:_

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
_A successful call will return the following:_

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

Submit a GET request to `localhost:8000/api/events/{event_id}` <br>
_A successful call will return the following:_

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

Submit a DELETE request to `localhost:8000/api/events/{event_id}` <br>
_A successful call will return the following:_

```
true
```

---

### Lodgings

#### Create Lodging

---

Submit a POST request to `localhost:8000/api/lodgings` <br>
_A successful call will return the following:_

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
_A successful call will return the following:_

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
_A successful call will return the following:_

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
_A successful call will return the following:_

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

Submit a DELETE request to `localhost:8000/api/lodgings/{lodging_id}` <br>
_A successful call will return the following:_

```
true
```

---

<br>

## Development Roadmap

**Features to be added include:**

-   **Expanded User Account Functionality**:
    Create an account profile, complete with capability for users to upload custom profile pictures!
-   **Expanded Map Functionality**: Adding new features to our maps that include driving directions, air quality, weather, the ability to detect user location and more!
-   **Social Media Functionality**: Ability for users to message one another in an instant messanger, as well as capability to add other users to project, share comments on other users' events, and more!
-   **Secure Login with 0Auth**: Expanding our users' ease in logging into Roamio!
-   **User Reviews and Ratings**: Allow users to rate and to review events and locations!
-   **AI-Powered Chat Assitant**: Integrating a useful AI chat agent to help users plan their next vacation!
