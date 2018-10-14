import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
}) export class FeedPage {

  public filmes = new Array<any>();
  public urlImages = 'https://image.tmdb.org/t/p/w500';
  public loader;
  public refresher;
  public isRefreshing: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) { }

  abrirLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.loader.present();
  }

  fecharLoader() {
    this.loader.dismiss();
  }

  recarregar(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.buscarFilmes();
  }

  ionViewDidEnter() {
    this.buscarFilmes();
  }

  carregarFilme(filme) {
    this.navCtrl.push(FilmesDetalhesPage, filme.id);
  }

  buscarFilmes() {
    this.abrirLoader();
    this.movieProvider.getLatestMovie().subscribe(
      data => {
        const response = (data as any);
        const resposta = JSON.parse(response._body);
        this.filmes = resposta.results;
        console.log(this.filmes);
        this.fecharLoader();
        this.verificarRefresh();
      }, () => {
        this.fecharLoader();
        this.verificarRefresh();
      }
    );
  }

  verificarRefresh() {
    if (this.refresher && this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
    console.log(this.isRefreshing);
  }
}
