// Global variables
let currentUser = null;
let currentBooking = {
    hotel: null,
    transport: null,
    totalAmount: 0
};

let selectedLocation = {
    country: '',
    state: ''
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    } else {
        showLogin();
    }
    
    initializeForms();
    initializeLocationSelection();
}

// Authentication functions
function showLogin() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'none';
}

function showSignup() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'block';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    // Update user name in navbar
    if (currentUser) {
        document.getElementById('userName').textContent = `Welcome, ${currentUser.firstName}`;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
}

// Location selection
function initializeLocationSelection() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            selectedLocation.country = this.value;
            updateStateOptions();
        });
    }
    
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            selectedLocation.state = this.value;
        });
    }
}

function updateStateOptions() {
    const stateSelect = document.getElementById('state');
    const states = {
        'usa': ['New York', 'California', 'Florida', 'Texas', 'Illinois'],
        'uk': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
        'france': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
        'italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
        'spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
        'japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
        'australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
        'india': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata']
    };
    
    stateSelect.innerHTML = '<option value="">Select State/City</option>';
    
    if (selectedLocation.country && states[selectedLocation.country]) {
        states[selectedLocation.country].forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Service selection
function selectService(serviceType) {
    if (!selectedLocation.country || !selectedLocation.state) {
        alert('Please select both country and state/city first.');
        return;
    }
    
    if (serviceType === 'hotels') {
        loadHotels();
        showSection('hotels');
    } else if (serviceType === 'transport') {
        loadTransport();
        showSection('transport');
    }
}

// Load hotels data
function loadHotels() {
    const hotelsGrid = document.getElementById('hotelsGrid');
    const selectedCity = document.getElementById('selectedCity');
    
    if (selectedCity) {
        selectedCity.textContent = selectedLocation.state;
    }
    
    // Sample hotels data
    const hotels = [
        {
            id: 1,
            name: 'Grand Hotel Plaza',
            location: selectedLocation.state,
            rating: 4.5,
            price: 150,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 2,
            name: 'Luxury Resort & Spa',
            location: selectedLocation.state,
            rating: 4.8,
            price: 250,
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 3,
            name: 'Business Hotel Central',
            location: selectedLocation.state,
            rating: 4.2,
            price: 120,
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 4,
            name: 'Boutique Hotel',
            location: selectedLocation.state,
            rating: 4.6,
            price: 180,
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 5,
            name: 'Budget Inn',
            location: selectedLocation.state,
            rating: 1.0,
            price: 800,
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 6,
            name: 'Mountain View Lodge',
            location: selectedLocation.state,
            rating: 4.4,
            price: 200,
            image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&crop=center'
        }
    ];
    
    hotelsGrid.innerHTML = '';
    
    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        // Check if hotel is spam (client-side check for display)
        const isSpamDisplay = checkHotelSpamFallback(hotel.name, hotel.location, hotel.rating, hotel.price);
        hotelCard.className = isSpamDisplay ? 'hotel-card spam-hotel' : 'hotel-card';
        hotelCard.onclick = () => selectHotel(hotel);
        
        hotelCard.innerHTML = `
            <div class="hotel-image">
                <img src="${hotel.image}" alt="${hotel.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                ${isSpamDisplay ? '<div class="spam-indicator">🚫 SPAM</div>' : ''}
            </div>
            <div class="hotel-content">
                <h3>${hotel.name} ${isSpamDisplay ? '<span class="spam-badge">SPAM</span>' : ''}</h3>
                <div class="hotel-location">${hotel.location}</div>
                <div class="hotel-rating ${isSpamDisplay ? 'spam-rating' : ''}">
                    <div class="stars">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5 - Math.floor(hotel.rating))}</div>
                    <span class="rating-text">${hotel.rating}/5</span>
                </div>
                <div class="hotel-price">$${hotel.price}/night</div>
                ${isSpamDisplay ? '<div class="spam-warning">⚠️ This hotel has been flagged as spam</div>' : ''}
            </div>
        `;
        
        hotelsGrid.appendChild(hotelCard);
    });
}

