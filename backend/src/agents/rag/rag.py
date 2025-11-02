from settings.openai_settings import client
from pandas import DataFrame
from datetime import datetime
import pandas as pd
import numpy as np
import os
import faiss

current_datetime = datetime.now().strftime("%Y-%m-%d")

INDEX_PATH = "./src/agents/rag/faiss/faiss_index.bin"
DOCS_PATH = "./src/agents/rag/faiss/faiss_docs.npy"
JSON_PATH = (
    "./src/agents/rag/knowledge_source/geoportal_risco_ocorrencia_alagamento_v2.json"
)


def chunk_dataframe(df: DataFrame, max_size_per_chunk=100):
    df = df.astype(str)
    return [
        df.iloc[i : i + max_size_per_chunk]
        for i in range(0, len(df), max_size_per_chunk)
    ]


def process_chunk(data: DataFrame):
    documents = [" ".join(row) for row in data.values]
    emb = client.embeddings.create(model="text-embedding-ada-002", input=documents).data
    return [e.embedding for e in emb], documents


def embed_files():
    base_path = "./src/agents/rag/knowledge_source/"
    file_names = ["geoportal_risco_ocorrencia_alagamento_v2.json"]

    embeddings_list = []
    documents_list = []

    for file in file_names:
        file_path = os.path.join(base_path, file)

        if file.endswith(".csv"):
            df = pd.read_csv(file_path)
            chunks = chunk_dataframe(df)
            for chunk in chunks:
                embeddings, documents = process_chunk(chunk)
                embeddings_list.extend(embeddings)
                documents_list.extend(documents)

        elif file.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            emb_data = client.embeddings.create(
                model="text-embedding-ada-002", input=[content]
            ).data
            embeddings_list.extend([emb.embedding for emb in emb_data])
            documents_list.append(content)

    return embeddings_list, documents_list


def load_or_create_index():
    if os.path.exists(INDEX_PATH) and os.path.exists(DOCS_PATH):
        index = faiss.read_index(INDEX_PATH)
        with open(DOCS_PATH, "rb") as f:
            documents = np.load(f, allow_pickle=True).tolist()
    else:
        embeddings, documents = embed_files()
        index = create_index(embeddings)
        faiss.write_index(index, INDEX_PATH)
        with open(DOCS_PATH, "wb") as f:
            np.save(f, documents)

    return index, documents


def create_index(embeddings):
    embeddings = np.array(embeddings).astype("float32")
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index


def search(index, documents, k=1):
    query_embedding = (
        np.array(
            client.embeddings.create(model="text-embedding-ada-002", input=[JSON_PATH])
            .data[0]
            .embedding
        )
        .reshape(1, -1)
        .astype("float32")
    )

    D, I = index.search(query_embedding, k)
    return [(documents[i], D[0][idx]) for idx, i in enumerate(I[0])]
