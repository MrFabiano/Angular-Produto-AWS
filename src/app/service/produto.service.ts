import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "../model/produto";
import { environment } from "src/environments/environment";



@Injectable({
providedIn: 'root'
})


export class ProdutoService{

    //private readonly API = 'api/produto';
    private _URL = environment.url + 'produto';
    constructor(private http: HttpClient){
        
    }

    buscarTodos(){
        return this.http.get<Produto[]>(this._URL);
    }

    salvar(produto: Produto){
        return this.http.post<Produto>(this._URL, produto);
    }

    remover(id: number){
        return this.http.delete(`${this._URL}/${id}`);
    }
} 