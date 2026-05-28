# Tour & Travel Management System

A comprehensive travel management system with hotel booking, transport booking, package booking, and transaction management. The system includes spam hotel detection to prevent fraudulent bookings.

## Features

### Frontend (HTML, CSS, JavaScript)
- **Modern Responsive UI**: Beautiful and responsive design with gradient backgrounds and smooth animations
- **Hotel Booking**: Complete hotel booking form with date selection, guest count, and room types
- **Transport Booking**: Flight, train, bus, and car rental booking options
- **Package Booking**: Pre-defined tour packages with pricing
- **Transaction Management**: Customer details and payment processing
- **Real-time Validation**: Form validation and booking summary updates

### Backend (Java)
- **Spam Hotel Detection**: Advanced algorithm to detect and prevent spam hotel listings
- **Booking Service**: Complete booking management for hotels, transport, and packages
- **Database Service**: In-memory database for storing customer details and bookings
- **REST API**: HTTP endpoints for frontend-backend communication
- **Transaction Processing**: Secure payment processing simulation

## Project Structure

```
travel-system/
├── index.html              # Main HTML file
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── backend/                # Java backend
│   ├── HotelSpamDetector.java    # Spam detection algorithm
│   ├── BookingService.java      # Booking management service
│   ├── DatabaseService.java     # Database operations
│   ├── DataModels.java          # Data model classes
│   ├── Main.java                # Demo application
│   └── TravelAPI.java           # REST API server
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Java 8 or higher
- Web browser (Chrome, Firefox, Safari, Edge)

### Running the System

#### 1. Start the Backend API Server

```bash
cd travel-system/backend
javac *.java
java TravelAPI
```

The API server will start on `http://localhost:8080`

#### 2. Open the Frontend

Open `travel-system/index.html` in your web browser.

### Alternative: Run Backend Demo

To see the spam detection and booking system in action:

```bash
cd travel-system/backend
javac *.java
java Main
```

## How It Works

### Spam Hotel Detection

The system uses multiple algorithms to detect spam hotels:

1. **Keyword Detection**: Identifies common spam keywords like "free", "win", "prize", "urgent"
2. **Pattern Analysis**: Detects suspicious patterns in hotel names and locations
3. **Quality Assessment**: Evaluates name and location quality
4. **Scoring System**: Assigns spam scores based on various factors

### Booking Process

1. **Hotel Booking**:
   - User fills hotel booking form
   - System checks if hotel is spam
   - If spam detected, booking is blocked
   - If legitimate, booking proceeds with price calculation

2. **Transport Booking**:
   - User selects transport type and details
   - System calculates pricing based on type and passengers
   - Booking is saved to database

3. **Package Booking**:
   - User selects from available tour packages
   - Package details and pricing are displayed
   - Booking is added to cart

4. **Transaction Processing**:
   - Customer details are collected
   - Payment information is validated
   - Transaction is processed
   - Booking confirmation is generated

## API Endpoints

### Hotel Spam Check
- **POST** `/api/hotels/check-spam`
- **Body**: `{"hotelName": "string", "location": "string"}`
- **Response**: `{"isSpam": boolean, "reason": "string", "spamScore": number}`

### Hotel Booking
- **POST** `/api/hotels/book`
- **Body**: Hotel booking details
- **Response**: Booking result with success status

### Transport Booking
- **POST** `/api/transport/book`
- **Body**: Transport booking details
- **Response**: Booking result with success status

### Package Booking
- **POST** `/api/packages/book`
- **Body**: Package booking details
- **Response**: Booking result with success status

### Transaction Processing
- **POST** `/api/transactions/process`
- **Body**: Customer details, payment info, and bookings
- **Response**: Transaction result with success status

### Statistics
- **GET** `/api/stats`
- **Response**: Database statistics

## Spam Detection Examples

### Legitimate Hotels (Will Pass)
- "Grand Hotel Plaza" in "New York City"
- "Marriott Resort" in "Miami Beach"
- "Hilton Garden Inn" in "Chicago"

### Spam Hotels (Will Be Blocked)
- "FREE WIN PRIZE HOTEL" in "URGENT LIMITED TIME"
- "$$$ CHEAP HOTEL $$$" in "CLICK HERE NOW"
- "Hotel123" in "City" (suspicious patterns)

## Features in Detail

### Frontend Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds, smooth animations, and professional styling
- **Form Validation**: Real-time validation of user inputs
- **Modal Dialogs**: Loading, success, and error modals for better UX
- **Booking Summary**: Real-time updates of booking total and items

### Backend Features
- **Advanced Spam Detection**: Multi-layered spam detection algorithm
- **Booking Management**: Complete CRUD operations for all booking types
- **Database Operations**: In-memory database with statistics
- **REST API**: Full REST API with CORS support
- **Error Handling**: Comprehensive error handling and logging

## Testing the System

### Test Spam Detection
1. Try booking a hotel with name "FREE WIN PRIZE HOTEL"
2. The system should block the booking and show an error message
3. Try booking a legitimate hotel like "Grand Hotel Plaza"
4. The booking should proceed normally

### Test Booking Flow
1. Fill out hotel booking form
2. Add transport booking
3. Select a tour package
4. Complete transaction with customer details
5. Verify booking confirmation

## Customization

### Adding New Spam Keywords
Edit `HotelSpamDetector.java` and add keywords to the `SPAM_KEYWORDS` set:

```java
private static final Set<String> SPAM_KEYWORDS = new HashSet<>(Arrays.asList(
    "free", "win", "prize", "urgent", "limited time", "act now",
    "your_new_keyword"  // Add your keywords here
));
```

### Modifying Pricing
Edit the pricing logic in `BookingService.java`:

```java
private double calculateHotelPrice(HotelBookingRequest request) {
    double basePrice = 100.0; // Modify base price
    // Add your pricing logic here
}
```

### Adding New Package Types
Edit the packages section in `index.html` and add new package cards.

## Troubleshooting

### Common Issues

1. **API Server Not Starting**
   - Ensure Java is installed and in PATH
   - Check if port 8080 is available
   - Try a different port: `java TravelAPI 8081`

2. **Frontend Not Connecting to Backend**
   - Ensure API server is running on localhost:8080
   - Check browser console for CORS errors
   - Verify API endpoints are accessible

3. **Spam Detection Not Working**
   - Check if API server is running
   - Verify spam detection endpoint is accessible
   - Check browser console for errors

## Future Enhancements

- **Real Database Integration**: Replace in-memory database with MySQL/PostgreSQL
- **User Authentication**: Add user login and registration
- **Email Notifications**: Send booking confirmations via email
- **Payment Gateway Integration**: Integrate with real payment processors
- **Admin Dashboard**: Add administrative interface for managing bookings
- **Mobile App**: Develop native mobile applications
- **Advanced Analytics**: Add booking analytics and reporting

## License

This project is for educational and demonstration purposes.
