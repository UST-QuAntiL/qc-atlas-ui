/* tslint:disable */
export type DiscussionCommentDto = {
  id: string;
  text: string;
  date: string;
  replyTo?: DiscussionCommentDto;
};