// Select hotel
async function selectHotel(hotel) {
    // Check if hotel is spam before allowing booking
    showLoadingModal();
    
    try {
        const isSpam = await checkHotelSpam(hotel.name, hotel.location, hotel.rating, hotel.price);
        
        if (isSpam) {
            hideLoadingModal();
            showSpamWarning(hotel);
            return;
        }
        
        // Hotel is legitimate, proceed with booking
        currentBooking.hotel = hotel;
        hideLoadingModal();
        showHotelBooking(hotel);
        showSection('hotelBooking');
        
    } catch (error) {
        hideLoadingModal();
        console.error('Error checking hotel spam:', error);
        // Fallback to client-side detection
        const isSpamFallback = checkHotelSpamFallback(hotel.name, hotel.location, hotel.rating, hotel.price);
        
        if (isSpamFallback) {
            showSpamWarning(hotel);
            return;
        }
        
        // Proceed with booking
        currentBooking.hotel = hotel;
        showHotelBooking(hotel);
        showSection('hotelBooking');
    }
}

// Show hotel booking form
function showHotelBooking(hotel) {
    const hotelDetails = document.getElementById('selectedHotelDetails');
    if (hotelDetails) {
        hotelDetails.innerHTML = `
            <h3>${hotel.name}</h3>
            <div class="hotel-location">${hotel.location}</div>
            <div class="hotel-rating">
                <div class="stars">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5 - Math.floor(hotel.rating))}</div>
                <span class="rating-text">${hotel.rating}/5</span>
            </div>
            <div class="hotel-price">$${hotel.price}/night</div>
        `;
    }
    
    // Update price display
    updateHotelPrice();
}

// Load transport data
function loadTransport() {
    const transportGrid = document.getElementById('transportGrid');
    
    // Sample transport data
    const transportOptions = [
        {
            id: 1,
            name: 'Flight',
            description: 'Fast and comfortable air travel',
            price: 300,
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 2,
            name: 'Train',
            description: 'Scenic and comfortable rail travel',
            price: 150,
            image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 3,
            name: 'Bus',
            description: 'Economical ground transportation',
            price: 80,
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 4,
            name: 'Car Rental',
            description: 'Flexible self-drive option',
            price: 120,
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 5,
            name: 'Taxi',
            description: 'Convenient door-to-door service',
            price: 100,
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center'
        },
        {
            id: 6,
            name: 'Boat',
            description: 'Scenic water transportation',
            price: 200,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center'
        }
    ];
    
    transportGrid.innerHTML = '';
    
    transportOptions.forEach(transport => {
        const transportCard = document.createElement('div');
        transportCard.className = 'transport-card';
        transportCard.onclick = () => selectTransport(transport);
        
        transportCard.innerHTML = `
            <div class="transport-image">
                <img src="${transport.image}" alt="${transport.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
            </div>
            <div class="transport-content">
                <h3>${transport.name}</h3>
                <p>${transport.description}</p>
                <div class="transport-price">$${transport.price}</div>
            </div>
        `;
        
        transportGrid.appendChild(transportCard);
    });
}

// Select transport
function selectTransport(transport) {
    currentBooking.transport = transport;
    showTransportBooking(transport);
    showSection('transportBooking');
}

// Show transport booking form
function showTransportBooking(transport) {
    const transportDetails = document.getElementById('selectedTransportDetails');
    if (transportDetails) {
        transportDetails.innerHTML = `
            <h3>${transport.name}</h3>
            <p>${transport.description}</p>
            <div class="transport-price">$${transport.price}</div>
        `;
    }
    
    // Update price display
    updateTransportPrice();
}

// Initialize form handlers
function initializeForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Hotel booking form
    const hotelBookingForm = document.getElementById('hotelBookingForm');
    if (hotelBookingForm) {
        hotelBookingForm.addEventListener('submit', handleHotelBooking);
        // Add event listeners for price calculation
        const guests = document.getElementById('guests');
        const rooms = document.getElementById('rooms');
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        
        if (guests) guests.addEventListener('change', updateHotelPrice);
        if (rooms) rooms.addEventListener('change', updateHotelPrice);
        if (checkIn) checkIn.addEventListener('change', updateHotelPrice);
        if (checkOut) checkOut.addEventListener('change', updateHotelPrice);
    }

    // Transport booking form
    const transportBookingForm = document.getElementById('transportBookingForm');
    if (transportBookingForm) {
        transportBookingForm.addEventListener('submit', handleTransportBooking);
        // Add event listener for price calculation
        const passengers = document.getElementById('passengers');
        if (passengers) passengers.addEventListener('change', updateTransportPrice);
    }

    // Transaction form
    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.addEventListener('submit', handleTransaction);
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }

    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation (in real app, check against database)
    if (email && password) {
        currentUser = {
            email: email,
            firstName: 'User',
            lastName: 'Name'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
    } else {
        alert('Please fill in all fields.');
    }
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    if (firstName && lastName && email && phone && password) {
        currentUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showMainApp();
    } else {
        alert('Please fill in all fields.');
    }
}

