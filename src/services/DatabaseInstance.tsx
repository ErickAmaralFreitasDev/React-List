// src/services/DatabaseInstance.ts
import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados
export const db = SQLite.openDatabaseSync('LojaDatabase.db');

// Opcional: inicializa a tabela na primeira execução
db.execSync(`
  CREATE TABLE IF NOT EXISTS produtos (
    codigo INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL
  );
`);