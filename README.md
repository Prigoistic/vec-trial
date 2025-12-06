# VectorGraph DB: Hybrid Vector and Graph Search Engine

## 🌟 Overview
VectorGraph DB is a modern hybrid search engine that combines vector similarity search with graph-based traversal for context-aware information retrieval. By merging semantic understanding from vector embeddings with relational insights from a graph database, it delivers search results that are both semantically relevant and structurally connected.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI REST API                              │
│    /nodes  /edges  /search/vector  /search/graph  /search/hybrid │
└────────────────────────────┬────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   FAISS Index    │ │   Neo4j Graph    │ │ JSON Snapshot    │
│   (Vectors)      │ │   (Structure)    │ │  (Persistence)   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Components

- **Frontend**: React 18 + TypeScript SPA with modern gradient UI, built with Vite
- **Backend**: FastAPI REST API orchestrating vector store, graph database, and embedding services
- **Data Layer**:
  - **FAISS**: High-dimensional vector embeddings for semantic similarity search
  - **Neo4j**: Entity and relationship storage for graph traversal
  - **Snapshot Manager**: JSON-based persistence and recovery

## ✨ Features

### 🔍 Search Capabilities
- **Vector Search**: Semantic similarity search using dense 384-dimensional embeddings
- **Graph Search**: Multi-hop relationship traversal with configurable depth
- **Hybrid Search**: Adaptive weighting combining vector and graph results for optimal relevance

### 📥 Data Ingestion
- **Automated Embedding**: Sentence Transformers (all-MiniLM-L6-v2) for text vectorization
- **Relationship Extraction**: Automatic edge creation based on content similarity
- **Bulk Processing**: Efficient batch ingestion from datasets (arXiv, PubMed) or JSON files

### 📊 System Monitoring
- **Real-time Dashboard**: Live metrics for nodes, edges, and vector index status
- **Health Checks**: Continuous monitoring of database connections and service availability
- **Analytics**: Visual charts for data distribution and system performance
## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance REST API framework |
| **Neo4j** | Graph database for relationships |
| **FAISS** | Vector similarity search (CPU-optimized) |
| **Sentence Transformers** | Text embedding (all-MiniLM-L6-v2) |
| **Pydantic** | Data validation and settings |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Modern UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tooling |
| **TanStack Query** | Data fetching and caching |
| **shadcn/ui** | Accessible component library |
| **Tailwind CSS** | Modern gradient design system |
| **Recharts** | Data visualization |
## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **Neo4j** (Docker, Homebrew, or Neo4j Desktop)

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd vec

# Backend setup (automated)
cd backend
./setup.sh

# Install Neo4j (choose one):
# Docker:
docker run -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/password neo4j:latest
# Or Homebrew:
brew install neo4j && brew services start neo4j

# Configure backend
cp .env.example .env
# Edit .env and set NEO4J_PASSWORD

# Start backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# In a new terminal - Frontend setup
cd ../frontend
npm install
### Option 2: Manual Setup

#### Backend
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings:
# NEO4J_URI=bolt://localhost:7687
# NEO4J_USER=neo4j
# NEO4J_PASSWORD=your_password
# EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend

| `POST` | `/ingest/document` | Ingest document (auto-chunked) |
| `POST` | `/ingest/bulk` | Batch ingest multiple documents |
| `GET` | `/nodes` | List nodes (paginated, filterable) |
| `POST` | `/nodes` | Create new node |
| `GET` | `/nodes/{id}` | Get node by ID |
| `PUT` | `/nodes/{id}` | Update node |
| `DELETE` | `/nodes/{id}` | Delete node |
| `GET` | `/nodes/{id}/neighbors` | Get node neighbors |
| `GET` | `/edges` | List edges (paginated, filterable) |
| `POST` | `/edges` | Create new edge |
| `GET` | `/edges/{id}` | Get edge by ID |
| `DELETE` | `/edges/{id}` | Delete edge |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/stats` | System statistics and metrics |

## 📥 Data Ingestion Examples

### From Verified Datasets
```bash
# Activate backend environment
cd backend
source venv/bin/activate

# Ingest 10K arXiv papers (AI/ML)
python -m scripts.ingest_bulk -l 10000 -t arxiv

# Ingest 10K PubMed articles (Medical)
python -m scripts.ingest_bulk -l 10000 -t pubmed

# Generate synthetic topic data
python -m scripts.generate_topics_data --per-topic 100 --output data/topics.json

# Ingest from generated JSON
python -m scripts.ingest_bulk --source json --file data/topics.json -l 5000
```

### Via API
```bash
# Single node
curl -X POST http://localhost:8000/ingest/node \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Machine learning is transforming healthcare",
    "metadata": {"title": "ML in Healthcare", "topic": "AI"}
  }'

# Hybrid search
curl -X POST http://localhost:8000/search/hybrid \
  -H "Content-Type: application/json" \
  -d '{
    "query_text": "artificial intelligence in medicine",
    "top_k": 10
  }'
