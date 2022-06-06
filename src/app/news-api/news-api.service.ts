import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";
import { map, switchMap, tap, pluck, catchError } from "rxjs/operators";
import { HttpParams, HttpClient } from "@angular/common/http";
import { NotificationsService } from "../notifications/notifications.service";

export interface Article {
  title: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
}

export interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: "root",
})
export class NewsApiService {
  private url = "https://newsapi.org/v2/top-headlines";
  private pageSize = 10;
  private apiKey = "";
  private country = "in";

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) {
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set("apiKey", this.apiKey)
          .set("country", this.country)
          .set("pageSize", String(this.pageSize))
          .set("page", String(page));
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
        // this.notifications.addSuccess('News fetched');
      }),
      pluck("articles"),
      catchError((err) => {
        this.notifications.addError("Can't fetch news at the moment");
        return throwError(err);
      })
    );
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }
}
