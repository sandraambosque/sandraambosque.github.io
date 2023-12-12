import os
import tika
from tika import parser
import spacy

nlp = spacy.load("es_core_news_sm")

def analizar_contrato_pdf(archivo_pdf, clausulas_jurisprudencia, clausulas_legislacion):
    try:
        parsed_pdf = parser.from_file(archivo_pdf)
        texto_contrato = parsed_pdf["content"]

        doc = nlp(texto_contrato)

        clausulas_jurisprudencia_detectadas = []
        clausulas_legislacion_detectadas = []
        palabras_sueltas = []

        for token in doc:

            if token.text.lower() in clausulas_jurisprudencia:
                clausulas_jurisprudencia_detectadas.append(token.text)
            elif token.text.lower() in clausulas_legislacion:
                clausulas_legislacion_detectadas.append(token.text)


            if token.is_alpha and len(token.text) > 2: 
                palabras_sueltas.append(token.text)


        if clausulas_jurisprudencia_detectadas:
            print("Cláusulas abusivas según jurisprudencia detectadas:")
            for clausula in clausulas_jurisprudencia_detectadas:
                print(clausula)

        if clausulas_legislacion_detectadas:
            print("Cláusulas abusivas según legislación detectadas:")
            for clausula in clausulas_legislacion_detectadas:
                print(clausula)

        if palabras_sueltas:
            print("Palabras sueltas detectadas (posibles cláusulas fraudulentas):")
            for palabra in palabras_sueltas:
                print(palabra)

        if not clausulas_jurisprudencia_detectadas and not clausulas_legislacion_detectadas and not palabras_sueltas:
            print("El contrato no contiene cláusulas abusivas ni palabras sueltas sospechosas.")

        print(f"Total de cláusulas abusivas según jurisprudencia detectadas: {len(clausulas_jurisprudencia_detectadas)}")
        print(f"Total de cláusulas abusivas según legislación detectadas: {len(clausulas_legislacion_detectadas)}")
        print(f"Total de palabras sueltas detectadas: {len(palabras_sueltas)}")

    except FileNotFoundError:
        print("El archivo PDF especificado no se encontró.")
    except Exception as e:
        print(f"Error al analizar el contrato: {str(e)}")

def obtener_clausulas_abusivas():
       clausulas_jurisprudencia = {
        "clausula_1": "Ejemplo de cláusula 1",
        "clausula_2": "Ejemplo de cláusula 2",
        "clausula_3": "Ejemplo de cláusula 3"
    }

    clausulas_legislacion = {
        "clausula_1": "Ejemplo de cláusula legal 1",
        "clausula_2": "Ejemplo de cláusula legal 2",
        "clausula_3": "Ejemplo de cláusula legal 3"
    }

def seleccionar_archivo_pdf():
    while True:
        archivo_pdf = input("Ingrese la ruta del archivo PDF del contrato: ")
        if os.path.isfile(archivo_pdf):
            return archivo_pdf
        else:
            print("El archivo PDF especificado no se encontró.")

if __name__ == "__main__":
    tika.initVM() 
    clausulas_jurisprudencia, clausulas_legislacion = obtener_clausulas_abusivas()
    archivo_contrato = seleccionar_archivo_pdf()
    analizar_contrato_pdf(archivo_contrato, clausulas_jurisprudencia, clausulas_legislacion)