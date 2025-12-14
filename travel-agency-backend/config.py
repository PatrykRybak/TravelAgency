# backend/config.py
from datetime import timedelta

class Config:
    # Baza danych
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://pinguino_user:pinguino123@145.239.81.215/pinguino_travel'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = 'super-tajny-klucz-pinguino-zmien-mnie'
    
    # --- KONFIGURACJA CIASTECZEK (NAPRAWIONA) ---
    JWT_TOKEN_LOCATION = ["cookies"]
    
    # Na localhost MUSI być False. Na produkcji (https) zmień na True.
    JWT_COOKIE_SECURE = False 
    
    # Ważne: Wyłączamy CSRF na start, żeby nie blokowało requestów z innej domeny/portu
    JWT_COOKIE_CSRF_PROTECT = False
    
    # KLUCZOWE DLA LOCALHOST: 'Lax' pozwala na przesyłanie ciastek w ramach tej samej domeny (localhost)
    JWT_COOKIE_SAMESITE = 'Lax'
    
    # Czas życia tokena
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)