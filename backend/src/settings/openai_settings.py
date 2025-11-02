from openai import OpenAI
from environment.openai_environment import api_key

client = OpenAI(api_key=api_key)