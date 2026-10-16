// src/services/GestorDados.ts
import { db } from './DatabaseInstance';
import { Produto } from '../components/Produto';

const sqlCreate =
  'CREATE TABLE IF NOT EXISTS PRODUTO(' +
  'CODIGO INTEGER PRIMARY KEY, ' +
  'NOME VARCHAR(20), QUANTIDADE INTEGER)';

const sqlInsert =
  'INSERT INTO PRODUTO (CODIGO, NOME, QUANTIDADE) VALUES (?,?,?)';

const sqlDelete = 'DELETE FROM PRODUTO WHERE CODIGO=?';
const sqlSelect = 'SELECT * FROM PRODUTO';

class GestorDados {
  constructor() {
    // Cria a tabela assim que o Gestor é instanciado
    db.execSync(sqlCreate);
  }

  public async remover(chave: number): Promise<void> {
    db.runSync(sqlDelete, [chave]);
  }

  public async adicionar(produto: Produto): Promise<void> {
    db.runSync(sqlInsert, [
      produto.codigo,
      produto.nome,
      produto.quantidade,
    ]);
  }

  public async obterTodos(): Promise<Produto[]> {
    const rows = db.getAllSync(sqlSelect) as Array<{
      CODIGO: number;
      NOME: string;
      QUANTIDADE: number;
    }>;

    return rows.map(
      (linha) => new Produto(linha.CODIGO, linha.NOME, linha.QUANTIDADE)
    );
  }
}

export default GestorDados;