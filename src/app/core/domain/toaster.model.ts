import { ToasterType } from "../enums/Toaster.enum";

export interface ToasterModel{
    id:string;
    text:string;
    type:ToasterType;
}