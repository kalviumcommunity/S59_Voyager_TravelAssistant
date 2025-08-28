export const ONE_SHOT_EXAMPLE = `
Example Itinerary:
{
  "location": "Tokyo",
  "days": [
    {
      "day": 1,
      "activities": [
        { "time": "09:00", "activity": "Visit Senso-ji Temple" },
        { "time": "12:00", "activity": "Lunch at Tsukiji Outer Market" },
        { "time": "15:00", "activity": "Explore Akihabara's tech stores" }
      ]
    }
  ]
}
This is just an example; structure responses similarly.
`;

export const MULTI_SHOT_EXAMPLES = `
Example 1:
{
  "location": "Tokyo",
  "days": [
    {
      "day": 1,
      "activities": [
        { "time": "09:00", "activity": "Visit Senso-ji Temple" },
        { "time": "12:00", "activity": "Lunch at Tsukiji Outer Market" },
        { "time": "15:00", "activity": "Explore Akihabara's tech stores" }
      ]
    },
    {
      "day": 2,
      "activities": [
        { "time": "08:00", "activity": "Breakfast at Shibuya" },
        { "time": "10:00", "activity": "Tour Meiji Shrine" },
        { "time": "14:00", "activity": "Shopping in Harajuku" }
      ]
    }
  ]
}

Example 2:
{
  "location": "New York City",
  "days": [
    {
      "day": 1,
      "activities": [
        { "time": "09:00", "activity": "Walk through Central Park" },
        { "time": "12:00", "activity": "Lunch at Katz's Delicatessen" },
        { "time": "15:00", "activity": "Visit MoMA" }
      ]
    }
  ]
}

Example 3:
{
  "location": "London",
  "days": [
    {
      "day": 1,
      "activities": [
        { "time": "09:30", "activity": "Buckingham Palace visit" },
        { "time": "11:00", "activity": "Tour Westminster Abbey" },
        { "time": "13:00", "activity": "Lunch near Covent Garden" },
        { "time": "15:00", "activity": "Explore British Museum" }
      ]
    }
  ]
}

Format responses to closely follow these styles.
`;
