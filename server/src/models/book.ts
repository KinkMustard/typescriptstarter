import { prop, Typegoose } from "typegoose";

export class Book extends Typegoose {
  @prop() name?: string;
  @prop() genre?: string;
  @prop() authorId?: string;
}
