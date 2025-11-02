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
            {"role": "developer", "content": near_doc},
            {"role": "user", "content": "Gere um relatório com base na sua base de conhecimento."},
        ],
    )

    return message.output_text
