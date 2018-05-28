import { prop, Typegoose } from "typegoose";
export class Author extends Typegoose {
  @prop() name?: string;
  @prop() age?: number;
}