// Update hotel price
function updateHotelPrice() {
    if (!currentBooking.hotel) return;
    
    const guests = parseInt(document.getElementById('guests').value) || 1;
    const rooms = parseInt(document.getElementById('rooms').value) || 1;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    let nights = 1;
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        if (nights <= 0) nights = 1;
    }
    
    const basePrice = currentBooking.hotel.price;
    const totalPrice = basePrice * nights * rooms;
    
    // Update price display
    document.getElementById('basePrice').textContent = `$${basePrice}`;
    document.getElementById('nights').textContent = nights;
    document.getElementById('roomCount').textContent = rooms;
    document.getElementById('totalPrice').textContent = `$${totalPrice}`;
    
    currentBooking.totalAmount = totalPrice;
}

// Update transport price
function updateTransportPrice() {
    if (!currentBooking.transport) return;
    
    const passengers = parseInt(document.getElementById('passengers').value) || 1;
    const basePrice = currentBooking.transport.price;
    const totalPrice = basePrice * passengers;
    
    // Update price display
    document.getElementById('transportBasePrice').textContent = `$${basePrice}`;
    document.getElementById('passengerCount').textContent = passengers;
    document.getElementById('transportTotalPrice').textContent = `$${totalPrice}`;
    
    currentBooking.totalAmount = totalPrice;
}

// Handle hotel booking
async function handleHotelBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const guests = formData.get('guests');
    const rooms = formData.get('rooms');
    const checkIn = formData.get('checkIn');
    const checkOut = formData.get('checkOut');
    
    if (!checkIn || !checkOut) {
        alert('Please select both check-in and check-out dates.');
        return;
    }
    
    showLoadingModal();

    try {
        // Check if hotel is spam using ratings and pricing
        const isSpam = await checkHotelSpam(currentBooking.hotel.name, currentBooking.hotel.location, currentBooking.hotel.rating, currentBooking.hotel.price);
        
        if (isSpam) {
            hideLoadingModal();
            showErrorModal('This hotel has been flagged as spam based on ratings and pricing. Please choose a different hotel.');
            return;
        }

        // Store booking details
        currentBooking.hotel.bookingDetails = {
            guests: guests,
            rooms: rooms,
            checkIn: checkIn,
            checkOut: checkOut
        };

        hideLoadingModal();
        
        // Show transaction confirmation
        showTransactionConfirmation();
        
    } catch (error) {
        hideLoadingModal();
        showErrorModal('Error processing hotel booking. Please try again.');
        console.error('Hotel booking error:', error);
    }
}

// Handle transport booking
async function handleTransportBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const fromLocation = formData.get('fromLocation');
    const toLocation = formData.get('toLocation');
    const departureDate = formData.get('departureDate');
    const returnDate = formData.get('returnDate');
    const passengers = formData.get('passengers');
    
    if (!fromLocation || !toLocation || !departureDate) {
        alert('Please fill in all required fields.');
        return;
    }
    
    showLoadingModal();

    try {
        // Store booking details
        currentBooking.transport.bookingDetails = {
            fromLocation: fromLocation,
            toLocation: toLocation,
            departureDate: departureDate,
            returnDate: returnDate,
            passengers: passengers
        };

        hideLoadingModal();
        
        // Show transaction confirmation
        showTransactionConfirmation();
        
    } catch (error) {
        hideLoadingModal();
        showErrorModal('Error processing transport booking. Please try again.');
        console.error('Transport booking error:', error);
    }
}