```
│   ├── tailwind.config.ts       # Tailwind configuration
│   ├── package.json             # Node dependencies
│   └── .env.example             # Environment template
│
└── README.md                    # This file
```
### Access the Application
- **Frontend**: http://localhost:8080
- **API Docs**: http://localhost:8000/docs
- **API**: http://localhost:8000
- **Neo4j Browser**: http://localhost:7474onment
python3 -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
## 📡 API Reference

### Search Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/search/vector` | Semantic search using vector embeddings |
| `POST` | `/search/graph` | Multi-hop graph traversal |
| `POST` | `/search/graph-only` | Keyword/topic-based graph search (no vectors) |
| `POST` | `/search/hybrid` | Adaptive hybrid search combining vector + graph |

### Data Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ingest/node` | Ingest single document |
| `POST` | `/ingest/document` | Ingest document (auto-chunked) |
| `POST` | `/ingest/bulk` | Batch ingest multiple documents |
| `GET` | `/nodes` | List nodes (paginated, filterable) |
## 📁 Project Structure

```
vec/
├── backend/
│   ├── app/
│   │   ├── api/                 # REST API endpoints
│   │   │   ├── nodes.py         # Node CRUD operations
│   │   │   ├── edges.py         # Edge CRUD operations
│   │   │   ├── search.py        # Search endpoints
│   │   │   └── ingest.py        # Data ingestion
│   │   ├── models/              # Pydantic schemas
│   │   │   ├── graph.py         # Graph data models
│   │   │   └── search.py        # Search models
│   │   ├── services/            # Core business logic
│   │   │   ├── embeddings.py   # Sentence transformer service
│   │   │   ├── vector_store.py # FAISS index management
│   │   │   ├── graph_store.py  # Neo4j operations
│   │   │   ├── hybrid_engine.py # Hybrid search logic
│   │   │   └── snapshot.py     # JSON persistence
│   │   ├── config.py            # Configuration management
│   │   └── main.py              # FastAPI application
│   ├── scripts/
│   │   ├── ingest_bulk.py       # Bulk data ingestion
│   │   ├── generate_topics_data.py # Synthetic data generation
│   │   └── clear_database.py    # Database cleanup
│   ├── data/
│   │   └── snapshot.json        # Persistent data store (gitignored)
│   ├── requirements.txt         # Python dependencies
│   ├── setup.sh                 # Automated setup script
│   └── .env.example             # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── AppSidebar.tsx   # Navigation sidebar
│   │   │   ├── NavLink.tsx      # Routing component
│   │   │   └── StatCard.tsx     # Metric display card
│   │   ├── pages/               # Application views
│   │   │   ├── Overview.tsx     # Dashboard
│   │   │   ├── Nodes.tsx        # Node management
│   │   │   ├── Edges.tsx        # Edge management
│   │   │   ├── Search.tsx       # Search interface
│   │   │   ├── Ingestion.tsx    # Data ingestion UI
│   │   │   └── Stats.tsx        # Analytics
│   │   ├── lib/
│   │   │   ├── api.ts           # API client
│   │   │   └── utils.ts         # Utility functions
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript definitions
│   │   ├── App.tsx              # Main application
## 📚 Additional Documentation

- API Documentation: http://localhost:8000/docs (when running)
- OpenAPI Spec: http://localhost:8000/openapi.json

## 📄 License

MIT License - See LICENSE file for detailspic 100 --output data/topics.json

# Ingest from generated JSON
python -m scripts.ingest_bulk --source json --file data/topics.json -l 5000
```

### Via API
```bash
# Single node
curl -X POST http://localhost:8000/ingest/node \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Machine learning is transforming healthcare",
    "metadata": {"title": "ML in Healthcare", "topic": "AI"}
  }'

# Hybrid search
curl -X POST http://localhost:8000/search/hybrid \
  -H "Content-Type: application/json" \
  -d '{
    "query_text": "artificial intelligence in medicine",
    "top_k": 10
  }'
```
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# VITE_API_URL=http://localhost:8000

# Start development server
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:8080
- **API Docs**: http://localhost:8000/docs
- **API**: http://localhost:8000
- **Neo4j Browser**: http://localhost:7474bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Reference

### Search Operations
- `POST /search/vector`: Performs semantic search using vector embeddings.
- `POST /search/graph`: Executes graph traversal queries.
- `POST /search/hybrid`: Combines vector and graph search results with adaptive weighting.

### Data Management
- `POST /ingest/node`: Ingests a single document.
- `POST /ingest/bulk`: Ingests multiple documents in a batch.
- `GET /nodes`: Retrieves a paginated list of nodes.
- `GET /edges`: Retrieves a paginated list of relationships.

### System
- `GET /stats`: Returns system statistics and metrics.
- `GET /health`: Checks system health status.

## Project Structure
```
DevForge/
├── backend/
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── models/         # Data models and schemas
│   │   ├── services/       # Core business logic
│   │   └── main.py         # Application entry point
│   └── data/               # Data storage
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Application views
│   │   ├── lib/            # Utilities and API clients
│   │   └── types/          # TypeScript definitions
│   └── vite.config.ts      # Build configuration
└── README.md
```

## License
This project is licensed under the MIT License.
