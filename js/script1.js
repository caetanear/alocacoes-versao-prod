class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let nome = this.lerDados().nomeProduto;
        let curso = this.lerDados().curso;
        let sala = this.lerDados().sala;
        let data = this.lerDados().data;

        const alocacao = { nome, curso, sala, data };

        if(this.validaCampos(alocacao)){
            if(this.editId == null){
                this.adicionar(alocacao);
            } else{
                this.atualizar(this.editId, alocacao);
            }
        }

        //Método para enviar alocacao para backend via FETCH. LEMBRETE: ALTERAR URL PARA URL DO ENDPOINT
        fetch('https://localhost:5000/api/endpoin/criar', {
            method: "POST", // verificar metodo no backend
            body: JSON.stringify(alocacao),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
        //FIM DO MÉTODO
        //console.log(alocacao);
        
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
            td_curso.innerText = this.arrayProdutos[i].curso;
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

      /*this.arrayProdutos.push(curso);
        

        this.arrayProdutos.push(sala);
        

        this.arrayProdutos.push(data);*/
        
    }

    atualizar(id, alocacao){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = alocacao.nomeProduto;
                this.arrayProdutos[i].curso = alocacao.curso;
                this.arrayProdutos[i].sala = alocacao.sala;
                this.arrayProdutos[i].data = alocacao.data;
            }
        }
         //Método para excluir alocacao para backend via FETCH. LEMBRETE: ALTERAR URL PARA URL DO ENDPOINT
         fetch('https://localhost:5000/api/endpoint/alterar', {
            method: "PUT", // verificar metodo no backend
            body: JSON.stringify(alocacao),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    //FIM DO MÉTODO

    }

    preparaEdicao(dados){
        this.editId = dados.id;

        document.getElementById('nome').value = dados.nomeProduto;
        document.getElementById('curso').value = dados.curso;
        document.getElementById('sala').value = dados.sala;
        document.getElementById('data').value = dados.data;

        document.getElementById('btn-salvar').innerText = 'Atualizar';
    }

    lerDados(){
        let nome = {}
            nome.id = this.id;
            nome.nomeProduto = document.getElementById('nome').value;
            nome.curso = document.getElementById('curso').value;
            nome.sala = document.getElementById('sala').value;
            nome.data = document.getElementById('data').value;
            return nome;
        }

    validaCampos(alocacao){
        let mensagem = '';
        if(alocacao.nome == ''){
            mensagem += 'Informe o campo nome \n';
        }

        if(alocacao.curso == ''){
            mensagem += 'Informe o campo curso \n';
        }

        if(mensagem != ''){
            window.alert(mensagem);
            return false;
        }

        
        return true;
    }

    cancelar(){
        document.getElementById('nome').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('sala').value = '';
        document.getElementById('data').value = '';

        document.getElementById('btn-salvar').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Deseja deletar o campo ' + id + '?')){
            //Método para excluir alocacao para backend via FETCH. LEMBRETE: ALTERAR URL PARA URL DO ENDPOINT
            fetch('https://localhost:5000/api/endpoint/excluir', + id, {
                    method: "DELETE", // verificar metodo no backend
                    body: JSON.stringify(alocacao),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
            //FIM DO MÉTODO

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