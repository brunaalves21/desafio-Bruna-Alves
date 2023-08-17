class CaixaDaLanchonete {

  constructor() {
    this.cardapio = new Map([
      ['cafe', { descricao: 'Café', valor: 3.00 }],
      ['chantily', { descricao: 'Chantily (extra do Café)', valor: 1.50 }],
      ['suco', { descricao: 'Suco Natural', valor: 6.20 }],
      ['sanduiche', { descricao: 'Sanduíche', valor: 6.50 }],
      ['queijo', { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 }],
      ['salgado', { descricao: 'Salgado', valor: 7.25 }],
      ['combo1', { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 }],
      ['combo2', { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }],
    ]);

    this.formasPagamento = new Set(['debito', 'credito', 'dinheiro']);
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasPagamento.has(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    let total = 0;
    const itemQuantidades = new Map();

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');

      if (!this.cardapio.has(codigo)) {
        return 'Item inválido!';
      }

      if (quantidade < 1) {
        return 'Quantidade inválida!';
      }

      if (!itemQuantidades.has(codigo)) {
        itemQuantidades.set(codigo, 0);
      }

      itemQuantidades.set(codigo, itemQuantidades.get(codigo) + parseInt(quantidade));
    }

    for (const [codigo, quantidade] of itemQuantidades) {
      const item = this.cardapio.get(codigo);

      if (codigo === 'chantily' || codigo === 'queijo') {
        const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';

        if (!itemQuantidades.has(itemPrincipal) || itemQuantidades.get(itemPrincipal) < quantidade) {
          return 'Item extra não pode ser pedido sem o principal';
        }
      }

      total += item.valor * quantidade;
    }

    if (total === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 0.95; 
    } else if (formaDePagamento === 'credito') {
      total *= 1.03; 
    }

    return `R$ ${total.toFixed(2)}`;
  }
}

export default CaixaDaLanchonete;
