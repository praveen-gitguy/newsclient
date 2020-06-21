import { Component, OnInit } from '@angular/core';
import { NewsApiService, Article, NewsApiResponse } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css']
})
export class NaArticleListComponent implements OnInit {

  articles: Article[];
  page = 1;
  numberOfPages: number;

  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe( articles => {
      this.articles = articles;
    });
    this.newsApiService.getPage(this.page);
    this.newsApiService.numberOfPages.subscribe( pages => {
      this.numberOfPages = pages
    })
  }

  ngOnInit(): void {

  }

  setPage(page: number) {
    this.newsApiService.getPage(page);
  }


}
