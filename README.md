#  CruxInsight Frontend

A responsive React-based frontend for analyzing real-user performance data using the [Chrome UX Report (CrUX)](https://developer.chrome.com/docs/crux/). Connects to a Django backend to fetch and display insights.

---

## ✨ Features

- 🔎 Multi-URL input with real-time feedback
- 📊 Interactive UI for performance statistics
- 📈 Aggregated metrics & visual insights
- 🎨 Clean, modern design using Material UI

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node)

### 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cruxinsight-frontend.git
cd cruxinsight-frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Then update REACT_APP_API_URL in .env
REACT_APP_API_URL=http://localhost:8000

# 4. Run the development server
npm start
