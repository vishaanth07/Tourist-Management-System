# Spam Detection Testing Guide

## 🎯 How to Test Spam Detection

### Method 1: Using the Test Page (Recommended)

1. **Open the test page**:
   ```
   Open: travel-system/test-spam-detection.html
   ```

2. **Start the backend** (for full testing):
   ```bash
   cd travel-system/backend
   javac *.java
   java TravelAPI
   ```

3. **Test predefined cases**:
   - Click on any test case button to see spam detection in action
   - Spam cases will show "🚫 SPAM DETECTED"
   - Legitimate cases will show "✅ LEGITIMATE HOTEL"

### Method 2: Testing in the Main Application

1. **Start the backend**:
   ```bash
   cd travel-system/backend
   javac *.java
   java TravelAPI
   ```

2. **Open the main application**:
   ```
   Open: travel-system/index.html
   ```

3. **Follow the booking flow**:
   - Login/Signup → Dashboard → Select Country/State
   - Choose Hotels → Select a hotel → Fill booking details
   - Click "Book Now" to trigger spam detection

## 🧪 Test Cases to Verify Spam Detection

### ❌ SPAM Hotels (Should be Blocked)

| Hotel Name | Location | Rating | Price | Reason |
|------------|----------|--------|-------|--------|
| "FREE WIN PRIZE HOTEL" | "URGENT LIMITED TIME" | 5.0 | $25 | Spam keywords + rating-price mismatch |
| "Luxury Resort" | "Miami" | 1.5 | $500 | Low rating + high price mismatch |
| "Perfect Hotel" | "City" | 5.0 | $5 | Perfect rating + very low price |
| "Budget Inn" | "Downtown" | 2.0 | $300 | Low rating + high price |
| "Hotel123" | "Location" | 4.8 | $15 | Suspicious name + rating-price mismatch |
| "$$$ CHEAP HOTEL $$$" | "CLICK HERE NOW" | 5.0 | $20 | Spam keywords + perfect rating |

### ✅ LEGITIMATE Hotels (Should be Allowed)

| Hotel Name | Location | Rating | Price | Reason |
|------------|----------|--------|-------|--------|
| "Grand Hotel Plaza" | "New York" | 4.2 | $150 | Realistic rating and pricing |
| "Marriott Resort" | "Miami Beach" | 4.5 | $250 | Good rating with reasonable price |
| "Business Hotel" | "Chicago" | 3.8 | $120 | Average rating with fair price |
| "Budget Inn" | "Downtown" | 3.2 | $80 | Lower rating with budget pricing |
| "Hilton Garden Inn" | "Los Angeles" | 4.1 | $180 | Standard hotel with normal pricing |
| "Holiday Inn Express" | "Boston" | 3.9 | $140 | Chain hotel with consistent pricing |

## 🔍 Spam Detection Rules

### Keywords That Trigger Spam Detection
- "free", "win", "prize", "urgent", "limited time", "act now"
- "click here", "don't miss", "exclusive", "secret"
- "guaranteed", "no risk", "instant"

### Rating-Based Detection
- **Invalid ratings**: Less than 2.0 or greater than 5.0
- **Perfect ratings**: Exactly 5.0 (suspicious)
- **Very low ratings**: Less than 2.0

### Pricing-Based Detection
- **Unrealistic low prices**: Less than $10 per night
- **Unrealistic high prices**: More than $1000 per night
- **Negative prices**: Any negative value

### Rating-Price Mismatch Detection
- **High rating + Low price**: Rating > 4.5 AND price < $50
- **Low rating + High price**: Rating < 3.0 AND price > $200
- **Perfect rating + Low price**: Rating = 5.0 AND price < $100
- **Very low rating + High price**: Rating < 2.5 AND price > $150

## 🚀 How to Verify Detection is Working

### Step 1: Check Backend Connection
1. Open the test page: `test-spam-detection.html`
2. Look for "Backend connected successfully!" message
3. If you see "Backend not available", start the Java backend

### Step 2: Test Spam Cases
1. Click on any "Spam Hotel Examples" test case
2. You should see "🚫 SPAM DETECTED" result
3. Check the spam score and reasons provided

### Step 3: Test Legitimate Cases
1. Click on any "Legitimate Hotel Examples" test case
2. You should see "✅ LEGITIMATE HOTEL" result
3. Verify no spam flags are triggered

### Step 4: Test Manual Cases
1. Use the manual test form on the test page
2. Try entering suspicious hotel names with unrealistic ratings/prices
3. Verify the detection works for custom inputs

## 🔧 Troubleshooting

### If Spam Detection is Not Working

1. **Check Backend Status**:
   ```bash
   # Make sure Java backend is running
   cd travel-system/backend
   java TravelAPI
   ```

2. **Check Browser Console**:
   - Open browser developer tools (F12)
   - Look for any JavaScript errors
   - Check Network tab for API calls

3. **Verify API Endpoint**:
   - Backend should be running on `http://localhost:8080`
   - Test endpoint: `http://localhost:8080/api/hotels/check-spam`

### If Backend is Not Available

The system will automatically fall back to client-side spam detection with these rules:
- Keyword detection
- Rating validation (2.0 - 5.0)
- Price validation ($10 - $1000)
- Basic rating-price mismatch detection

## 📊 Expected Results

### Spam Detection Should Block:
- Hotels with spam keywords in name/location
- Hotels with invalid ratings (< 2.0 or > 5.0)
- Hotels with unrealistic pricing (< $10 or > $1000)
- Hotels with rating-price mismatches
- Hotels with perfect ratings (5.0)

### Spam Detection Should Allow:
- Hotels with realistic ratings (2.0 - 4.9)
- Hotels with reasonable pricing ($10 - $1000)
- Hotels with consistent rating-price relationships
- Hotels with clean names and locations
- Standard hotel chains and brands

## 🎯 Quick Test Commands

### Test Backend Connection:
```bash
curl -X POST http://localhost:8080/api/hotels/check-spam \
  -H "Content-Type: application/json" \
  -d '{"hotelName":"FREE WIN PRIZE HOTEL","location":"URGENT LIMITED TIME","rating":5.0,"price":25}'
```

### Expected Response for Spam:
```json
{
  "isSpam": true,
  "reason": "Hotel name contains spam keyword: free",
  "spamScore": 3,
  "rating": 5.0,
  "price": 25
}
```

### Expected Response for Legitimate:
```json
{
  "isSpam": false,
  "reason": "No issues found",
  "spamScore": 0,
  "rating": 4.2,
  "price": 150
}
```

## 🎉 Success Indicators

You'll know spam detection is working when:

1. ✅ **Spam hotels are blocked** with clear error messages
2. ✅ **Legitimate hotels are allowed** to proceed with booking
3. ✅ **Backend API responds** with proper spam analysis
4. ✅ **Client-side fallback works** when backend is unavailable
5. ✅ **Rating and pricing validation** catches suspicious patterns
6. ✅ **Transaction flow continues** only for legitimate bookings

The system is designed to be robust and will work even if the backend is not available, using client-side detection as a fallback.
