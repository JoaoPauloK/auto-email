import io
import pdfplumber

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        content = ''
        for page in pdf.pages:
            content += page.extract_text() or ''
    return content

def extract_text_from_txt(txt_bytes: bytes) -> str:
    return txt_bytes.decode()
