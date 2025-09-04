import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

from ..utils.utils import EmailInput

load_dotenv()

HF_TOKEN = os.getenv( 'HUGGINGFACE_TOKEN')
API_URL_TEXT_GENERATOR = "http://joaopaulok-email_answer.hf.space/run/predict"
print(HF_TOKEN)
client = InferenceClient(provider='cerebras', api_key=HF_TOKEN)

headers = {"Authorization": f"Bearer {HF_TOKEN}"}


def classify_email(text: str | bytes):
    res = client.chat.completions.create(
        model='openai/gpt-oss-120b',
        messages=[
            {
                'role': 'user',
                'content': f"O seguinte email foi recebido \n\n{text}\n\nAnalise o conteúdo do email e julgue se há necessidade de resposta, ou se não é mero spam, mensagens de boas vindas ou qualuer outra mensagem que não necessita de resposta. Caso a mensagem precise se resposta, avalie como Produtiva, caso contrário, avalie como Improdutiva. O texto da resposta deve ser apenas 'Produtiva' ou 'Improdutiva', nada mais.",
            }
        ]
    )
    return res.choices[0].message.content


def get_answer(email_input: str):
    res = client.chat.completions.create(
        model='openai/gpt-oss-120b',
        messages=[
            {
                'role': 'user',
                'content': f"O seguinte email foi recebido \n\n{email_input}\n\nEscreva uma resposta educada e curta.",
            }
        ]
    )
    answer = res.choices[0].message
    return answer


def infer_type(email_input: str) -> str | None:
    classification = classify_email(email_input)
    print(classification)
    return classification
