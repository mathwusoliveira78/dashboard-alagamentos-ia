from agents.alagamento_agent import alagamento_agent
from agents.rag.rag import load_or_create_index, search


def main():
    print(alagamento_agent())
    return alagamento_agent()   


if __name__ == "__main__":
    index, documents = load_or_create_index()
    results = search(index, documents, k=3)
    near_doc = results[0][0]
    answer = alagamento_agent(near_doc=near_doc)

    print("\n--- Resposta ---")
    print(answer)