// Show transaction confirmation
function showTransactionConfirmation() {
    const transactionSummary = document.getElementById('transactionSummary');
    const totalAmount = document.getElementById('totalAmount');
    
    if (transactionSummary) {
        let summaryHTML = '';
        
        if (currentBooking.hotel) {
            summaryHTML += `
                <div class="booking-item">
                    <h4>Hotel Booking</h4>
                    <p><strong>Hotel:</strong> ${currentBooking.hotel.name}</p>
                    <p><strong>Location:</strong> ${currentBooking.hotel.location}</p>
                    <p><strong>Check-in:</strong> ${currentBooking.hotel.bookingDetails.checkIn}</p>
                    <p><strong>Check-out:</strong> ${currentBooking.hotel.bookingDetails.checkOut}</p>
                    <p><strong>Guests:</strong> ${currentBooking.hotel.bookingDetails.guests}</p>
                    <p><strong>Rooms:</strong> ${currentBooking.hotel.bookingDetails.rooms}</p>
                    <p><strong>Price:</strong> $${currentBooking.totalAmount}</p>
                </div>
            `;
        }
        
        if (currentBooking.transport) {
            summaryHTML += `
                <div class="booking-item">
                    <h4>Transport Booking</h4>
                    <p><strong>Transport:</strong> ${currentBooking.transport.name}</p>
                    <p><strong>From:</strong> ${currentBooking.transport.bookingDetails.fromLocation}</p>
                    <p><strong>To:</strong> ${currentBooking.transport.bookingDetails.toLocation}</p>
                    <p><strong>Departure:</strong> ${currentBooking.transport.bookingDetails.departureDate}</p>
                    <p><strong>Passengers:</strong> ${currentBooking.transport.bookingDetails.passengers}</p>
                    <p><strong>Price:</strong> $${currentBooking.totalAmount}</p>
                </div>
            `;
        }
        
        transactionSummary.innerHTML = summaryHTML;
    }
    
    if (totalAmount) {
        totalAmount.textContent = currentBooking.totalAmount;
    }
    
    showSection('transactionConfirm');
}

// Handle transaction
async function handleTransaction(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        cardNumber: formData.get('cardNumber'),
        expiryDate: formData.get('expiryDate'),
        cvv: formData.get('cvv')
    };

    // Validate payment details
    if (!validatePaymentDetails(customerData)) {
        showErrorModal('Please check your payment details and try again.');
        return;
    }

    showLoadingModal();

    try {
        // Process payment
        const paymentResult = await processPayment(customerData, currentBooking.totalAmount);
        
        if (paymentResult.success) {
            // Save booking to database
            await saveBookingToDatabase(customerData, currentBooking);
            
            hideLoadingModal();
            showTransactionSuccess();
            
        } else {
            hideLoadingModal();
            showErrorModal(paymentResult.message || 'Payment failed. Please try again.');
        }
        
    } catch (error) {
        hideLoadingModal();
        showErrorModal('Error processing payment. Please try again.');
        console.error('Transaction error:', error);
    }
}

// Show transaction success
function showTransactionSuccess() {
    const successBookingDetails = document.getElementById('successBookingDetails');
    
    if (successBookingDetails) {
        let detailsHTML = '';
        
        if (currentBooking.hotel) {
            detailsHTML += `
                <div class="booking-detail-item">
                    <h4>Hotel Booking Confirmed</h4>
                    <p><strong>Hotel:</strong> ${currentBooking.hotel.name}</p>
                    <p><strong>Location:</strong> ${currentBooking.hotel.location}</p>
                    <p><strong>Check-in:</strong> ${currentBooking.hotel.bookingDetails.checkIn}</p>
                    <p><strong>Check-out:</strong> ${currentBooking.hotel.bookingDetails.checkOut}</p>
                    <p><strong>Total:</strong> $${currentBooking.totalAmount}</p>
                </div>
            `;
        }
        
        if (currentBooking.transport) {
            detailsHTML += `
                <div class="booking-detail-item">
                    <h4>Transport Booking Confirmed</h4>
                    <p><strong>Transport:</strong> ${currentBooking.transport.name}</p>
                    <p><strong>Route:</strong> ${currentBooking.transport.bookingDetails.fromLocation} to ${currentBooking.transport.bookingDetails.toLocation}</p>
                    <p><strong>Departure:</strong> ${currentBooking.transport.bookingDetails.departureDate}</p>
                    <p><strong>Total:</strong> $${currentBooking.totalAmount}</p>
                </div>
            `;
        }
        
        successBookingDetails.innerHTML = detailsHTML;
    }
    
    showSection('transactionSuccess');
}

// Print booking
function printBooking() {
    window.print();
}

