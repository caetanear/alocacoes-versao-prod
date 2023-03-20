class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let nome = this.lerDados();
        let preco = this.lerDados();
        let sala = this.lerDados();
        let data = this.lerDados(); 

        if(this.validaCampos(nome, preco, sala, data)){
            if(this.editId == null){
                this.adicionar(nome, preco, sala, data);
            } else{
                this.atualizar(this.editId, nome, preco, sala, data);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_curso = tr.insertCell();
            let td_sala = tr.insertCell();
            let td_data = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_curso.innerText = this.arrayProdutos[i].preco;
            td_sala.innerText = this.arrayProdutos[i].sala;
            td_data.innerText = this.arrayProdutos[i].data;
            
            td_id.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick", "nome.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';
            imgDelete.setAttribute("onclick", "nome.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            console.log(this.arrayProdutos);
        }
    }

    adicionar(nome){
        this.arrayProdutos.push(nome);
        this.id++;

      /*this.arrayProdutos.push(preco);
        

        this.arrayProdutos.push(sala);
        

        this.arrayProdutos.push(data);*/
        
    }

    atualizar(id, nome){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = nome.nomeProduto;
                this.arrayProdutos[i].preco = nome.preco;
                this.arrayProdutos[i].sala = nome.sala;
                this.arrayProdutos[i].data = nome.data;
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id;

        document.getElementById('nome').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;
        document.getElementById('sala').value = dados.sala;
        document.getElementById('data').value = dados.data;

        document.getElementById('btn-salvar').innerText = 'Atualizar';
    }

    lerDados(){
        let nome = {}
            nome.id = this.id;
            nome.nomeProduto = document.getElementById('nome').value;
            nome.preco = document.getElementById('preco').value;
            nome.sala = document.getElementById('sala').value;
            nome.data = document.getElementById('data').value;
            return nome;
        }

    validaCampos(nome){
        let mensagem = '';
        if(nome.nomeProduto == ''){
            mensagem += 'Informe o campo nome \n';
        }
        if(nome.preco == ''){
            mensagem += 'Informe o campo preco \n';
        }
        if(mensagem != ''){
            return false;
        }
        return true;
    }

    cancelar(){
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('sala').value = '';
        document.getElementById('data').value = '';

        document.getElementById('btn-salvar').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){

        if(confirm('Deseja deletar o campo ' + id + '?')){

        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
    }
}

var nome = new Produto();