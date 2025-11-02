# Vigia Aqui

#### `Dashboard e Auditoria de Alagamentos com IA`

## Contexto do Projeto

### Qual é o problema?

Os alagamentos persistem porque **falta auditar as ações tomadas pelas entidades públicas pós-alagamento**, impedindo resposta coordenada e eficácia das ações tomadas pelo governo.

### Como será resolvido?

Nossa solução integra a **prevenção de alagamentos e a mitigação de danos pós-alagamento**, usando dados do `CGE-SP`. O diferencial é que não apenas prevemos, mas **auditamos a eficácia das ações**.

Nossa IA gera:

- **Relatórios de prevenção** (para as Secretarias das Subprefeituras)
- **Relatórios de resposta** (para a Defesa Civil)

E o mais importante: ela mede se a prevenção falhou, gerando um **"Índice de Ineficácia"** para os gestores. Isso cria `responsabilização` e quebra o ciclo de alagamentos reincidentes, garantindo que a vistoria e a manutenção sejam, de fato, efetivas.

### Quem e como será impactado?

Em São Paulo, **mais de 400 pontos de alagamento são registrados todo ano**, afetando cerca de **50 mil pessoas diretamente** e causando prejuízos estimados em mais de **R$ 300 milhões anuais** entre infraestrutura danificada, trânsito parado e perdas econômicas locais.

Se nossa solução com IA **reduzir até 10% das reincidências**, ele evitará cerca de **R$ 30 milhões em prejuízos por ano**. E, ao tornar a **dashboard de eficácia pública**, `damos à população poder para fiscalizar e pressionar por melhorias, tornando a gestão de alagamentos mais transparente e eficiente`.

---

## Arquitetura da Solução

### Backend - Sistema de Análise com IA

**Tecnologias:** Python, OpenAI GPT-4, FAISS, RAG (Retrieval-Augmented Generation)

O backend é um sistema inteligente de análise de dados de alagamentos que utiliza:

- **RAG (Retrieval-Augmented Generation):** Sistema de busca vetorial que processa dados de alagamentos do GeoPortal de São Paulo (SIGRC)
- **FAISS Vector Search:** Banco de dados vetorial para busca semântica rápida em 248+ eventos de alagamento
- **GPT-4:** Modelo de linguagem para análise inteligente e geração de relatórios estruturados
- **Embeddings OpenAI:** Conversão de dados em vetores para busca contextual

**Funcionalidades principais:**

1. Carregamento e indexação de dados históricos de alagamentos (GeoJSON do SIGRC)
2. Busca vetorial semântica para identificar padrões e recorrências
3. Análise automatizada com GPT-4 gerando:
   - KPIs de efetividade por subprefeitura
   - Índice de Ineficácia (ranking de piores gestores)
   - Mapeamento de risco territorial
   - Recomendações estratégicas (curto, médio e longo prazo)
4. Detecção de falhas preventivas através de análise de reincidências

**Estrutura do Backend:**

```
backend/
├── src/
│   ├── main.py                    # Orquestrador do pipeline
│   ├── agents/
│   │   ├── alagamento_agent.py    # Agente de análise com GPT-4
│   │   ├── rag/
│   │   │   ├── rag.py             # Sistema RAG com FAISS
│   │   │   └── knowledge_source/  # Base de dados (GeoJSON SIGRC)
│   │   └── system_prompt/         # Instruções detalhadas para IA
│   ├── settings/                  # Configuração OpenAI
│   └── util/                      # Utilitários
└── requirements.txt
```

### Frontend - Dashboard Interativo

**Tecnologias:** React 19, Vite, Lucide Icons

Dashboard responsivo e em tempo real para visualização de métricas de alagamentos:

- **KPI Cards:** Indicadores de efetividade, tempo de resposta, índice IGE
- **Filtros Interativos:** Período (semana/mês/trimestre) e tipo de relatório
- **Mapa de Calor:** Visualização de zonas críticas por intensidade
- **Ranking de Risco:** Top 5 regiões com maior risco, tendências e scores
- **Alertas Críticos:** Banner destacando zonas de alto risco identificadas
- **Distribuição de Relatórios:** Análise visual entre prevenção e pós-alagamento

**Estrutura do Frontend:**

```
frontend/
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Componente raiz
│   ├── componente/
│   │   └── FloodDashboard.jsx     # Dashboard principal
│   └── style/
│       └── FloodDashboard.css     # Estilização dark theme
├── package.json
└── vite.config.js
```

**Design:** Dark theme com gradientes, efeitos de glow, animações suaves e design responsivo para todos os dispositivos.

---

## Pipeline de Dados e IA

```
1. Dados SIGRC (GeoJSON)
   └─> 248+ eventos de alagamento (coordenadas, data, subprefeitura)

2. Embedding & Indexação (OpenAI text-embedding-ada-002)
   └─> Conversão em vetores de 1536 dimensões
   └─> Armazenamento em FAISS (IndexFlatL2)

3. Busca Vetorial (RAG)
   └─> Recuperação dos K documentos mais relevantes

4. Análise com GPT-4
   ├─> Context: dados recuperados + timestamp
   ├─> System Prompt: instruções de análise (200+ linhas)
   └─> Output: Relatório estruturado em Markdown

5. Dashboard Frontend
   └─> Visualização de KPIs, rankings, mapas e alertas
```

---

## Instalação e Execução

### Backend

```bash
cd backend
```

```bash
python -m venv .venv
```

**Windows:**

```bash
.\.venv\Scripts\activate
```

**Linux/Mac:**

```bash
source .venv/bin/activate
```

```bash
pip install -r requirements.txt
```

**Configure as variáveis de ambiente:**

```bash
# Crie um arquivo .env em backend/src/.env
OPENAI_API_KEY="sk-proj-seu-token-aqui"
```

**Execute o agente de análise:**

```bash
python src/main.py
```

### Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## Métricas e Indicadores

- **Índice de Efetividade:** Percentual de ações preventivas bem-sucedidas
- **Tempo Médio de Resposta:** Horas entre alerta e resolução
- **IGE (Índice Global de Efetividade):** Score consolidado de performance
- **Taxa de Reincidência:** Percentual de alagamentos recorrentes no mesmo mês/local
- **Ranking de Ineficácia:** Top 3 subprefeituras com piores performances

---

## Fonte de Dados

**GeoPortal da Prefeitura de São Paulo - SIGRC**

- Dados oficiais de ocorrências de alagamento
- Formato: GeoJSON (FeatureCollection)
- Projeção: EPSG:31983 (UTM Zone 23S)
- Campos: ID, data da ocorrência, subprefeitura, tipo de ocorrência, coordenadas

---

## Impacto Esperado

- **Redução de 10% nas reincidências** de alagamentos
- **Economia de R$ 30 milhões/ano** em prejuízos evitados
- **Transparência pública** através de dashboard aberta à população
- **Accountability governamental** com índice de ineficácia por gestor
- **Fiscalização cidadã** habilitada por dados públicos e auditáveis

---

## Tecnologias Utilizadas

| Camada       | Tecnologias                                |
| ------------ | ------------------------------------------ |
| **Frontend** | React 19, Vite, Lucide Icons, CSS3         |
| **Backend**  | Python 3.x, OpenAI API (GPT-4, Embeddings) |
| **IA/ML**    | FAISS, RAG, text-embedding-ada-002         |
| **Dados**    | Pandas, NumPy, GeoJSON                     |
| **Config**   | python-dotenv, .env                        |

---

## Licença

MIT License

---

## Contribuidores

Desenvolvido para o Hackathon - Solução de Auditoria e Prevenção de Alagamentos em São Paulo