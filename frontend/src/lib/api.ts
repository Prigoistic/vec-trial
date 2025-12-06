import axios from "axios";
import type {
  Node,
  NodeCreate,
  NodeUpdate,
  Edge,
  EdgeCreate,
  Stats,
  SearchResult,
  VectorSearchResponse,
  GraphSearchResult,
  PaginatedResponse,
  NeighborsResponse,
} from "@/types";

// Get API base URL from environment variable or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =============================================================================
// Stats API
// =============================================================================
export const statsApi = {
  get: async (): Promise<Stats> => {
    const response = await api.get("/stats");
    return response.data;
  },
};

// =============================================================================
// Nodes API
// =============================================================================
export const nodesApi = {
  list: async (params?: {
    limit?: number;
    offset?: number;
    topic?: string;
  }): Promise<PaginatedResponse<Node>> => {
    const response = await api.get("/nodes", { params });
    return response.data;
  },

  get: async (id: string): Promise<Node> => {
    const response = await api.get(`/nodes/${id}`);
    return response.data;
  },

  create: async (data: NodeCreate): Promise<Node> => {
    const response = await api.post("/nodes", data);
    return response.data;
  },

  update: async (id: string, data: NodeUpdate): Promise<Node> => {
    const response = await api.put(`/nodes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/nodes/${id}`);
    return response.data;
  },

  neighbors: async (id: string, params?: {
    depth?: number;
    max_neighbors?: number;
  }): Promise<NeighborsResponse> => {
    const response = await api.get(`/nodes/${id}/neighbors`, { params });
    return response.data;
  },
};

// =============================================================================
// Edges API
// =============================================================================
export const edgesApi = {
  list: async (params?: {
    limit?: number;
    offset?: number;
    type?: string;
  }): Promise<PaginatedResponse<Edge>> => {
    const response = await api.get("/edges", { params });
    return response.data;
  },

  get: async (id: string): Promise<Edge> => {
    const response = await api.get(`/edges/${id}`);
    return response.data;
  },

  create: async (data: EdgeCreate): Promise<Edge> => {
    const response = await api.post("/edges", data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/edges/${id}`);
    return response.data;
  },
};

// =============================================================================
// Search API
// =============================================================================
export const searchApi = {
  // Vector search - semantic similarity using FAISS
  vector: async (params: {
    query_text: string;
    top_k?: number;
    topic_filter?: string;
    source_filter?: string;
  }): Promise<VectorSearchResponse> => {
    const response = await api.post("/search/vector", params);
    return response.data;
  },

  // Graph traversal search - relationship-based exploration
  graph: async (params: {
    start_id: string;
    depth?: number;
    max_nodes?: number;
  }): Promise<GraphSearchResult> => {
    const response = await api.post("/search/graph", params);
    return response.data;
  },

  // Graph-only search (no vectors) - keyword/topic-based graph traversal
  graphOnly: async (params: {
    query_text?: string;
    topic?: string;
    depth?: number;
    top_k?: number;
  }): Promise<any> => {
    const response = await api.post("/search/graph-only", params);
    return response.data;
  },

  // Hybrid search - combines vector similarity + graph structure
  hybrid: async (params: {
    query_text: string;
    top_k?: number;
    candidate_k?: number;
  }): Promise<{ results: SearchResult[] }> => {
    const response = await api.post("/search/hybrid", params);
    return response.data;
  },
};

// =============================================================================
// Ingestion API
// =============================================================================
export const ingestionApi = {
  // Ingest a single node/entity
  ingestNode: async (data: {
    text: string;
    metadata?: Record<string, any>;
  }): Promise<{
    message: string;
    node_id: string;
    node: Node;
  }> => {
    const response = await api.post("/ingest/node", data);
    return response.data;
  },

  // Ingest a document (will be chunked automatically)
  ingestDocument: async (data: {
    content: string;
    title?: string;
    topic?: string;
    source?: string;
  }): Promise<{
    message: string;
    title: string;
    chunks_created: number;
    edges_created: number;
    chunk_ids: string[];
  }> => {
    const response = await api.post("/ingest/document", data);
    return response.data;
  },

  // Bulk ingest multiple nodes
  bulkIngest: async (data: {
    nodes: NodeCreate[];
    auto_link?: boolean;
    similarity_threshold?: number;
  }): Promise<{
    message: string;
    nodes_created: number;
    edges_created: number;
    node_ids: string[];
  }> => {
    const response = await api.post("/ingest/bulk", data);
    return response.data;
  },
};

export default api;
