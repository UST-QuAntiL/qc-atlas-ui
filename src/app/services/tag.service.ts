import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Tag, TagsDtos } from "../model/tag.model";

@Injectable({
  providedIn: "root",
})
export class TagService {
  constructor(private httpClient: HttpClient) {}

  createTag(tag: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(
      environment.API_URL + environment.TAG_ENDPOINT,
      tag
    );
  }

  createTagWithJson(jsonString: string): Observable<Tag> {
    return this.httpClient.post<Tag>(
      environment.API_URL + environment.TAG_ENDPOINT,
      JSON.parse(jsonString)
    );
  }

  getAllTags(): Observable<TagsDtos> {
    return this.httpClient.get<TagsDtos>(
      environment.API_URL + environment.TAG_ENDPOINT
    );
  }

  getTagsForImplementation(
    algoId: number,
    implId: number
  ): Observable<TagsDtos> {
    return this.httpClient.get<TagsDtos>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.IMPLEMENTATION_ENDPOINT +
        implId +
        environment.TAG_ENDPOINT
    );
  }

  getTagsForAlgorithm(algoId: number): Observable<TagsDtos> {
    return this.httpClient.get<TagsDtos>(
      environment.API_URL +
        environment.ALGORITHM_ENDPOINT +
        algoId +
        environment.TAG_ENDPOINT
    );
  }
}
