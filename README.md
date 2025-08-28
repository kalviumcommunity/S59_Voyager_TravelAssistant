# 🌍 VoyagerAI — GenAI-Powered Travel Planner

VoyagerAI is a **GenAI-powered web platform** designed to revolutionize travel planning.
By combining **large language models (LLMs)**, **retrieval-augmented generation (RAG)**, and **live APIs**,
it generates **personalized, day-by-day itineraries** for travelers based on natural language input.

---

## 🔍 Key Features

- 🧠 **AI-Generated Itineraries**: Automatically builds structured plans based on user goals.
- 📚 **RAG-Enhanced Suggestions**: Travel ideas grounded in curated sources and real-time data.
- ⛅ **Dynamic Context Awareness**: Weather forecasts and transit availability adjust plans automatically.
- 🗺️ **Visual Mapping**: See your trip laid out on an interactive map with optimal routing.
- 📤 **Flexible Export Options**: PDF, JSON, Google Calendar.
- 🔒 **Privacy-Oriented**: User profiles stored securely, minimal data sharing.

---

## 🏗️ Architecture Overview

VoyagerAI is built using the **MERN stack (MongoDB, Express, React, Node.js)** along with GenAI services:

```
+----------------+        +----------------+        +----------------+
|  Frontend UI   |  --->  |  Express/Node  |  --->  |   GenAI Layer  |
|  (React/Next)  |        |    Backend     |        | (LLM + RAG)    |
+----------------+        +----------------+        +----------------+
        |                         |                         |
        v                         v                         v
   Mapbox API               Weather API               Travel Docs DB
   Google Calendar          Transit API               Embedding Store
```

1. **Frontend**: React (Next.js optional) + Tailwind for responsive UI.
2. **Backend**: Node.js with Express, serving RESTful endpoints like `/api/plan` and `/api/export`.
3. **GenAI Layer**:
   - Prompt engineering for structured output
   - RAG with FAISS or Milvus for document retrieval
   - Function-calling for live API fetching
4. **Database**: MongoDB for user data; Vector DB for embeddings.
5. **External APIs**: Mapbox, OpenWeatherMap, Google Calendar integration.

---

## ⚙️ Implementation Plan

| Phase                  | Tasks                                                                         |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Phase 1**: Core MVP  | Build `/plan` endpoint to parse input, call GenAI, and return JSON itinerary. |
| **Phase 2**: RAG Layer | Implement ingestion pipeline for travel blogs/guides.                         |
| **Phase 3**: Frontend  | Build React UI for itinerary creation and editing.                            |
| **Phase 4**: Live APIs | Integrate weather/maps for real-time data.                                    |
| **Phase 5**: Scaling   | Add caching, API rate-limiting, database indexing.                            |

---

## 🧾 Example Request/Response

### Request

```json
{
  "location": "Kyoto, Japan",
  "startDate": "2025-09-10",
  "endDate": "2025-09-12",
  "preferences": ["temples", "food markets"],
  "pace": "leisure"
}
```

### Response

```json
{
  "trip": {
    "location": "Kyoto, Japan",
    "days": [
      {
        "date": "2025-09-10",
        "blocks": [
          {
            "time": "09:00-11:00",
            "activity": "Fushimi Inari Shrine",
            "notes": "Best morning photography spot"
          },
          {
            "time": "12:00-13:30",
            "activity": "Nishiki Market",
            "notes": "Taste matcha sweets and sushi."
          }
        ]
      }
    ]
  }
}
```

---

## 🧠 Correctness, Efficiency, Scalability

| Criteria        | VoyagerAI Implementation                                                          |
| --------------- | --------------------------------------------------------------------------------- |
| **Correctness** | Uses GenAI + RAG to ensure recommendations are grounded in verified data.         |
| **Efficiency**  | Asynchronous Express routes, caching (Redis), API batching for low latency.       |
| **Scalability** | Horizontal scaling with Node clusters, sharded MongoDB, FAISS/HNSW vector search. |

---

## 🔧 Tech Stack

| Layer          | Tools                                      |
| -------------- | ------------------------------------------ |
| **Frontend**   | React, Tailwind, Mapbox                    |
| **Backend**    | Node.js, Express                           |
| **GenAI**      | OpenAI/Gemini/Anthropic                    |
| **Vector DB**  | FAISS / Milvus                             |
| **Weather**    | OpenWeatherMap API                         |
| **Routing**    | Mapbox Directions API                      |
| **Database**   | MongoDB                                    |
| **Deployment** | Vercel (Frontend), Render/Fly.io (Backend) |

---

## 📂 File Structure

```
voyagerai/
├── frontend/               # React frontend
│   ├── src/components/
│   ├── src/pages/
│   └── styles/
├── backend/                # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── package.json
├── docs/                   # Prompt docs and design
├── infra/                  # Deployment configs
└── README.md
```

---

## 🚀 Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Disclaimer

VoyagerAI provides **AI-powered travel suggestions** and is not a replacement for official travel advisories.
Users should verify local rules, opening hours, and safety guidelines.

---

## 🤝 Contributing

We welcome contributions! You can:

- Add more cities or travel datasets
- Improve prompt templates
- Add multilingual support
- Build mobile app integration

---

## 🏁 License

MIT License © 2025
