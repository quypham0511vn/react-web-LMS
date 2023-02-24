export interface ImageModel {
    id: string | number;
   image?: string;
   video?: string;
   dateTime: string;
}

export interface ImageGroupModel {
    id: string | number;
    title: string;
    itemList: ImageModel[];
}