// Handle transport booking
async function handleTransportBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const transportData = {
        type: formData.get('transportType'),
        from: formData.get('fromLocation'),
        to: formData.get('toLocation'),
        departureDate: formData.get('departureDate'),
        returnDate: formData.get('returnDate'),
        passengers: formData.get('passengers')
    };

    showLoadingModal();

    try {
        // Calculate price
        const price = calculateTransportPrice(transportData);
        
        currentBooking.transport = {
            ...transportData,
            price: price
        };

        hideLoadingModal();
        showSuccessModal('Transport booking added to your cart!');
        
        // Clear form
        e.target.reset();
        
        // Update booking summary
        updateBookingSummary();
        
    } catch (error) {
        hideLoadingModal();
        showErrorModal('Error processing transport booking. Please try again.');
        console.error('Transport booking error:', error);
    }
}

// Handle transaction completion
async function handleTransaction(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        cardNumber: formData.get('cardNumber'),
        expiryDate: formData.get('expiryDate'),
        cvv: formData.get('cvv')
    };

    // Validate payment details
    if (!validatePaymentDetails(customerData)) {
        showErrorModal('Please check your payment details and try again.');
        return;
    }

    showLoadingModal();

    try {
        // Process payment
        const paymentResult = await processPayment(customerData, currentBooking.totalAmount);
        
        if (paymentResult.success) {
            // Save booking to database
            await saveBookingToDatabase(customerData, currentBooking);
            
            hideLoadingModal();
            showSuccessModal('Booking completed successfully! You will receive a confirmation email shortly.');
            
            // Clear all data
            clearBookingData();
            e.target.reset();
            updateBookingSummary();
            
        } else {
            hideLoadingModal();
            showErrorModal(paymentResult.message || 'Payment failed. Please try again.');
        }
        
    } catch (error) {
        hideLoadingModal();
        showErrorModal('Error processing payment. Please try again.');
        console.error('Transaction error:', error);
    }
}

// Check if hotel is spam using ratings and pricing (API call to Java backend)
async function checkHotelSpam(hotelName, location, rating, price) {
    try {
        const response = await fetch('http://localhost:8080/api/hotels/check-spam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hotelName: hotelName,
                location: location,
                rating: rating,
                price: price
            })
        });
        
        const data = await response.json();
        return data.isSpam;
    } catch (error) {
        console.error('Error checking spam:', error);
        // Fallback to client-side detection if API is not available
        return checkHotelSpamFallback(hotelName, location, rating, price);
    }
}

// Fallback spam detection using ratings and pricing (client-side)
function checkHotelSpamFallback(hotelName, location, rating, price) {
    const spamKeywords = ['free', 'win', 'prize', 'urgent', 'limited time', 'act now'];
    const hotelNameLower = hotelName.toLowerCase();
    const locationLower = location.toLowerCase();
    
    // Check for specific spam hotel names
    if (hotelNameLower === 'hotel inn') {
        return true;
    }
    
    // Check for spam keywords
    for (const keyword of spamKeywords) {
        if (hotelNameLower.includes(keyword) || locationLower.includes(keyword)) {
            return true;
        }
    }
    
    // Check for suspicious patterns
    if (hotelNameLower.includes('hotel') && hotelNameLower.length < 5) {
        return true;
    }
    
    // Check for suspicious rating patterns
    if (rating < 2.0 || rating > 5.0) {
        return true;
    }
    
    // Check for suspicious pricing patterns
    if (price < 10 || price > 1000) {
        return true;
    }
    
    // Check for rating-price mismatch (suspiciously high rating with very low price)
    if (rating > 4.5 && price < 50) {
        return true;
    }
    
    // Check for rating-price mismatch (suspiciously low rating with very high price)
    if (rating < 3.0 && price > 200) {
        return true;
    }
    
    return false;
}

