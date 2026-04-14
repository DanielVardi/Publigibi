import ftplib
import os
from pathlib import Path
from dotenv import dotenv_values

# Carrega as configuracoes do arquivo .env
config = dotenv_values(Path(__file__).parent / ".env")

FTP_HOST     = config["FTP_HOST"]
FTP_USER     = config["FTP_USER"]
FTP_PASS     = config["FTP_PASS"]
REMOTE_PATH  = config["FTP_REMOTE_PATH"]
LOCAL_PATH   = Path(config["LOCAL_PATH"])

EXTENSOES_IGNORADAS = {".db", ".DS_Store", ".ini"}
PASTAS_IGNORADAS    = {"__pycache__", ".git"}


def upload_arquivo(ftp, caminho_local, caminho_remoto):
    with open(caminho_local, "rb") as f:
        ftp.storbinary(f"STOR {caminho_remoto}", f)
    print(f"  [OK] {caminho_remoto}")


def garantir_pasta_remota(ftp, caminho):
    partes = caminho.strip("/").split("/")
    atual = ""
    for parte in partes:
        atual = f"{atual}/{parte}" if atual else parte
        try:
            ftp.mkd(atual)
        except ftplib.error_perm:
            pass  # pasta ja existe


def publicar():
    print(f"\nConectando em {FTP_HOST}...")
    with ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS) as ftp:
        ftp.encoding = "utf-8"
        print("Conectado!\n")
        print(f"Publicando arquivos de:\n  {LOCAL_PATH}\n")

        for raiz, pastas, arquivos in os.walk(LOCAL_PATH):
            # Ignora pastas indesejadas
            pastas[:] = [p for p in pastas if p not in PASTAS_IGNORADAS]

            caminho_relativo = Path(raiz).relative_to(LOCAL_PATH)
            pasta_remota = REMOTE_PATH
            if str(caminho_relativo) != ".":
                pasta_remota = f"{REMOTE_PATH}/{caminho_relativo.as_posix()}"
                garantir_pasta_remota(ftp, pasta_remota)

            for arquivo in arquivos:
                if Path(arquivo).suffix in EXTENSOES_IGNORADAS:
                    continue
                caminho_local  = Path(raiz) / arquivo
                caminho_remoto = f"{pasta_remota}/{arquivo}"
                upload_arquivo(ftp, caminho_local, caminho_remoto)

        print("\nPublicacao concluida com sucesso!")


if __name__ == "__main__":
    # Verifica se a senha foi configurada
    if FTP_PASS == "coloque_sua_senha_aqui":
        print("ERRO: Abra o arquivo .env e substitua 'coloque_sua_senha_aqui' pela sua senha FTP.")
    else:
        publicar()
