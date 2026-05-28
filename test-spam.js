// Spam Detection Test Script
// Run this in browser console or Node.js to test spam detection

console.log("🧪 Testing Spam Detection System");
console.log("=================================");

// Test cases for spam detection
const testCases = [
    // SPAM CASES (should be detected)
    {
        name: "FREE WIN PRIZE HOTEL",
        location: "URGENT LIMITED TIME",
        rating: 5.0,
        price: 25,
        expected: "SPAM",
        reason: "Spam keywords + rating-price mismatch"
    },
    {
        name: "Luxury Resort",
        location: "Miami",
        rating: 1.5,
        price: 500,
        expected: "SPAM",
        reason: "Low rating + high price mismatch"
    },
    {
        name: "Perfect Hotel",
        location: "City",
        rating: 5.0,
        price: 5,
        expected: "SPAM",
        reason: "Perfect rating + very low price"
    },
    {
        name: "Budget Inn",
        location: "Downtown",
        rating: 2.0,
        price: 300,
        expected: "SPAM",
        reason: "Low rating + high price"
    },
    
    // LEGITIMATE CASES (should be allowed)
    {
        name: "Grand Hotel Plaza",
        location: "New York",
        rating: 4.2,
        price: 150,
        expected: "LEGITIMATE",
        reason: "Realistic rating and pricing"
    },
    {
        name: "Marriott Resort",
        location: "Miami Beach",
        rating: 4.5,
        price: 250,
        expected: "LEGITIMATE",
        reason: "Good rating with reasonable price"
    },
    {
        name: "Business Hotel",
        location: "Chicago",
        rating: 3.8,
        price: 120,
        expected: "LEGITIMATE",
        reason: "Average rating with fair price"
    },
    {
        name: "Budget Inn",
        location: "Downtown",
        rating: 3.2,
        price: 80,
        expected: "LEGITIMATE",
        reason: "Lower rating with budget pricing"
    }
];

// Client-side spam detection function
function checkHotelSpam(hotelName, location, rating, price) {
    const spamKeywords = ['free', 'win', 'prize', 'urgent', 'limited time', 'act now'];
    const hotelNameLower = hotelName.toLowerCase();
    const locationLower = location.toLowerCase();
    
    // Check for spam keywords
    for (const keyword of spamKeywords) {
        if (hotelNameLower.includes(keyword) || locationLower.includes(keyword)) {
            return { isSpam: true, reason: `Spam keyword detected: ${keyword}` };
        }
    }
    
    // Check for suspicious patterns
    if (hotelNameLower.includes('hotel') && hotelNameLower.length < 5) {
        return { isSpam: true, reason: "Suspicious hotel name pattern" };
    }
    
    // Check for suspicious rating patterns
    if (rating < 2.0 || rating > 5.0) {
        return { isSpam: true, reason: `Invalid rating: ${rating}` };
    }
    
    // Check for suspicious pricing patterns
    if (price < 10 || price > 1000) {
        return { isSpam: true, reason: `Unrealistic pricing: $${price}` };
    }
    
    // Check for rating-price mismatch (suspiciously high rating with very low price)
    if (rating > 4.5 && price < 50) {
        return { isSpam: true, reason: `Rating-price mismatch: ${rating}/5 rating with $${price} price` };
    }
    
    // Check for rating-price mismatch (suspiciously low rating with very high price)
    if (rating < 3.0 && price > 200) {
        return { isSpam: true, reason: `Rating-price mismatch: ${rating}/5 rating with $${price} price` };
    }
    
    return { isSpam: false, reason: "No spam indicators found" };
}

// Test API spam detection (if backend is available)
async function testAPISpamDetection(hotelName, location, rating, price) {
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
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('API not responding');
        }
    } catch (error) {
        console.log(`⚠️  API not available, using client-side detection`);
        return null;
    }
}

// Run all tests
async function runSpamDetectionTests() {
    console.log("\n🚀 Running Spam Detection Tests...\n");
    
    let passedTests = 0;
    let totalTests = testCases.length;
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`Test ${i + 1}: ${testCase.name}`);
        console.log(`Location: ${testCase.location}`);
        console.log(`Rating: ${testCase.rating}/5.0, Price: $${testCase.price}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Reason: ${testCase.reason}`);
        
        // Try API first, fallback to client-side
        let result = await testAPISpamDetection(testCase.name, testCase.location, testCase.rating, testCase.price);
        
        if (!result) {
            result = checkHotelSpam(testCase.name, testCase.location, testCase.rating, testCase.price);
        }
        
        const isCorrect = (result.isSpam && testCase.expected === "SPAM") || 
                        (!result.isSpam && testCase.expected === "LEGITIMATE");
        
        if (isCorrect) {
            console.log(`✅ PASS - ${result.isSpam ? 'SPAM DETECTED' : 'LEGITIMATE'}`);
            passedTests++;
        } else {
            console.log(`❌ FAIL - Expected ${testCase.expected}, got ${result.isSpam ? 'SPAM' : 'LEGITIMATE'}`);
        }
        
        console.log(`Detection Reason: ${result.reason}`);
        console.log("---\n");
    }
    
    console.log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log("🎉 All tests passed! Spam detection is working correctly.");
    } else {
        console.log("⚠️  Some tests failed. Check the spam detection logic.");
    }
}

// Run tests when script is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    console.log("🌐 Running in browser environment");
    runSpamDetectionTests();
} else {
    // Node.js environment
    console.log("🖥️  Running in Node.js environment");
    runSpamDetectionTests();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkHotelSpam,
        testAPISpamDetection,
        runSpamDetectionTests,
        testCases
    };
}