// Calculate hotel price
function calculateHotelPrice(hotelData) {
    const basePrice = 100;
    const roomTypeMultiplier = {
        'standard': 1,
        'deluxe': 1.5,
        'suite': 2
    };
    
    const checkIn = new Date(hotelData.checkIn);
    const checkOut = new Date(hotelData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return Math.round(basePrice * roomTypeMultiplier[hotelData.roomType] * nights);
}

// Calculate transport price
function calculateTransportPrice(transportData) {
    const basePrices = {
        'flight': 300,
        'train': 150,
        'bus': 80,
        'car': 120
    };
    
    const basePrice = basePrices[transportData.type] || 100;
    const passengerCount = parseInt(transportData.passengers) || 1;
    
    return basePrice * passengerCount;
}

// Select package
function selectPackage(packageType, price) {
    currentBooking.package = {
        type: packageType,
        price: price
    };
    
    showSuccessModal('Package added to your cart!');
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const summaryDiv = document.getElementById('bookingSummary');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    if (!summaryDiv || !totalAmountSpan) return;
    
    let summaryHTML = '';
    let total = 0;
    
    if (currentBooking.hotel) {
        summaryHTML += `
            <div class="booking-item">
                <strong>Hotel:</strong> ${currentBooking.hotel.name} - $${currentBooking.hotel.price}
            </div>
        `;
        total += currentBooking.hotel.price;
    }
    
    if (currentBooking.transport) {
        summaryHTML += `
            <div class="booking-item">
                <strong>Transport:</strong> ${currentBooking.transport.type} - $${currentBooking.transport.price}
            </div>
        `;
        total += currentBooking.transport.price;
    }
    
    if (currentBooking.package) {
        summaryHTML += `
            <div class="booking-item">
                <strong>Package:</strong> ${currentBooking.package.type} - $${currentBooking.package.price}
            </div>
        `;
        total += currentBooking.package.price;
    }
    
    if (summaryHTML === '') {
        summaryHTML = '<p>No items in your booking yet.</p>';
    }
    
    summaryDiv.innerHTML = summaryHTML;
    totalAmountSpan.textContent = total;
    currentBooking.totalAmount = total;
}

// Validate payment details
function validatePaymentDetails(customerData) {
    // Basic validation
    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
        return false;
    }
    
    // Card number validation (basic)
    const cardNumber = customerData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }
    
    // Expiry date validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(customerData.expiryDate)) {
        return false;
    }
    
    // CVV validation
    if (customerData.cvv.length < 3 || customerData.cvv.length > 4) {
        return false;
    }
    
    return true;
}

// Process payment (simulated)
async function processPayment(customerData, amount) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate
    
    return {
        success: success,
        transactionId: success ? 'TXN' + Date.now() : null,
        message: success ? 'Payment processed successfully' : 'Payment failed'
    };
}

// Save booking to database (API call to Java backend)
async function saveBookingToDatabase(customerData, bookingData) {
    try {
        const response = await fetch('http://localhost:8080/api/transactions/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerDetails: customerData,
                paymentDetails: {
                    cardNumber: customerData.cardNumber,
                    expiryDate: customerData.expiryDate,
                    cvv: customerData.cvv,
                    cardHolderName: customerData.firstName + ' ' + customerData.lastName
                },
                bookings: [bookingData],
                totalAmount: bookingData.totalAmount || 0
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('Booking saved successfully:', result.transaction);
            return result.transaction;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error saving booking:', error);
        // Fallback to simulated save
        return await saveBookingToDatabaseFallback(customerData, bookingData);
    }
}

// Fallback save (simulated)
async function saveBookingToDatabaseFallback(customerData, bookingData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const booking = {
        id: 'BK' + Date.now(),
        customer: customerData,
        booking: bookingData,
        timestamp: new Date().toISOString()
    };
    
    // In a real application, this would save to a database
    console.log('Booking saved (fallback):', booking);
    
    return booking;
}

// Clear booking data
function clearBookingData() {
    currentBooking = {
        hotel: null,
        transport: null,
        package: null,
        totalAmount: 0
    };
}

// Format card number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = formattedValue;
}

// Format expiry date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Modal functions
function showLoadingModal() {
    document.getElementById('loadingModal').style.display = 'block';
}

function hideLoadingModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageElement = modal.querySelector('p');
    if (messageElement) {
        messageElement.textContent = message;
    }
    modal.style.display = 'block';
}

function showErrorModal(message) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    if (messageElement) {
        messageElement.textContent = message;
    }
    modal.style.display = 'block';
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Show spam warning modal
function showSpamWarning(hotel) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    
    if (messageElement) {
        messageElement.innerHTML = `
            <strong>🚫 SPAM HOTEL DETECTED</strong><br><br>
            <strong>Hotel:</strong> ${hotel.name}<br>
            <strong>Location:</strong> ${hotel.location}<br>
            <strong>Rating:</strong> ${hotel.rating}/5.0<br>
            <strong>Price:</strong> $${hotel.price}/night<br><br>
            <strong>Reason:</strong> This hotel has been flagged as spam due to suspicious rating and pricing patterns.<br><br>
            <em>Please choose a different hotel for your booking.</em>
        `;
    }
    
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});
