
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
    name: [null, Validators.required],
    price: [null, Validators.required],
    description: []
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
      id: this.produtoForm.get('id')?.value!,
      name: this.produtoForm.get('name')?.value!,
      price: this.produtoForm.get('price')?.value!,
      description: this.produtoForm.get('description')?.value!,
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
    const confirmacao = confirm("Quer realmente excluir este produto" + produto.id);
    if(confirmacao){
      const id = produto.id;
      this.produtoService.remover(produto.id).subscribe({
         next: (res) => {
          this.buscarProdutos();
          alert("Produto removido com sucesso");
          this.produtoForm.reset();
         
         },
         error: (error) => {
          console.log(error);
         }
      })
    }
   }

}
