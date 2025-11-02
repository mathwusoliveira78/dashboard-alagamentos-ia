from agents.system_prompt.system_prompt_alagamento_agent import (
    SYSTEM_PROMPT_ALAGAMENTO_AGENT,
)
from util.current_datetime import current_datetime
from settings.openai_settings import client


def alagamento_agent(near_doc):
    message = client.responses.create(
        model="gpt-4",
        input=[
            {"role": "developer", "content": f"Data e tempo atual: {current_datetime}"},
            {"role": "developer", "content": SYSTEM_PROMPT_ALAGAMENTO_AGENT},
            {
                "role": "developer", 
                "content": f"DADOS REAIS PARA ANÁLISE:\n\n{near_doc}"
            },
            {
                "role": "user", 
                "content": (
                    "Analise os dados JSON fornecidos e gere o relatório completo AGORA. "
                    "Use APENAS as informações reais do dataset. "
                    "Não invente exemplos nem diga que não consegue processar."
                )
            },
        ],
    )

    return message.output_text