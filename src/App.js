import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './Assets/CadastroProdutos.jpg';



function App() {

  const baseUrl="https://localhost:44365/api/Produtos";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const[produtoSelecionado, setProdutoSelecionado] = useState({
    id:'',
    nome:'',
    preco:'',
    codigoBarras:'',
    imagem:'',
    categoria:''
  })
  const selecionarProduto = (produto, opcao)=>{
    setProdutoSelecionado(produto);
    (opcao==="Editar")&&
    abrirFecharModalEditar()
  }

  const abrirFecharModalIncluir =()=>{
    setModalIncluir(!modalIncluir);
  }
  const abrirFecharModalEditar =()=>{
    setModalEditar(!modalEditar);
  }

  const handleChange = e=>{
     const {name,value} = e.target;
     setProdutoSelecionado({
       ...setProdutoSelecionado,[name]:value
     });
     console.log(produtoSelecionado);
  }
   
  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response =>{
      setData(response.data)
    }).catch(error =>{
      console.log(error); 
    })
  }

  const pedidoPost = async()=>{
    delete produtoSelecionado.id;
    produtoSelecionado.preco=parseInt(produtoSelecionado.preco)
    await axios.post(baseUrl, produtoSelecionado)
    .then(response =>{
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    }).catch(error =>{
      console.log(error); 
    })
  }
  const pedidoPut = async()=>{
    produtoSelecionado.preco=parseInt(produtoSelecionado.preco);
    await axios.put(baseUrl+"/"+produtoSelecionado.id, produtoSelecionado)
    .then(response=>{
      var resposta=response.data;
      var dadosAuxiliar=data;
      dadosAuxiliar.map(produto=>{
        if(produto.id ===produtoSelecionado.id){
          produto.nome = resposta.nome;
          produto.preco = resposta.preco;
          produto.codigoBarras = resposta.codigoBarras;
          produto.imagem = resposta.imagem;
          produto.categoria = resposta.categoria;
        }
      });
      abrirFecharModalEditar();
    }).catch(error=>{
    console.log(error);
    } 
    )}

  useEffect(()=>{
    pedidoGet();
  })
  
  return (
    <div className="produto-container">
      <br></br>
      <h3>Cadastro de Produtos </h3>
      <header className="App-header">
      <button className="btn btn-sucess" onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Produto</button>
      <img src={logoCadastro} alt ='Cadastro'/>
        
      </header>
      
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Codigo De Barras</th>
          <th>Imagem</th>
          <th>Categoria</th>
          <th>Operação</th>
          </tr> 
      </thead>
      <tbody>
        {data.map(produto=>(
          <tr key ={produto.id}>
          <td>{produto.id}</td>
          <td>{produto.nome}</td>
          <td>{produto.preco}</td>
          <td>{produto.codigoBarras}</td>
          <td>{produto.imagem}</td>
          <td>{produto.categoria}</td>
          <td>
          <button className="btn btn-primary" onClick= {()=>selecionarProduto(produto,"Editar")}>Editar</button>
          <button className="btn btn-danger" onClick= {()=>selecionarProduto(produto,"Excluir")}>Excluir</button>
          </td>
          </tr>

        ))}
      </tbody>
      </table>
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir produtos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome:</label>
            <br/>
            <input type="text" className="form-control" name="nome" onChange={handleChange}/>
            <label>Preço:</label>
            <br/>
            <input type="text" className="form-control" name="preco" onChange={handleChange}/>
            <label>Codigo de barras:</label>
            <br/>
            <input type="text" className="form-control" name="codigoBarras" onChange={handleChange}/>
            <label>Imagem:</label>
            <br/>
            <input type="text" className="form-control" name="imagem" onChange={handleChange}/>
            <label>Categorias:</label>
            <br/>
            <input type="text" className="form-control" name="categoria" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button>
          <button className="btn btn-danger"onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
        </Modal>

        <Modal isOpen = {modalEditar}>
        <ModalHeader>Alterar produto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <br>readOnly value={produtoSelecionado && produtoSelecionado.id} </br>
            <label>Nome:</label>
            <br/>
            <input type="text" className="form-control" name="nome" onChange={handleChange}/>
                  value = {produtoSelecionado &&produtoSelecionado.nome}
                  <br/>
            <label>Preço:</label>
            <br/>
            <input type="text" className="form-control" name="preco" onChange={handleChange}/>
                   value = {produtoSelecionado &&produtoSelecionado.preco}
                  <br/>
            <label>Codigo de barras:</label>
            <br/>
            <input type="text" className="form-control" name="codigoBarras" onChange={handleChange}/>
                   value = {produtoSelecionado &&produtoSelecionado.codigoBarras}
                  <br/> 
            <label>Imagem:</label>
            <br/>
            <input type="text" className="form-control" name="imagem" onChange={handleChange}/>
                  value = {produtoSelecionado &&produtoSelecionado.imagem}
                  <br/> 
            <label>Categorias:</label>
            <br/>
            <input type="text" className="form-control" name="categoria" onChange={handleChange}/>
                  value = {produtoSelecionado &&produtoSelecionado.categoria}
                  <br/> 
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"onClick={()=>pedidoPut()}>Editar</button>
          <button className="btn btn-danger" onClick= {()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
        </Modal>
    </div>
  );
}

export default App;
