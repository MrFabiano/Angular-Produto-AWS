
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from './service/produto.service';
import { Produto } from './model/produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  produtos: Produto[] = [];
  
  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService){

      this.buscarProdutos();
    }

   produtoForm = this.fb.group({
    id:[],
    nome: [null, Validators.required],
    valor: [null, Validators.required],
    descricao: []
   })

   buscarProdutos(){
    this.produtoService.buscarTodos().subscribe({
      next: (res) => {
         this.produtos = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
   }

   criarProduto(): Produto {
    return {
      _id: this.produtoForm.get('_id')?.value!,
      nome: this.produtoForm.get('nome')?.value!,
      valor: this.produtoForm.get('valor')?.value!,
      descricao: this.produtoForm.get('descricao')?.value!,
    }

   }

   salvar(){
    if(this.produtoForm.valid){
      const produto = this.criarProduto();
      console.log('produto', produto);

      this.produtoService.salvar(produto).subscribe({
        next: (res) => {
          this.produtoForm.reset();
          this.buscarProdutos();
          alert("Produto cadastrado com sucesso");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    
   }

   remover(produto: Produto){
    const confirmacao = confirm("Quer realmente excluir este produto" + produto._id);
    if(confirmacao){
      //const id = produto.id;
      this.produtoService.remover(produto._id).subscribe({
         next: (res) => {
          this.buscarProdutos();
          alert("Produto removido com sucesso");
          // this.produtoForm.reset();
         
         },
         error: (error) => {
          console.log(error);
         }
      })
    }
   }

}
