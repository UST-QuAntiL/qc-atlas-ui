/* tslint:disable */
export interface PublicationDto {
  authors: Array<string>;
  doi?: string;
  id?: string;
  title: string;

  /**
   * URL
   */
  url?: string;
}
