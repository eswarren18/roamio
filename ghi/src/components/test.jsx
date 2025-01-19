[
    {
        "2025-01-14": {
            "flights": [
                {
                    "id": 2,
                    "flight_number": "testdel",
                    "departure_time": "2025-01-14T00:52:30.818000",
                    "arrival_time": "2025-01-14T00:52:30.818000",
                    "trip_id": 1
                },
                {
                    "id": 3,
                    "flight_number": "test2",
                    "departure_time": "2025-01-14T22:21:32.958000",
                    "arrival_time": "2025-01-14T22:21:32.958000",
                    "trip_id": 1
                }
            ],
            "lodgings": [
                {
                    "id": 2,
                    "name": "lodging2",
                    "address": "address",
                    "check_in": "2025-01-14T22:10:06.074000",
                    "check_out": "2025-01-14T22:10:06.074000",
                    "trip_id": 1
                }
            ],
            "events": [
                {
                    "id": 1,
                    "name": "test",
                    "start_date_time": "2025-01-14T18:15:42.250000",
                    "end_date_time": "2025-01-14T18:15:42.250000",
                    "location": "test",
                    "description": "test",
                    "trip_id": 1
                }
            ]
        }
    }
]

const setupAccordion = (tripData, flights, lodgings, events) => {
    const startDate = new Date(tripData.start_date);
    const endDate = new Date(tripData.end_date);
    const tripAccordionData = {};

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toISOString().split("T")[0];
        tripAccordionData[dateKey] = [];
    }

    const addDataToDate = (item, type, dateKey) => {
        tripAccordionData[dateKey].push({ ...item, type });
    };

    flights.forEach(flight => {
        const dateKey = flight.departure_time.split("T")[0];
        addDataToDate(flight, 'flight', dateKey);
    });

    lodgings.forEach(lodging => {
        const checkInKey = lodging.check_in.split("T")[0];
        addDataToDate(lodging, 'lodging', checkInKey);

        const checkOutKey = lodging.check_out.split("T")[0];
        if (checkOutKey !== checkInKey) {
            addDataToDate(lodging, 'lodging', checkOutKey);
        }
    });

    events.forEach(event => {
        const dateKey = event.start_date_time.split("T")[0];
        addDataToDate(event, 'event', dateKey);
    });

    // Sort each date's array based on timestamp
    Object.keys(tripAccordionData).forEach(dateKey => {
        tripAccordionData[dateKey].sort((a, b) => {
            const aTime = new Date(a.departure_time || a.check_in || a.start_date_time).getTime();
            const bTime = new Date(b.departure_time || b.check_in || b.start_date_time).getTime();
            return aTime - bTime;
        });
    });

    setTripAccordion(tripAccordionData);
};

